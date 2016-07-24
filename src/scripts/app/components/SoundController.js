import React, { Component } from 'react';
import deepEqual from 'deep-equal';

import {
    playSound,
} from '../utils/audio';

import {
    renderRiffTemplateAtTempo,
} from '../utils/instruments';

import {
    generateRiff,
} from '../utils/riffs';

import {
    convertAllowedLengthsToArray,
    generateSequence,
    getSequence,
} from '../utils/sequences';

import {
    capitalize,
    compose,
    deepClone,
    isIOS,
    randomFromArray,
    splice,
} from '../utils/tools';

import IOSWarning from './IOSWarning';
import LoopController from './LoopController';
import SVG from './SVG';
import Waveform from './Waveform';
import ContinuousGenerationController from './ContinuousGenerationController';

const getTotalTimeLength = (beats, bpm) => getTotalBeatsLength(beats) * (60 / bpm);

const getTotalBeatsLength = (beats, bpmMultiplier) => {
    const totalBeats       = beats.find(beat => beat.id === 'total');
    const totalBeatsLength = totalBeats.bars * totalBeats.beats;
    return totalBeatsLength
}

const generateNewRiff = ({ bpm, beats, usePredefinedSettings, instruments, totalBeatsProduct }) => {
    let generatedSequences         = {};
    const getInstrumentSequence    = getSequence({ beats, generatedSequences, usePredefinedSettings });
    const instrumentsWithSequences = instruments
        .map(getInstrumentSequence);

    return generateRiff({ totalBeatsProduct, instruments: instrumentsWithSequences, usePredefinedSettings })
}

const play             = (audioContext, buffer) => playSound(audioContext, buffer, audioContext.currentTime, buffer.duration, 1);
const stop             = (src) => { if (src) { src.onended = () => {}; src.stop(0); } };
const loop             = (src, isLooping) => { if (src) { src.loop = isLooping } };

const fadeIn = (gainNode, duration) => {
    if (!duration) return gainNode
    const startVal = -1;
    const endVal = 0;
    gainNode.gain.value = startVal;

    let startTime = 0;
    (function loop (t) {
        if (!startTime) startTime = t;
        const time = t - startTime;
        const speed = duration === 0 ? 0 : time / duration;

        gainNode.gain.value = startVal + speed
        if (gainNode.gain.value < endVal) requestAnimationFrame(loop);
        else gainNode.gain.value = endVal;
    })(0.00);

    return gainNode;
}

class SoundController extends Component {
    currentlyPlayingNotes = [];
    currentRiffTemplate;
    queuedInstruments;
    queuedRiffTemplate;
    currentGainNode;
    audioContext = '';
    isOutDated = true;
    renewalTimeout;
    renewalPoint = .80;
    loopTimeout;
    state = {
        isLoading  : false,
        error      : '',
    }

    componentWillMount = () => {
        this.audioContext = new AudioContext();
    }

    updateUI = (newState) => {
        requestAnimationFrame(() => this.setState(newState));
    }

    componentWillUpdate = (nextProps, nextState) => {
        // if (nextProps.isLooping !== this.props.isLooping) loop(this.props.currentSrc, nextProps.isLooping);
        if (!this.props.generationState) return;

        const generationStateInstruments = this.props.generationState.instruments;

        // Check against the generation state to see if we're out of date
        if (   nextProps.bpm !== this.props.generationState.bpm
            || !deepEqual(nextProps.beats, this.props.generationState.beats)
            || nextProps.instruments
                .filter((instrument, i) =>
                    instrument.sounds
                        .filter((sound, index) => sound.enabled !== generationStateInstruments[i].sounds[index].enabled ).length
                ).length
        ) {
            this.isOutDated = true;
        } else {
            this.isOutDated = false;
        }
    }

    generate = () => {
        const { bpm, beats, instruments, usePredefinedSettings } = this.props;
        const generationState = deepClone({ bpm, beats, instruments, usePredefinedSettings });

        this.props.actions.updateGenerationState(generationState);

        this.isOutDated = false;
        this.updateUI({ isLoading: true });

        const bpmMultiplier     = 60 / bpm;
        const totalBeatsProduct = getTotalBeatsLength(beats);
        let newInstruments;
        return generateNewRiff({ ...generationState, instruments, totalBeatsProduct })
            .then((instruments) => {
                newInstruments = instruments;
                return renderRiffTemplateAtTempo(instruments, bpmMultiplier)
            })
            .then((riffTemplate) => {
                const newState = { isLoading: false, error: '' };
                if (!riffTemplate) newState.error = 'Error!'

                this.updateUI(newState);
                return { riffTemplate, instruments: newInstruments };
            });
    }

    togglePlay = () => {
        if (this.props.isPlaying) {
            this.stopEvent();
        } else {
            this.playEvent(this.currentRiffTemplate);
        }
    }

    playEvent = (riffTemplate, audioStartTime = this.audioContext.currentTime) => {
        if (this.state.error || !riffTemplate) return;

        this.audioStartTime = audioStartTime;
        this.currentRiffTemplate = riffTemplate;
        if (!this.loopTimeout) this.loop(riffTemplate);

        // this.props.actions.updateCurrentBuffer(currentBuffer);
        // this.props.actions.updateCurrentSrc(currentSrc);

        if (!this.props.isPlaying) this.props.actions.updateIsPlaying(true);

        if (this.props.continuousGeneration) {
            const renewalTimeoutTime = Math.round(getTotalTimeLength(this.props.generationState.beats, this.props.generationState.bpm) * this.renewalPoint);
            this.renewalTimeout = setTimeout(this.generateAndQueue, renewalTimeoutTime);
        }
    }

    stopEvent = () => {
        if (this.props.isPlaying) {
            this.currentlyPlayingNotes
                .map(src => stop(src));

            this.currentlyPlayingNotes = [];

            if (this.loopTimeout) {
                clearTimeout(this.loopTimeout);
                this.loopTimeout = undefined;
            }
            if (this.renewalTimeout) clearTimeout(this.renewalTimeout);
            this.props.actions.updateIsPlaying(false);
        }
    }

    generateEvent = () => {
        if (!this.state.isLoading) {
            if (isIOS()) {
                const content = <IOSWarning onButtonClick={this.props.actions.disableModal} />
                this.props.actions.enableModal({ content, isCloseable: true, className: 'modal--wide' });
            }
            this.stopEvent();
            this.generate()
                .then(({ riffTemplate, instruments }) => this.updateInstrumentsAndPlay(riffTemplate, instruments));
        }
    }

    generateAndQueue = () => {
        this.generate()
            .then(({ riffTemplate, instruments }) => {
                if (!this.props.isPlaying) return this.updateInstrumentsAndPlay(riffTemplate, instruments);

                this.queuedRiffTemplate = riffTemplate;
                this.queuedInstruments = instruments;
            });
    }

    updateInstrumentsAndPlay = (riffTemplate, instruments) => {
        this.playEvent(riffTemplate)
        this.props.actions.updateCustomPresetInstruments(instruments);
    }

    onSourceEnd = (source) => {
        this.currentlyPlayingNotes = splice(this.currentlyPlayingNotes.indexOf(source), 1, this.currentlyPlayingNotes);
    }

    loop = (riffTemplate) => {
        const currentTime   = this.audioContext.currentTime - this.audioStartTime;
        const upcomingNotes = riffTemplate
            .filter(hit => hit.startTime >= currentTime && hit.startTime <= currentTime + .1)
            .map(({
                    instrumentID,
                    buffer,
                    startTime,
                    duration,
                    volume,
                    pitchAmount,
                    fadeInDuration,
                    fadeOutDuration,
                }) => {
                    const instrument = this.props.instruments.find(i => i.id === instrumentID);
                    const source = playSound(this.audioContext, buffer, this.audioStartTime + startTime, duration, volume, instrument.pitch || 0, fadeInDuration, fadeOutDuration)
                    source.onended = () => this.onSourceEnd(source);
                    return source;
                }
            )

        this.currentlyPlayingNotes = [ ...this.currentlyPlayingNotes, ...upcomingNotes ];

        const newRiffTemplate = riffTemplate.slice(upcomingNotes.length, riffTemplate.length);
        if (newRiffTemplate.length) {
            /* RIFF IS STILL PLAYING */
            this.loopTimeout = setTimeout(() => this.loop(newRiffTemplate), 50);
        } else {
            /* RIFF IS FINISHED */
            this.loopTimeout = undefined;

            if (this.props.isLooping || this.props.continuousGeneration) {
                const bpmMultiplier    = 60 / this.props.generationState.bpm;
                const totalLength      = getTotalBeatsLength(this.props.generationState.beats) * bpmMultiplier;
                const endTime          = this.audioStartTime + (totalLength);
                const nextRiffTemplate = this.props.continuousGeneration
                                       ? this.queuedRiffTemplate
                                       : this.currentRiffTemplate;

                if (this.props.continuousGeneration) {
                    this.currentRiffTemplate = this.queuedRiffTemplate;
                    this.queuedRiffTemplate  = undefined;
                }

                this.playEvent(nextRiffTemplate, endTime)
            }
        }
    }

    render () {
        const eventName = this.props.isPlaying ? 'stop' : 'play';
        const continuousGeneration = document.location.hash === '#beta' && this.props.enableContinuousGenerationControl ? (
            <div className="group-spacing-y-small u-mr1">
                <ContinuousGenerationController
                    continuousGeneration={this.props.continuousGeneration}
                    actions={{
                        updateContinuousGeneration: (newVal) => this.props.actions.updateContinuousGeneration(newVal)
                    }}
                />
            </div>
        ) : null;

        return (
            <div>
                { this.state.error ? <p className="txt-error">{ this.state.error }</p> : null }
                <div className="u-flex-row u-flex-wrap">
                    <div className="group-spacing-y-small u-mr05 u-mb0">
                        <button className={`button-primary ${ this.isOutDated ? 'button-primary--positive' : '' } ${ this.state.isLoading ? '' : 'icon-is-hidden' }`} onClick={() => this.generateEvent()}>
                            <span className="button-primary__inner">{ this.props.generateButtonText || 'Generate' }</span>
                            <span className="button-primary__icon">
                                <span className="spinner" />
                            </span>
                        </button>
                    </div>

                    <div className="group-spacing-y-small u-mr1 u-mb0">
                        <button className="button-primary" title={ capitalize(eventName) } onClick={this.togglePlay} disabled={!this.currentRiffTemplate}>
                            <SVG icon={ eventName } className="button-primary__svg-icon" />
                        </button>
                    </div>

                    <div className="group-spacing-y-small u-mr1">
                        <LoopController
                            isLooping={this.props.isLooping}
                            actions={{
                                updateIsLooping: (newVal) => this.props.actions.updateIsLooping(newVal)
                            }}
                        />
                    </div>

                    { continuousGeneration }
                </div>
            </div>
        );
    }
}

export default SoundController;

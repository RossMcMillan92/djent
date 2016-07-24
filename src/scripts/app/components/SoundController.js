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
    getSequence,
} from '../utils/sequences';

import {
    capitalize,
    deepClone,
    splice,
} from '../utils/tools';

import LoopController from './LoopController';
import SVG from './SVG';
import ContinuousGenerationController from './ContinuousGenerationController';

const getTotalTimeLength = (beats, bpm) => getTotalBeatsLength(beats) * (60 / bpm);

const getTotalBeatsLength = (beats) => {
    const totalBeats       = beats.find(beat => beat.id === 'total');
    const totalBeatsLength = totalBeats.bars * totalBeats.beats;
    return totalBeatsLength;
};

const generateNewRiff = ({ beats, usePredefinedSettings, instruments, totalBeatsProduct }) => {
    const generatedSequences       = {};
    const getInstrumentSequence    = getSequence({
        beats,
        generatedSequences,
        usePredefinedSettings
    });
    const instrumentsWithSequences = instruments
        .map(getInstrumentSequence);

    return generateRiff({
        totalBeatsProduct,
        instruments:
        instrumentsWithSequences,
        usePredefinedSettings
    });
};

const stop = (src) => {
    if (src) {
        const newSrc = src;
        newSrc.onended = () => {};
        newSrc.stop(0);
        return newSrc;
    }
};

class SoundController extends Component {
    currentlyPlayingNotes = [];
    currentRiffTemplate;
    queuedInstruments;
    queuedRiffTemplate;
    currentGainNode;
    audioContext = '';
    isOutDated = true;
    renewalTimeout;
    renewalPoint = 0.80;
    loopTimeout;
    state = {
        isLoading : false,
        error     : '',
    }

    componentWillMount = () => {
        this.audioContext = new AudioContext();
    }

    updateUI = (newState) => {
        requestAnimationFrame(() => this.setState(newState));
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (!this.props.generationState) return;

        const generationStateInstruments = this.props.generationState.instruments;

        // Check against the generation state to see if we're out of date
        if (nextProps.bpm !== this.props.generationState.bpm
            || !deepEqual(nextProps.beats, this.props.generationState.beats)
            || nextProps.instruments
                .filter((instrument, i) =>
                    instrument.sounds
                        .filter((sound, index) =>
                            sound.enabled !== generationStateInstruments[i].sounds[index].enabled
                        ).length
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
            .then((instrumentss) => {
                newInstruments = instrumentss;
                return renderRiffTemplateAtTempo(instrumentss, bpmMultiplier);
            })
            .then((riffTemplate) => {
                const newState = { isLoading: false, error: '' };
                if (!riffTemplate) newState.error = 'Error!';

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
        this.playEvent(riffTemplate);
        this.props.actions.updateCustomPresetInstruments(instruments);
    }

    onSourceEnd = (source) => {
        this.currentlyPlayingNotes = splice(this.currentlyPlayingNotes.indexOf(source), 1, this.currentlyPlayingNotes);
    }

    loop = (riffTemplate) => {
        const currentTime   = this.audioContext.currentTime - this.audioStartTime;
        const upcomingNotes = riffTemplate
            .filter(hit => hit.startTime >= currentTime && hit.startTime <= currentTime + 0.1)
            .map(({
                    buffer,
                    startTime,
                    duration,
                    volume,
                    pitchAmount,
                    fadeInDuration,
                    fadeOutDuration,
                }) => {
                    const source = playSound(this.audioContext, buffer, this.audioStartTime + startTime, duration, volume, pitchAmount, fadeInDuration, fadeOutDuration)
                    source.onended = () => this.onSourceEnd(source);
                    return source;
                }
            );

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

    render = () => {
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

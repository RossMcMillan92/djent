import React, { Component } from 'react';

import LoopController from './LoopController';
import SVG from './SVG';
import ContinuousGenerationController from './ContinuousGenerationController';

import {
    playSound,
} from '../utils/audio';

import audioContext from '../utils/audioContext';

import {
    renderRiffTemplateAtTempo,
} from '../utils/instruments';

import {
    generateRiff,
} from '../utils/riffs';

import {
    getSequence,
    getTotalBeatsLength,
    getTotalTimeLength,
} from '../utils/sequences';

import {
    capitalize,
    deepClone,
    splice,
} from '../utils/tools';

const generateNewRiff = ({ context, sequences, usePredefinedSettings, instruments, totalBeatsProduct }) => {
    const generatedSequences    = {};
    const getInstrumentSequence = getSequence({
        sequences,
        generatedSequences,
        usePredefinedSettings
    });
    const instrumentsWithSequences = instruments
        .map(getInstrumentSequence)
        .filter(i => i.sequence !== undefined);

    return generateRiff({
        context,
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
    generationCount = -1
    currentlyPlayingNotes = [];
    currentRiffTemplate;
    queuedInstruments;
    queuedRiffTemplate;
    currentGainNode;
    audioContext = '';
    renewalTimeout;
    renewalPoint = 0.80;
    loopTimeout;
    state = {
        isLoading : false,
        error     : '',
    }

    componentWillUnmount = () => {
        this.stopEvent();
        this.clearTimeouts();
    }

    updateUI = (newState) => {
        requestAnimationFrame(() => this.setState(newState));
    }

    clearTimeouts = () => {
        if (this.loopTimeout) {
            clearTimeout(this.loopTimeout);
            this.loopTimeout = undefined;
        }
        if (this.renewalTimeout) clearTimeout(this.renewalTimeout);
        if (this.updatePlayingTimeout) clearTimeout(this.updatePlayingTimeout);
        if (this.stopTimeout) clearTimeout(this.stopTimeout);
    }

    generate = () => {
        const { bpm, sequences, instruments, usePredefinedSettings } = this.props;
        const generationState   = deepClone({ bpm, sequences, instruments, usePredefinedSettings });
        const bpmMultiplier     = 60 / bpm;
        const totalBeatsProduct = getTotalBeatsLength(sequences);

        this.props.actions.updateGenerationState(generationState);
        let newInstruments;
        return generateNewRiff({ ...generationState, instruments, totalBeatsProduct, context: audioContext })
            .then((instrumentss) => {
                newInstruments = instrumentss;
                return renderRiffTemplateAtTempo(instrumentss, bpmMultiplier);
            })
            .then((audioTemplate) => {
                const newState = { isLoading: false, error: '' };
                if (!audioTemplate) newState.error = 'Error!';

                this.updateUI(newState);
                return { audioTemplate, instruments: newInstruments };
            });
    }

    togglePlay = () => {
        if (this.props.isPlaying) {
            this.stopEvent();
        } else {
            this.playEvent(this.currentRiffTemplate);
        }
    }

    playEvent = (audioTemplate, audioStartTime = audioContext.currentTime) => {
        if (this.state.error || !audioTemplate) return;

        let audioStartTimeFromNow = audioStartTime - audioContext.currentTime;
        if (audioStartTimeFromNow < 0) {
            audioStartTime = 0;
            audioStartTimeFromNow = 0;
        }

        this.audioStartTime = audioStartTime;
        this.currentRiffTemplate = audioTemplate;
        if (!this.loopTimeout) this.loop(audioTemplate);

        this.props.actions.updateCurrentAudioTemplate({
            id: this.generationCount,
            audioStartTime,
            audioTemplate
        });

        if (audioStartTimeFromNow === 0) {
            if (!this.props.isPlaying) this.props.actions.updateIsPlaying(true);
        } else {
            this.updatePlayingTimeout = setTimeout(() => {
                if (!this.props.isPlaying) this.props.actions.updateIsPlaying(true);
            }, audioStartTimeFromNow * 1000);
        }


        if (this.props.continuousGeneration) {
            const renewalTimeoutTime = Math.round(getTotalTimeLength(this.props.generationState.sequences, this.props.generationState.bpm) * this.renewalPoint);
            this.renewalTimeout = setTimeout(this.generateAndQueue, renewalTimeoutTime);
        }
    }

    stopEvent = () => {
        if (this.props.isPlaying) {
            this.clearTimeouts();
            this.currentlyPlayingNotes
                .map(src => stop(src));
            this.currentlyPlayingNotes = [];

            if (this.props.isPlaying) this.props.actions.updateIsPlaying(false);
        }
    }

    generateEvent = () => {
        if (!this.state.isLoading) {
            this.updateUI({ isLoading: true });
            this.stopEvent();
            this.generate()
                .then(({ audioTemplate, instruments }) => {
                    window.requestIdleCallback(() => this.updateInstrumentsAndPlay(audioTemplate, instruments), { timeout: 2000 });
                });
        }
    }

    generateAndQueue = () => {
        this.generate()
            .then(({ audioTemplate, instruments }) => {
                if (!this.props.isPlaying) return this.updateInstrumentsAndPlay(audioTemplate, instruments);

                this.queuedRiffTemplate = audioTemplate;
                this.queuedInstruments = instruments;
            });
    }

    updateInstrumentsAndPlay = (audioTemplate, instruments) => {
        this.generationCount = this.generationCount + 1;
        this.playEvent(audioTemplate);
        this.props.actions.updateCustomPresetInstruments(instruments);
    }

    onSourceEnd = (source) => {
        this.currentlyPlayingNotes = splice(this.currentlyPlayingNotes.indexOf(source), 1, this.currentlyPlayingNotes);
    }

    loop = (audioTemplate) => {
        const currentTime   = audioContext.currentTime - this.audioStartTime;
        const lookaheadTime = 500;
        const upcomingNotes = audioTemplate
            .filter(hit => hit.startTime >= currentTime && hit.startTime <= currentTime + (lookaheadTime / 1000))
            .map(({
                    buffer,
                    startTime,
                    duration,
                    volume,
                    pitchAmount,
                    fadeInDuration,
                    fadeOutDuration,
                }) => {
                    const source = playSound(audioContext, buffer, this.audioStartTime + startTime, duration, volume, pitchAmount, fadeInDuration, fadeOutDuration);
                    source.onended = () => this.onSourceEnd(source);
                    return source;
                }
            );

        this.currentlyPlayingNotes = [ ...this.currentlyPlayingNotes, ...upcomingNotes ];

        const newRiffTemplate = audioTemplate.slice(upcomingNotes.length, audioTemplate.length);
        if (newRiffTemplate.length) {
            /* RIFF IS STILL PLAYING */
            this.loopTimeout = setTimeout(() => this.loop(newRiffTemplate), 205);
        } else {
            /* RIFF IS FINISHED */
            this.loopTimeout = undefined;

            const bpmMultiplier    = 60 / this.props.generationState.bpm;
            const totalLength      = getTotalBeatsLength(this.props.generationState.sequences) * bpmMultiplier;
            const endTime          = this.audioStartTime + (totalLength);

            if (this.props.isLooping || this.props.continuousGeneration) {
                const nextRiffTemplate = this.props.continuousGeneration
                                       ? this.queuedRiffTemplate
                                       : this.currentRiffTemplate;

                if (this.props.continuousGeneration) {
                    this.currentRiffTemplate = this.queuedRiffTemplate;
                    this.queuedRiffTemplate  = undefined;
                    this.generationCount = this.generationCount + 1;
                }
                if (this.props.isPlaying) this.playEvent(nextRiffTemplate, endTime);
            } else {
                this.stopTimeout = setTimeout(this.stopEvent, (endTime - (this.audioStartTime + currentTime)) * 1000);
            }
        }
    }

    render = () => {
        const eventName = this.props.isPlaying ? 'stop' : 'play';
        const continuousGeneration = document.location.hash === '#beta' && this.props.enableContinuousGenerationControl ? (
            <div className="u-mr1">
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
                    <div className="visualiser-container__button u-mr05 u-mb0">
                        <button className={`button-primary button-primary--alpha-dark ${this.state.isLoading ? '' : 'icon-is-hidden'}`} onClick={() => this.generateEvent()}>
                            <span className="button-primary__inner">{ this.props.generateButtonText || 'Generate' }</span>
                            <span className="button-primary__icon">
                                <span className="spinner" />
                            </span>
                        </button>
                    </div>

                    <div className="u-mr1 u-mb0">
                        <button className="button-primary button-primary--alpha-dark" title={ capitalize(eventName) } onClick={this.togglePlay} disabled={!this.currentRiffTemplate}>
                            <SVG icon={ eventName } className="button-primary__svg-icon" />
                        </button>
                    </div>

                    <div className="u-mr1">
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

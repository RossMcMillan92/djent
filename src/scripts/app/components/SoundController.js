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

        if (this.loopTimeout) clearTimeout(this.loopTimeout);
        if (this.renewalTimeout) clearTimeout(this.renewalTimeout);
    }

    updateUI = (newState) => {
        requestAnimationFrame(() => this.setState(newState));
    }

    generate = () => {
        const { bpm, sequences, instruments, usePredefinedSettings } = this.props;
        const generationState = deepClone({ bpm, sequences, instruments, usePredefinedSettings });

        this.props.actions.updateGenerationState(generationState);

        this.updateUI({ isLoading: true });

        const bpmMultiplier     = 60 / bpm;
        const totalBeatsProduct = getTotalBeatsLength(sequences);
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

        setTimeout(() => {
            if (!this.props.isPlaying) this.props.actions.updateIsPlaying(true);
        }, audioStartTimeFromNow * 1000);

        if (this.props.continuousGeneration) {
            const renewalTimeoutTime = Math.round(getTotalTimeLength(this.props.generationState.sequences, this.props.generationState.bpm) * this.renewalPoint);
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
            if (this.props.isPlaying) this.props.actions.updateIsPlaying(false);
        }
    }

    generateEvent = () => {
        if (!this.state.isLoading) {
            this.stopEvent();
            this.generate()
                .then(({ audioTemplate, instruments }) => this.updateInstrumentsAndPlay(audioTemplate, audioContext.currentTime, instruments));
        }
    }

    generateAndQueue = () => {
        this.generate()
            .then(({ audioTemplate, instruments }) => {
                if (!this.props.isPlaying) return this.updateInstrumentsAndPlay(audioTemplate, audioContext.currentTime, instruments);

                this.queuedRiffTemplate = audioTemplate;
                this.queuedInstruments = instruments;
            });
    }

    updateInstrumentsAndPlay = (audioTemplate, audioStartTime, instruments) => {
        this.generationCount = this.generationCount + 1;
        this.playEvent(audioTemplate, audioStartTime);
        this.props.actions.updateCustomPresetInstruments(instruments);
    }

    onSourceEnd = (source) => {
        this.currentlyPlayingNotes = splice(this.currentlyPlayingNotes.indexOf(source), 1, this.currentlyPlayingNotes);
    }

    loop = (audioTemplate) => {
        const currentTime   = audioContext.currentTime - this.audioStartTime;
        const upcomingNotes = audioTemplate
            .filter(hit => hit.startTime >= currentTime && hit.startTime <= currentTime + 1)
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
            this.loopTimeout = setTimeout(() => this.loop(newRiffTemplate), 500);
        } else {
            /* RIFF IS FINISHED */
            this.loopTimeout = undefined;

            if (this.props.isLooping || this.props.continuousGeneration) {
                const bpmMultiplier    = 60 / this.props.generationState.bpm;
                const totalLength      = getTotalBeatsLength(this.props.generationState.sequences) * bpmMultiplier;
                const endTime          = this.audioStartTime + (totalLength);
                const nextRiffTemplate = this.props.continuousGeneration
                                       ? this.queuedRiffTemplate
                                       : this.currentRiffTemplate;

                if (this.props.continuousGeneration) {
                    this.currentRiffTemplate = this.queuedRiffTemplate;
                    this.queuedRiffTemplate  = undefined;
                }

                this.generationCount = this.generationCount + 1;
                if (this.props.isPlaying) this.playEvent(nextRiffTemplate, endTime);
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
                        <button className={`button-primary ${this.state.isLoading ? '' : 'icon-is-hidden'}`} onClick={() => this.generateEvent()}>
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

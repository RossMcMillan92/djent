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
    currentlyPlayingSources = [];
    currentRiffTemplate;
    queuedInstruments;
    queuedRiffTemplate;
    currentGainNode;
    audioContext = '';
    renewalTimeout;
    renewalPoint = 0.80;
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
        if (this.renewalTimeout) clearTimeout(this.renewalTimeout);
        if (this.updatePlayingTimeout) clearTimeout(this.updatePlayingTimeout);
        if (this.stopTimeout) clearTimeout(this.stopTimeout);
        if (this.loopTimeout) clearTimeout(this.loopTimeout);
    }

    generate = () => {
        const { bpm, sequences, instruments, usePredefinedSettings } = this.props;
        const generationState   = deepClone({ bpm, sequences, instruments, usePredefinedSettings });
        const totalBeatsProduct = getTotalBeatsLength(sequences);

        this.props.actions.updateGenerationState(generationState);
        let newInstruments;
        return generateNewRiff({ ...generationState, instruments, totalBeatsProduct, context: audioContext })
            .then((instrumentss) => {
                newInstruments = instrumentss;
                const bpmMultiplier     = 60 / bpm;
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

        this.currentRiffTemplate = audioTemplate;
        this.playAudioTemplate(audioTemplate, audioStartTime);

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
            this.currentlyPlayingSources
                .map(src => stop(src));
            this.currentlyPlayingSources = [];

            if (this.props.isPlaying) this.props.actions.updateIsPlaying(false);
        }
    }

    generateEvent = () => {
        if (!this.state.isLoading) {
            this.setState({ isLoading: true });
            this.stopEvent();
            this.generate()
                .then(({ audioTemplate, instruments }) => this.updateInstrumentsAndPlay(audioTemplate, instruments));
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
        this.stopEvent();
        this.playEvent(audioTemplate);
        this.props.actions.updateCustomPresetInstruments(instruments);
    }

    onSourceEnd = (source) => {
        this.currentlyPlayingSources = splice(this.currentlyPlayingSources.indexOf(source), 1, this.currentlyPlayingSources);
    }

    playAudioTemplate = (audioTemplate, audioStartTime) => {
        const audioProgress = audioContext.currentTime - audioStartTime;
        const upcomingSources = audioTemplate
            .map(({
                    buffer,
                    startTime,
                    duration,
                    volume,
                    pitchAmount,
                    fadeInDuration,
                    fadeOutDuration,
                }) => {
                    const source = playSound(audioContext, buffer, audioStartTime + startTime, duration, volume, pitchAmount, fadeInDuration, fadeOutDuration);
                    source.onended = () => this.onSourceEnd(source);
                    return source;
                }
            );

        this.currentlyPlayingSources = [ ...this.currentlyPlayingSources, ...upcomingSources ];

        const totalLength          = getTotalTimeLength(this.props.generationState.sequences, this.props.generationState.bpm);
        const audioTemplateEndTime = audioStartTime + (totalLength);
        const timeTillEnd          = (audioTemplateEndTime - (audioStartTime + audioProgress));

        if (this.props.isLooping) {
            this.loopTimeout = setTimeout(() => {
                if (this.props.isPlaying) this.playEvent(audioTemplate, audioTemplateEndTime);
            }, (timeTillEnd * 0.9) * 1000);
        } else {
            this.stopTimeout = setTimeout(this.stopEvent, timeTillEnd * 1000);
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
                    <div className={`visualiser-container__button visualiser-container__button--${this.props.generateButtonText.toLowerCase()} u-mr05 u-mb0`}>
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

import React, { Component } from 'react';

import LoopController from './LoopController';
import SVG from './SVG';
import ContinuousGenerationController from './ContinuousGenerationController';

import {
    playSound,
} from '../utils/audio';

import audioContext from '../utils/audioContext';

import {
    getGenerationID,
    generatePlaylistItem,
} from '../utils/riffs';

import {
    getTotalTimeLength,
} from '../utils/sequences';

import {
    capitalize,
    splice,
} from '../utils/tools';

const stop = (src) => {
    if (src) {
        const newSrc = src;
        newSrc.onended = () => {};
        newSrc.stop(0);
        return newSrc;
    }
};

class SoundController extends Component {
    generationCount = 0;
    currentlyPlayingSources = [];
    currentGainNode;
    audioContext = '';
    renewalTimeout;
    renewalPoint = 0.80;
    state = {
        isLoading           : false,
        error               : '',
    }

    componentWillUnmount = () => {
        this.stopEvent();
        this.clearTimeouts();
    }

    componentWillUpdate = (nextProps) => {
        if (this.trueActivePlaylistIndex !== nextProps.activePlaylistIndex
        && nextProps.activePlaylistIndex !== this.props.activePlaylistIndex) {
            if (this.props.isPlaying) setTimeout(() => this.updateInstrumentsAndPlay(nextProps.activePlaylistIndex, true), 0);
        }
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

    togglePlay = () => {
        if (this.props.isPlaying) {
            this.stopEvent();
        } else {
            this.playEvent(this.props.activePlaylistIndex);
        }
    }

    playEvent = (playlistIndex, audioStartTime = audioContext.currentTime) => {
        const playlistItem = this.props.audioPlaylist[playlistIndex];
        if (this.state.error || !playlistItem) return;

        let audioStartTimeFromNow = audioStartTime - audioContext.currentTime;
        if (audioStartTimeFromNow < 0) {
            audioStartTime = 0;
            audioStartTimeFromNow = 0;
        }

        this.playAudioTemplate(playlistItem, audioStartTime);
        this.scheduleNextPlaylistItem(playlistItem, audioStartTime);

        if (audioStartTimeFromNow === 0) {
            this.updatePlayEventState(playlistIndex, audioStartTime);
        } else {
            this.updatePlayingTimeout = setTimeout(() => {
                this.updatePlayEventState(playlistIndex, audioStartTime);
            }, audioStartTimeFromNow * 1000);
        }

        if (this.props.continuousGeneration && this.props.audioPlaylist.length === 0) {
            const currentPlaylistItem = this.props.audioPlaylist[this.props.activePlaylistIndex];
            const renewalTimeoutTime = Math.round(getTotalTimeLength(currentPlaylistItem.sequences, currentPlaylistItem.bpm) * this.renewalPoint);
            this.renewalTimeout = setTimeout(() => { if (this.props.continuousGeneration) this.queueRiff(); }, renewalTimeoutTime * 1000);
        }
    }

    scheduleNextPlaylistItem = (playlistItem, audioStartTime) => {
        const totalLength          = getTotalTimeLength(playlistItem.sequences, playlistItem.bpm);
        const audioTemplateEndTime = audioStartTime + (totalLength);
        const audioProgress        = audioContext.currentTime - audioStartTime;
        const timeTillEnd          = (audioTemplateEndTime - (audioStartTime + audioProgress));
        const timeThreshold        = timeTillEnd * 0.9;
        const stopEventDiff        = timeTillEnd - timeThreshold;

        this.loopTimeout = setTimeout(() => {
            const { activePlaylistIndex, audioPlaylist } = this.props;
            const newPlaylistIndex = activePlaylistIndex + 1 > audioPlaylist.length - 1 ? 0 : activePlaylistIndex + 1;
            if (this.props.isLooping || newPlaylistIndex !== 0) {
                this.trueActivePlaylistIndex = newPlaylistIndex;
                if (this.props.isPlaying) this.updateInstrumentsAndPlay(newPlaylistIndex, false, audioTemplateEndTime);
                this.stopTimeout = setTimeout(() => {
                    this.props.actions.updateActivePlaylistIndex(newPlaylistIndex);
                }, stopEventDiff * 1000);
            } else {
                this.stopTimeout = setTimeout(this.stopEvent, stopEventDiff * 1000);
            }
        }, timeThreshold * 1000);
    }

    updatePlayEventState = (playlistIndex, audioStartTime) => {
        const playlistItem = this.props.audioPlaylist[playlistIndex];
        if (!this.props.isPlaying) this.props.actions.updateIsPlaying(true);
        this.replaceInAudioPlaylist({
            ...playlistItem,
            audioStartTime,
        }, playlistIndex);
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
            this.generateFromProps()
                .then((playlistItem) => {
                    this.replaceInAudioPlaylist(playlistItem, this.props.activePlaylistIndex);
                    this.updateInstrumentsAndPlay(this.props.activePlaylistIndex, true);
                });
        }
    }

    generateFromProps = () => {
        const { audioPlaylist, bpm, sequences, instruments, usePredefinedSettings } = this.props;
        this.generationCount = getGenerationID(this.generationCount + 1, audioPlaylist);
        return generatePlaylistItem(this.generationCount, bpm, sequences, instruments, usePredefinedSettings)
            .then(playlistItem => {
                this.updateErrorState(!!playlistItem.audioTemplate);
                return playlistItem;
            });
    }

    queueRiff = () => {
        this.generateFromProps()
            .then(this.addToAudioPlaylist);
    }

    updateErrorState = (hasError) => {
        const newState = { isLoading: false, error: '' };
        if (!hasError) newState.error = 'Error!';
        this.updateUI(newState);
        return hasError;
    }

    addToAudioPlaylist = (playlistItem) => {
        this.props.actions.updateAudioPlaylist([
            ...this.props.audioPlaylist,
            playlistItem
        ]);
    }

    replaceInAudioPlaylist = (playlistItem, playlistIndex) => {
        const newAudioPlaylist = [ ...this.props.audioPlaylist ];
        newAudioPlaylist[playlistIndex] = playlistItem;
        this.props.actions.updateAudioPlaylist(newAudioPlaylist);
    }

    updateInstrumentsAndPlay = (newPlaylistIndex, shouldStop, audioStartTime) => {
        const nextPlaylistItem = this.props.audioPlaylist[newPlaylistIndex];
        if (shouldStop) this.stopEvent();
        this.playEvent(newPlaylistIndex, audioStartTime);
        this.props.actions.updateCustomPresetInstruments(nextPlaylistItem.instruments);
    }

    onSourceEnd = (source) => {
        this.currentlyPlayingSources = splice(this.currentlyPlayingSources.indexOf(source), 1, this.currentlyPlayingSources);
    }

    playAudioTemplate = (playlistItem, audioStartTime) => {
        const upcomingSources = playlistItem.audioTemplate
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
    }

    render = () => {
        const eventName = this.props.isPlaying ? 'stop' : 'play';
        const continuousGeneration = this.props.enableContinuousGenerationControl && false
            ? (
                <div className="u-mr1">
                    <ContinuousGenerationController
                        continuousGeneration={this.props.continuousGeneration}
                        actions={{
                            updateContinuousGeneration: (newVal) => this.props.actions.updateContinuousGeneration(newVal)
                        }}
                    />
                </div>
            )
            : null;
        const loopController = false && (
            <div className="u-mr1">
                <LoopController
                    isLooping={this.props.isLooping}
                    actions={{
                        updateIsLooping: (newVal) => this.props.actions.updateIsLooping(newVal)
                    }}
                />
            </div>
        );

        return (
            <div>
                { this.state.error ? <p className="txt-error">{ this.state.error }</p> : null }
                <div className="u-flex-row u-flex-wrap">
                    <div className={`visualiser-container__button visualiser-container__button--${this.props.generateButtonText.toLowerCase()} u-mr05 u-mb0`}>
                        <button className={`button-primary button-primary--alpha-dark button-primary--small-icon button-primary--joined ${this.state.isLoading ? '' : 'icon-is-hidden'}`} onClick={() => this.generateEvent()}>
                            <span className="button-primary__inner">{ this.props.generateButtonText || 'Generate' }</span>
                            <span className="button-primary__icon">
                                <span className="spinner" />
                            </span>
                        </button>
                        <button className="button-primary button-primary--alpha-dark button-primary--joined" title={ capitalize(eventName) } onClick={this.queueRiff} disabled={!this.props.audioPlaylist.length}>
                            <SVG className="button-primary__svg-icon" icon="plus" />
                        </button>
                    </div>

                    <div className="u-mr1 u-mb0">
                        <button className="button-primary button-primary--alpha-dark" title={ capitalize(eventName) } onClick={this.togglePlay} disabled={!this.props.audioPlaylist.length}>
                            <SVG icon={ eventName } className="button-primary__svg-icon" />
                        </button>
                    </div>

                    { loopController }

                    { continuousGeneration }
                </div>
            </div>
        );
    }
}

export default SoundController;

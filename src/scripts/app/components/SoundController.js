import React, { Component } from 'react';

import {
    playSound
} from '../utils/audio';

import {
    convertAllowedLengthsToArray,
    generateSequence,
    getSequenceForInstrument,
} from '../utils/sequences';

import {
    generateRiff,
} from '../utils/riffs';

import {
    capitalize,
    compose,
} from '../utils/tools';

import SVG from './SVG';
import Waveform from './Waveform';
import LoopController from './LoopController';

const getSequences = (grooveTotalBeats, allowedLengths, hitChance) => {
    const mainBeat       = generateSequence({ totalBeats: grooveTotalBeats, allowedLengths, hitChance });
    const cymbalSequence = getSequenceForInstrument('cymbal');
    const hihatSequence  = getSequenceForInstrument('hihat');
    const snareSequence  = getSequenceForInstrument('snare');
    const droneSequence  = getSequenceForInstrument('drone');

    const sequences     = {
        c : cymbalSequence,
        h : hihatSequence,
        k : mainBeat,
        g : mainBeat,
        s : snareSequence,
        d : droneSequence,
    };

    return sequences;
}

const generateNewBuffer = ({ bpm, beats, allowedLengths, hitChance, instruments, usePredefinedSettings }) => {
    if (!allowedLengths.filter(length => length.amount).length) return Promise.reject('There are no allowed lengths given');

    const totalBeats              = beats.find(beat => beat.id === 'total');
    const grooveTotalBeats        = beats.find(beat => beat.id === 'groove');
    const grooveTotalBeatsProduct = grooveTotalBeats.beats * grooveTotalBeats.bars;
    const totalBeatsProduct       = totalBeats.beats * totalBeats.bars;
    const sequences               = getSequences(grooveTotalBeatsProduct, convertAllowedLengthsToArray(allowedLengths), hitChance);

    return generateRiff({ bpm, totalBeatsProduct, allowedLengths, sequences, instruments, usePredefinedSettings })
}

const context          = new AudioContext();
const loop             = (src, isLooping) => { if (src) { src.loop = isLooping } };
const stop             = (src) => { if (src) { src.onended = () => {}; src.stop(0); } };
const play             = (buffer) => playSound(context, buffer, context.currentTime, buffer.duration, 1, true);
const playBuffer = (buffer) => {
    if(!buffer) return;
    let nextBuffer;
    const newSrc = play(buffer);

    return newSrc;
}
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
    currentBuffer;
    currentSrc;
    currentGainNode;
    state = {
        isPlaying  : false,
        isLoading  : false,
        isLooping  : true,
        error      : '',
    }

    updateUI = (newState) => {
        requestAnimationFrame(() => this.setState(newState));
    }

    componentWillUpdate = (nextProps, nextState) => {
        if(nextState.isLooping !== this.state.isLooping) {
            loop(this.currentSrc, nextState.isLooping);
        }
    }

    generate = (shouldPlay) => {
        this.stopEvent(this.currentSrc);
        generateNewBuffer(this.props)
            .then(({ buffer, instruments }) => {
                const newState = { isLoading: false, error: '' };

                if (!buffer) newState.error = 'Error!'
                this.currentBuffer = buffer;
                if (shouldPlay) this.playEvent();
                this.props.actions.updateCustomPresetInstruments(instruments);
                this.updateUI(newState);
            });

        this.updateUI({ isLoading: true });
    }

    togglePlay = () => {
        if (this.state.isPlaying) {
            this.stopEvent();
        } else {
            this.playEvent();
        }
    }

    playEvent = () => {
        if (!this.currentBuffer || this.state.error) return;
        this.currentGainNode = context.createGain();

        stop(this.currentSrc);
        this.currentSrc = playBuffer(this.currentBuffer);

        // Set up volume and fades
        this.currentSrc.connect(this.currentGainNode);
        this.currentGainNode.gain.value = 0;
        this.currentGainNode.connect(context.destination);
        this.currentGainNode = fadeIn(this.currentGainNode, (this.props.fadeIn ? 5000 : 0));

        loop(this.currentSrc, this.state.isLooping);
        this.updateUI({ isPlaying: true });

        this.currentSrc.addEventListener('ended', this.onEnded)
    }

    onEnded = () => {
        if (this.props.continuousGeneration) this.generate(true);
        else this.stopEvent();
    }

    stopEvent = () => {
        if (this.currentSrc) this.currentSrc.removeEventListener('ended', this.onEnded)
        stop(this.currentSrc)
        this.updateUI({ isPlaying: false });
    }

    generateEvent = () => {
        if (!this.state.isLoading) this.generate(true);
    }

    render () {
        const eventName = this.state.isPlaying ? 'stop' : 'play';

        return (
            <div>
                { this.state.error ? <p className="txt-error">{ this.state.error }</p> : null }
                <div className="u-flex-row u-flex-wrap">
                    <div className="group-spacing-y-small u-mr05">
                        <button className={`button-primary button-primary--positive u-flex-row ${ this.state.isLoading ? '' : 'icon-is-hidden' }`} onClick={() => this.generateEvent()}>
                            <span className="button-primary__inner">{ this.props.generateButtonText || 'Generate Riff' }</span>
                            <span className="button-primary__icon">
                                <span className="spinner" />
                            </span>
                        </button>
                    </div>

                    <div className="group-spacing-y-small u-mr1">
                        <button className="button-primary" title={ capitalize(eventName) } onClick={this.togglePlay} disabled={!this.currentBuffer}>
                            <SVG icon={ eventName } className="button-primary__svg-icon" />
                        </button>
                    </div>

                    <div className="group-spacing-y-small u-mr1">
                        <LoopController
                            isLooping={this.state.isLooping}
                            actions={{
                                updateIsLooping: (newVal) => this.setState({ isLooping: newVal })
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SoundController;

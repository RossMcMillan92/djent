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
} from '../utils/tools';

import SVG from './SVG';

const getSequences = (grooveTotalBeats, allowedLengths, hitChance) => {
    const mainBeat      = generateSequence({ totalBeats: grooveTotalBeats, allowedLengths, hitChance });
    const crashSequence = getSequenceForInstrument('crash');
    const hihatSequence = getSequenceForInstrument('hihat');
    const snareSequence = getSequenceForInstrument('snare');
    const droneSequence = getSequenceForInstrument('drone');

    const sequences     = {
        crash  : crashSequence,
        hihat  : hihatSequence,
        kick   : mainBeat,
        guitar : mainBeat,
        snare  : snareSequence,
        drone  : droneSequence,
    };

    return sequences;
}

const generateNewBuffer = ({ bpm, beats, allowedLengths, hitChance, instruments }) => {
    if (!allowedLengths.filter(length => length.amount).length) return Promise.resolve(false);

    const totalBeats              = beats.find(beat => beat.id === 'total');
    const grooveTotalBeats        = beats.find(beat => beat.id === 'groove');
    const grooveTotalBeatsProduct = grooveTotalBeats.beats * grooveTotalBeats.bars;
    const totalBeatsProduct       = totalBeats.beats * totalBeats.bars;
    const sequences               = getSequences(grooveTotalBeatsProduct, convertAllowedLengthsToArray(allowedLengths), hitChance);

    return generateRiff({ bpm, totalBeatsProduct,  allowedLengths, sequences, instruments })
        .then((buffer) => {
            return buffer;
        });
}

const context          = new AudioContext();
const loop             = (src, isLooping) => { if (src) { src.loop = isLooping } };
const stop             = (src) => { if (src) { src.onended = () => {}; src.stop(); } };
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
        isPlaying: false,
        isLoading: true,
        error: ''
    }

    componentWillMount = () => {
        this.generate();
    };

    componentWillUpdate = (nextProps) => {
        if(nextProps.isLooping !== this.props.isLooping) {
            loop(this.currentSrc, nextProps.isLooping);
        }
    }

    generate = (shouldPlay) => {
        this.setState({ isLoading: true });
        stop(this.currentSrc);
        generateNewBuffer(this.props)
            .then((buffer) => {
                const newState = { isLoading: false, error: '' };

                if (!buffer) newState.error = 'Enable some notes and regenerate!'
                this.setState(newState)
                this.currentBuffer = buffer;
                if (shouldPlay) this.playEvent();
            });
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

        loop(this.currentSrc, this.props.isLooping);
        this.setState({ isPlaying: true });
    }

    stopEvent = () => {
        stop(this.currentSrc)
        this.setState({ isPlaying: false });
    }

    generateEvent = () => {
        if (!this.state.isLoading) this.generate(true);
    }

    render () {
        const eventName = this.state.isPlaying ? 'stop' : 'play';

        return (
            <div>
                { this.state.error ? <p className="txt-error">{ this.state.error }</p> : null }
                <ul className="list-hor list-hor--tight">
                    <li className="list-hor__item">
                        <button className="button-primary" title={ capitalize(eventName) } onClick={this.togglePlay}>
                            {
                                this.state.isLoading
                                ? <span className="spinner" />
                                : <SVG icon={ eventName } className="button-primary__svg-icon" />
                            }
                        </button>
                    </li>

                    <li className="list-hor__item">
                        <button className="button-primary" onClick={() => this.generateEvent()}>Regenerate</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export {
    SoundController,
};

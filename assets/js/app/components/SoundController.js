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

const getSequences = (grooveBeats, allowedLengths, hitChance) => {
    const mainBeat      = generateSequence({ totalBeats: grooveBeats, allowedLengths, hitChance });
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

const generateNewBuffer = ({ bpm, totalBeats, grooveBeats, allowedLengths, hitChance, instruments }) => {
    const sequences = getSequences(grooveBeats, convertAllowedLengthsToArray(allowedLengths), hitChance);

    return generateRiff({ bpm, totalBeats, grooveBeats, allowedLengths, sequences, instruments })
        .then((buffer) => {
            return buffer;
        });
}

const context          = new AudioContext();
const loop             = (src, isLooping) => { if (src) { console.log('src', src, isLooping); src.loop = isLooping } };
const stop             = (src) => { if (src) { src.onended = () => {}; src.stop(); } };
const play             = (buffer) => playSound(context, buffer, context.currentTime, buffer.duration, 1, true);
const playBuffer = (buffer) => {
    if(!buffer) return;
    let nextBuffer;
    const newSrc = play(buffer);

    return newSrc;
}

class SoundController extends Component {
    currentBuffer;
    currentSrc;

    componentWillMount = () => {
        this.generate();
    };

    componentWillUpdate = (nextProps) => {
        if(nextProps.isLooping !== this.props.isLooping) {
            loop(this.currentSrc, this.props.isLooping);
        }
    }

    generate = (shouldPlay) => {
        console.log('generate')
        generateNewBuffer(this.props)
            .then((buffer) => {
                this.currentBuffer = buffer;
                if (shouldPlay) this.playEvent();
            });
    }

    playEvent = () => {
        console.log('play')
        stop(this.currentSrc);
        this.currentSrc = playBuffer(this.currentBuffer);
        loop(this.currentSrc, this.props.isLooping);
    }

    stopEvent = () => {
        console.log('stop')
        stop(this.currentSrc)
    }

    render () {
        return (
            <div>
                <button onClick={this.playEvent}>Start</button>
                <button onClick={this.stopEvent}>Stop</button>
                <button onClick={() => this.generate(true)}>Regenerate</button>
            </div>
        );
    }
}

export {
    SoundController,
};

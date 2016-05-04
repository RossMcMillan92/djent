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

class SoundController extends Component {
    currentBuffer;
    currentSrc;

    componentWillMount = () => {
        this.generate();
    };

    componentWillUpdate = (nextProps) => {
        if(nextProps.isLooping !== this.props.isLooping) {
            loop(this.currentSrc, nextProps.isLooping);
        }
    }

    generate = (shouldPlay) => {
        stop(this.currentSrc);
        generateNewBuffer(this.props)
            .then((buffer) => {
                this.currentBuffer = buffer;
                if (shouldPlay) this.playEvent();
            });
    }

    playEvent = () => {
        stop(this.currentSrc);
        this.currentSrc = playBuffer(this.currentBuffer);
        loop(this.currentSrc, this.props.isLooping);
    }

    stopEvent = () => {
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

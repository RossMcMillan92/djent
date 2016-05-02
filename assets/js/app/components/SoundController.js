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

let currentSrc;
let currentBuffer;

const generateNewBuffer = ({ bpm, totalBeats, grooveBeats, allowedLengths, hitChance, instruments }) => {
    const sequences = getSequences(grooveBeats, convertAllowedLengthsToArray(allowedLengths), hitChance);

    return generateRiff({ bpm, totalBeats, grooveBeats, allowedLengths, sequences, instruments })
        .then((buffer) => {
            currentBuffer = buffer;
            return buffer;
        });
}

const context          = new AudioContext();
const stop             = (src) => { if (src) { src.onended = () => {}; src.stop(); } };
const play             = (buffer) => playSound(context, buffer, context.currentTime, buffer.duration, 1, true);
const playEvent = (buffer) => {
    if(!buffer) return;
    let nextBuffer;
    if(currentSrc) stop(currentSrc);
    currentSrc = play(buffer);

    return currentSrc;
}

class SoundController extends Component {
    componentWillMount = () => generateNewBuffer(this.props);

    playEvent = () => {
        console.log('play')
        currentSrc = playEvent(currentBuffer);
    }

    stopEvent = () => {
        console.log('stop')
        stop(currentSrc)
    }

    regenerateEvent = () => {
        console.log('Regenerate')
        stop(currentSrc);
        generateNewBuffer(this.props)
            .then((buffer) => {
                currentSrc = playEvent(buffer);
            })

    }

    render () {
        return (
            <div>
                <button onClick={this.playEvent}>Start</button>
                <button onClick={this.stopEvent}>Stop</button>
                <button onClick={this.regenerateEvent}>Regenerate</button>


            </div>
        );
    }
}

export {
    SoundController,
};

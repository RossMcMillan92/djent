import './polyfills/array.values.js';

import { createBufferList, playSound } from './app/audio';
import { generateSequence, generateTimeMap } from './app/beats';

const bars = 1;
const beats = 4;
const allowedLengths = [2, 3];

const mainBeat = generateSequence({ bars, beats, allowedLengths, volumeConstant: true });

const predefinedSequences = {

    hihat: [
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
    ],

    kick: mainBeat,
    guitar: mainBeat,

    snare: [
        { beat: 1, volume: 0 },
        { beat: 1, volume: 0 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 0 },
    ]
};
const paths = {
    guitar: 'assets/audio/guitar.wav',
    kick: 'assets/audio/kick.wav',
    snare: 'assets/audio/snare.wav',
    hihat: 'assets/audio/hihat.wav'
}

const init = (bufferList) => {
    const instruments = bufferList.map((buffer, i) => {
        const id = Object.keys(paths)[i];
        const sequence = predefinedSequences[id] || generateSequence({ bars, beats, allowedLengths, volumeConstant: true });
        const timeMap = generateTimeMap(sequence);

        return {
            id,
            buffer,
            sequence,
            timeMap
        }
    })

    const sounds = instruments.forEach(instrument => instrument.timeMap.map((time, i) => instrument.sequence[i].volume && playSound(instrument.buffer, time, instrument.sequence[i])))

}
createBufferList(Object.values(paths), init);

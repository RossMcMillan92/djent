import './polyfills/array.values.js';

import { createBufferList, playSound } from './app/audio';
import { generateSequence, generateTimeMap } from './app/beats';
import { randFromTo } from './app/tools';

const bpm = 70;
const bpmMultiplier = 60 / bpm;
const bars = 4;
const beats = 4;
const allowedLengths = [ .75, 6  ];

const mainBeat = generateSequence({ bars, beats, allowedLengths, hitChance: 1 });

const predefinedSequences = {

    hihat: [
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
        { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 1 },
    ],

    kick: mainBeat,
    guitar: mainBeat,

    snare: [
        { beat: 1, volume: 0 },
        { beat: 1, volume: 1 },
            { beat: 1, volume: 0 },
            { beat: 1, volume: 1 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                    { beat: 1, volume: 0 },
                    { beat: 1, volume: 1 },
                    { beat: 1, volume: 0 },
                    { beat: 1, volume: 0 },
                    { beat: 1, volume: 1 },
                    { beat: 1, volume: 0 },
                    { beat: 1, volume: 0 },
                    { beat: 1, volume: 0 },
                    { beat: 1, volume: 1 },
                    { beat: 1, volume: 0 },
    ]
};
const instrumentPacks = [
    {
        id: 'guitar',
        paths: [
            'assets/audio/guitar-palm-zero-1.wav',
            'assets/audio/guitar-palm-zero-2.wav',
            'assets/audio/guitar-open-first-1.wav',
            'assets/audio/guitar-open-first-2.wav',
            'assets/audio/guitar-open-eighth.wav',
            'assets/audio/guitar-dissonance-high.wav',
        ]
    },
    {
        id: 'kick',
        paths: [
            'assets/audio/kick.wav'
        ]
    },
    {
        id: 'snare',
        paths: [
            'assets/audio/snare.wav'
        ]
    },
    {
        id: 'hihat',
        paths: [
            'assets/audio/hihat.wav'
        ]
    }
]

const init = (instrumentPack) => {
    const instruments = instrumentPack.map((instrument, i) => {
        console.log('instrument', instrument)
        const sequence = predefinedSequences[instrument.id] || generateSequence({ bars, beats, allowedLengths, volumeConstant: true });
        const timeMap = generateTimeMap(sequence);

        return {
            ...instrument,
            sequence,
            timeMap
        }
    })

    const sounds = instruments.forEach(instrument => {
        console.log('instrument', instrument)
        console.log('randFromTo(0, instrument.buffers.length-1)', instrument.buffers.length)
        return instrument.timeMap.map((time, i) => {
            return instrument.sequence[i].volume && playSound((instrument.buffers[randFromTo(0, instrument.buffers.length-1)]), time * bpmMultiplier, (1 / instrument.sequence[i].beat) * bpmMultiplier )
        })
    })

}
createBufferList(instrumentPacks)
    .then(init);

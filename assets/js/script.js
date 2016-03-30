import './polyfills/array.values.js';
import './polyfills/AudioContext';

import {
    loadInstrumentBuffers
} from './app/audio';

import {
    generateSequence,
    loopSequence
} from './app/beats';

import {
    getInstrument,
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    repeatHits,
    repeatSequence,
    playInstrumentSoundsAtTempo,
    stopInstrumentSounds
} from './app/instruments';

import {
    randFromTo,
    compose
} from './app/tools';

const bpm            = 70;
const bpmMultiplier  = 60 / bpm;
const bars           = 2;
const beats          = 4;
const allowedLengths = [ 1, 4 ];
const mainBeat       = generateSequence({ bars: 2, beats: 4, allowedLengths, hitChance: .75 });
console.log('mainBeat', mainBeat.map(beat => beat.beat))
const predefinedSequences = {

    hihat: [
        { beat: 1, volume: 1 },
    ],

    kick: mainBeat,

    guitar: mainBeat,

    snare: [
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 1 },
        { beat: 1 , volume: 0 },
    ]
};

const instrumentPack = [
    getInstrument('guitar', {
        sequence: predefinedSequences['guitar']
    }),

    getInstrument('kick', {
        sequence: predefinedSequences['kick']
    }),

    getInstrument('snare', {
        sequence: loopSequence(predefinedSequences['snare'], bars * beats)
    }),

    getInstrument('hihat', {
        sequence: loopSequence(predefinedSequences['hihat'], bars * beats)
    }),
];

const initiateInstruments = (instrumentPack, context) => {
    const lookaheadTime        = 0.050;
    const playInstrumentSounds = playInstrumentSoundsAtTempo(context, bpmMultiplier);
    const createSoundMaps      = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        instrument => repeatSequence(instrument, bars * beats),
        generateInstrumentHitTypes
    )(instrument);

    const instruments          = instrumentPack
        .map(createSoundMaps);

    let instrumentsPlaying     = instruments
        .map(playInstrumentSounds);

    document.querySelector('.js-play').addEventListener('click', () => {
        instrumentsPlaying = instrumentsPlaying.map(compose(playInstrumentSounds, stopInstrumentSounds));
    });
//     document.querySelector('.js-stop').addEventListener('click', () => {
//         if(frame) cancelAnimationFrame(frame);
//     });
    window.context = context;
}



const context = new AudioContext();
loadInstrumentBuffers(context, instrumentPack)
    .then((instrumentPack) => initiateInstruments(instrumentPack, context, predefinedSequences));

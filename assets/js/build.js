import './polyfills/array.values.js';
import './polyfills/AudioContext';

import {
    loadInstrumentBuffers
} from './app/audio';

import {
    generateSequence,
} from './app/beats';

import {
    getInstrument,
    generateInstrumentTimeMap,
    generateInstrumentSoundMap,
    playInstrumentSoundsAtTempo,
    stopInstrumentSounds
} from './app/instruments';

import {
    randFromTo,
    compose
} from './app/tools';

const bpm            = 100;
const bpmMultiplier  = 60 / bpm;
const bars           = 4;
const beats          = 4;
const allowedLengths = [ 3 ,3, 3, .75 ];

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
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 1 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 1 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 1 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 0 },
        { beat: 1 , volume: 1 },
        { beat: 1 , volume: 0 },
    ]
};

const instrumentPack = [
    getInstrument('guitar', predefinedSequences['guitar']),
    getInstrument('kick', predefinedSequences['kick']),
    getInstrument('snare', predefinedSequences['snare']),
    getInstrument('hihat', predefinedSequences['hihat']),
]

const initiateInstruments = (instrumentPack, context) => {
    const playInstrumentSounds = playInstrumentSoundsAtTempo(context, bpmMultiplier);
    const createSoundsAndPlay = instrument => compose(playInstrumentSounds, generateInstrumentSoundMap, generateInstrumentTimeMap)(instrument);
    const instruments = instrumentPack.map(createSoundsAndPlay);

    document.querySelector('.js-play').addEventListener('click', () => {
        instruments.map(compose(playInstrumentSounds, stopInstrumentSounds))
    });
    window.context = context;
}

const context = new AudioContext();
loadInstrumentBuffers(context, instrumentPack)
    .then((instrumentPack) => initiateInstruments(instrumentPack, context, predefinedSequences));

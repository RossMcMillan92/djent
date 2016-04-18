import './polyfills/array.values.js';
import './polyfills/AudioContext';

import {
    loadInstrumentBuffers,
    playSound
} from './app/audio';

import {
    generateSequence
} from './app/beats';

import {
    getInstrumentPack,
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    repeatHits,
    repeatSequence,
    renderInstrumentSoundsAtTempo
} from './app/instruments';

import {
    compose,
    randFromTo,
    repeatArray
} from './app/tools';

const generateRiff = ({ bpm, totalBeats, grooveBeats, allowedLengths, sequences }) => {
    const bpmMultiplier  = 60 / bpm;
    const context = new AudioContext();
    const instrumentPack = getInstrumentPack(sequences, totalBeats);

    loadInstrumentBuffers(context, instrumentPack)
        .then((instrumentPack) => initiateInstruments(context, instrumentPack, totalBeats, bpmMultiplier))
        .then(buffer => initiateBufferController(context, buffer))
        .catch(console.log);
}

const initiateInstruments = (context, instrumentPack, totalBeats, bpmMultiplier) => {
    const createSoundMaps = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        instrument => repeatSequence(instrument, totalBeats),
        generateInstrumentHitTypes
    )(instrument);

    const instruments = instrumentPack
        .map(createSoundMaps);

    return renderInstrumentSoundsAtTempo(instruments, totalBeats, bpmMultiplier);
}

const initiateBufferController = (context, buffer) => {
    const playButton       = document.querySelector('.js-play');
    const stopButton       = document.querySelector('.js-stop');
    const regenerateButton = document.querySelector('.js-regenerate');
    const loopCheckbox     = document.querySelector('.js-loop');

    let src;

    const play             = () => playSound(context, buffer, context.currentTime, buffer.duration, 1, true);
    const stop             = () => { if (src) src.stop() };
    let isLooping          = loopCheckbox.checked;

    const playEvent = () => {
        stop();
        src = play();
        src.loop = isLooping;
    };

    const stopEvent = stop;

    const regenerateEvent = () => {
        stop();
        deactivate();
        init();
    };

    const loopEvent = (evt) => {
        isLooping = evt.target.checked;
    };

    const deactivate = () => {
        context.close();
        playButton.removeEventListener('click', playEvent);
        stopButton.removeEventListener('click', stopEvent);
        regenerateButton.removeEventListener('click', regenerateEvent);
        loopCheckbox.removeEventListener('change', loopEvent);
    }

    playButton.addEventListener('click', playEvent);
    stopButton.addEventListener('click', stopEvent);
    regenerateButton.addEventListener('click', regenerateEvent);
    loopCheckbox.addEventListener('change', loopEvent);
}

const init = () => {
    const bpm            = parseInt(document.querySelector('.js-bpm').value);
    const totalBeats     = parseInt(document.querySelector('.js-total-beats').value);
    const grooveBeats    = parseInt(document.querySelector('.js-groove-beats').value);
    console.log('test', document.querySelector('.js-length-half-triplet').checked)
    const allowedLengths = [
        ...repeatArray([(.25 * (document.querySelector('.js-length-whole-triplet').checked ? 1.5 : 1 ))], parseInt(document.querySelector('.js-length-whole').value)),
        ...repeatArray([(.5 * (document.querySelector('.js-length-half-triplet').checked ? 1.5 : 1 ))], parseInt(document.querySelector('.js-length-half').value)),
        ...repeatArray([(1 * (document.querySelector('.js-length-quarter-triplet').checked ? 1.5 : 1 ))], parseInt(document.querySelector('.js-length-quarter').value)),
        ...repeatArray([(2 * (document.querySelector('.js-length-eighth-triplet').checked ? 1.5 : 1 ))], parseInt(document.querySelector('.js-length-eighth').value)),
        ...repeatArray([(4 * (document.querySelector('.js-length-sixteenth-triplet').checked ? 1.5 : 1 ))], parseInt(document.querySelector('.js-length-sixteenth').value)),
    ];
    if(!allowedLengths.length) return;
    console.log('allowedLengths', allowedLengths, parseInt(document.querySelector('.js-length-whole').value))
    const mainBeat       = generateSequence({ totalBeats: grooveBeats, allowedLengths, hitChance: 1 });
    const sequences      = {
        crash: [
            { beat: 1, volume: 1 },
        ],

        hihat: [
            { beat: 1, volume: 0 },

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

    generateRiff({ bpm, totalBeats, grooveBeats, allowedLengths, sequences });
}

init();

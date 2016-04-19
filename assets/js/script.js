import './polyfills/array.values.js';
import './polyfills/AudioContext';

import {
    loadInstrumentBuffers,
    playSound
} from './app/audio';

import {
    generateSequence,
    getSequenceForInstrument,
} from './app/sequences';

import {
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    getInstrumentPack,
    repeatHits,
    repeatSequence,
    renderInstrumentSoundsAtTempo
} from './app/instruments';

import {
    arraySelector,
    compose,
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

    const allowedLengths = arraySelector('.js-lengths')
        .reduce((lengths, cur, index, arr) => {
            const children = Array.from(cur.children);
            const isTriplet = cur.querySelector('.js-triplet').checked;
            const amount = parseInt(cur.querySelector('.js-amount').value);
            const length = parseFloat(cur.dataset.length) * (isTriplet ? 1.5 : 1);

            return [
                ...lengths,
                ...repeatArray([length], amount)
            ]
        }, []);

    if(!allowedLengths.length) return;

    const mainBeat      = generateSequence({ totalBeats: grooveBeats, allowedLengths, hitChance: 1 });
    const crashSequence = getSequenceForInstrument('crash');
    const hihatSequence = getSequenceForInstrument('hihat');
    const snareSequence = getSequenceForInstrument('snare');

    const sequences     = {
        crash: crashSequence,
        hihat: hihatSequence,
        kick: mainBeat,
        guitar: mainBeat,
        snare: snareSequence
    };

    generateRiff({ bpm, totalBeats, grooveBeats, allowedLengths, sequences });
}

init();

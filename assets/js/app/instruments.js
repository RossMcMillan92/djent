import {
    loopSequence,
    generateTimeMap,
} from './beats';

import {
    randFromTo,
    repeatArray,
} from './tools';

import { playSound } from './audio';

const defaultInstrument = {
    id: '',
    buffers: [],
    durations: [],
    hitTypes: [],
    paths: [],
    sequence: [],
    sources: [],
    timeMap: [],
}

const instruments = {
    guitar: {
        id: 'guitar',
        paths: [
            'assets/audio/guitar-palm-zero-1.wav',
            'assets/audio/guitar-palm-zero-2.wav',
            'assets/audio/guitar-open-zero-1.wav',
            'assets/audio/guitar-open-zero-2.wav',
            'assets/audio/guitar-open-first-1.wav',
            'assets/audio/guitar-open-first-2.wav',
            'assets/audio/guitar-open-eighth.wav',
            // 'assets/audio/guitar-dissonance-high.wav',
        ],
    },
    kick: {
        id: 'kick',
        paths: [
            'assets/audio/kick.wav'
        ],
    },
    snare: {
        id: 'snare',
        paths: [
            'assets/audio/snare.wav'
        ],
    },
    hihat: {
        id: 'hihat',
        paths: [
            'assets/audio/hihat.wav'
        ],
    }
}

const getInstrument = (id, other) => ({ ...defaultInstrument, ...instruments[id], ...other });

const generateInstrumentTimeMap = (instrument) => {
    const timeMap = generateTimeMap(instrument.sequence);

    return {
        ...instrument,
        timeMap
    }
}

const generateInstrumentHitTypes = (instrument) => {
    const hitTypes = instrument.sequence.map((hit) => randFromTo(0, instrument.buffers.length-1));

    return {
        ...instrument,
        hitTypes
    }
}

const playInstrumentSoundsAtTempo = (context, bpmMultiplier) => (instrument) => {
    let startTimes = [];
    let durations   = [];
    const sources = instrument.timeMap.reduce((sources, time, i) => {
        const instrumentSound = instrument.buffers[instrument.hitTypes[i]];
        const startTime       = context.currentTime + (time * bpmMultiplier);
        const duration        = (1 / instrument.sequence[i].beat) * bpmMultiplier;
        const source          = playSound(context, instrumentSound, startTime, duration, instrument.sequence[i].volume);

        startTimes[i] = startTime;
        durations[i]   = duration;

        return [ ...sources, source ];
    }, []);

    const newInstrument = { ...instrument, sources, startTimes, durations };

    return newInstrument;
}

const repeatHits = instrument => {
    const hitTypes = repeatArray(instrument.hitTypes, instrument.sequence.length);

    return {
        ...instrument,
        hitTypes
    }
}

const repeatSequence = (instrument, beats) => {
    const sequence = loopSequence(instrument.sequence, beats);

    return {
        ...instrument,
        sequence
    }
}


const stopInstrumentSounds = instrument => {
    instrument.sources.forEach(source => source && source.stop());
    return {
        ...instrument,
        sources: []
    }
}

export {
    getInstrument,
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    playInstrumentSoundsAtTempo,
    repeatHits,
    repeatSequence,
    stopInstrumentSounds
}

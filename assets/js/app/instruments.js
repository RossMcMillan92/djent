import {
    generateTimeMap,
} from './beats';

import {
    randFromTo,
} from './tools';

import { playSound } from './audio';

const defaultInstrument = {
    id: '',
    paths: [],
    sequence: [],
    timeMaps: [],
    soundMap: []
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
            // 'assets/audio/guitar-open-first-2.wav',
            // 'assets/audio/guitar-open-eighth.wav',
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

const getInstrument = (id, sequence) => ({ ...defaultInstrument, ...instruments[id], sequence });

const generateInstrumentTimeMap = (instrument) => {
    const timeMap = generateTimeMap(instrument.sequence);

    return {
        ...instrument,
        timeMap
    }
}

const generateInstrumentSoundMap = (instrument) => {
    const soundMap = instrument.sequence.map((hit) => instrument.buffers[randFromTo(0, instrument.buffers.length-1)]);

    return {
        ...instrument,
        soundMap
    }
}

const playInstrumentSoundsAtTempo = (context, bpmMultiplier) => (instrument) => {
    instrument.sources = instrument.timeMap.reduce((sources, time, i) => {
        const instrumentSound = instrument.soundMap[i];
        const startTime = time * bpmMultiplier;
        const duration = (1 / instrument.sequence[i].beat) * bpmMultiplier;

        return instrument.sequence[i].volume
               ? [ ...sources, playSound(context, instrumentSound, startTime, duration) ]
               : sources
    }, []);

    return instrument;
}

const stopInstrumentSounds = instrument => {
    instrument.sources.forEach(source => source.stop());
    return instrument
}

export {
    getInstrument,
    generateInstrumentTimeMap,
    generateInstrumentSoundMap,
    playInstrumentSoundsAtTempo,
    stopInstrumentSounds
}

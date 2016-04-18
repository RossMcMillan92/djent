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
            // 'assets/audio/guitar-open-eighth.wav',
            'assets/audio/guitar-dissonance-high.wav',
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
    },
    crash: {
        id: 'crash',
        paths: [
            // 'assets/audio/crash1.wav',
            // 'assets/audio/crash2.wav',
            'assets/audio/china.wav',
        ],
    }
}

const getInstrument = (id, other) => ({ ...defaultInstrument, ...instruments[id], ...other });

const getInstrumentPack = (sequences, totalBeats) => {
    const instrumentPack = [
        getInstrument('guitar', {
            sequence: sequences['guitar']
        }),

        getInstrument('kick', {
            sequence: sequences['kick']
        }),

        getInstrument('snare', {
            sequence: loopSequence(sequences['snare'], totalBeats)
        }),

        getInstrument('hihat', {
            sequence: loopSequence(sequences['hihat'], totalBeats)
        }),

        getInstrument('crash', {
            sequence: loopSequence(sequences['crash'], totalBeats)
        }),
    ];

    return instrumentPack;
}

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

const renderInstrumentSoundsAtTempo = (instruments, totalBeats, bpmMultiplier) => {
    const timeLength = totalBeats * bpmMultiplier;
    const offlineCtx = new OfflineAudioContext(2, 44100 * timeLength, 44100);

    instruments.forEach((instrument) => {
        let startTimes = [];
        let durations  = [];
        const sources = instrument.timeMap.reduce((sources, time, i) => {
            const instrumentSound = instrument.buffers[instrument.hitTypes[i]];
            const startTime       = offlineCtx.currentTime + (time * bpmMultiplier);
            const duration        = (1 / instrument.sequence[i].beat) * bpmMultiplier;
            const source          = playSound(offlineCtx, instrumentSound, startTime, duration, instrument.sequence[i].volume, 0);

            startTimes[i] = startTime;
            durations[i]   = duration;

            return [ ...sources, source ];
        }, []);
    })
    return new Promise((res, rej) => {
        offlineCtx.oncomplete = ev => res(ev.renderedBuffer);
        offlineCtx.onerror    = ev => rej(ev.renderedBuffer);
        offlineCtx.startRendering();
    })
}
//
// const renderInstrumentSoundsAtTempo = (context, bpmMultiplier) => (instrument) => {
//     let startTimes = [];
//     let durations  = [];
//     const sources = instrument.timeMap.reduce((sources, time, i) => {
//         const instrumentSound = instrument.buffers[instrument.hitTypes[i]];
//         const startTime       = context.currentTime + (time * bpmMultiplier);
//         const duration        = (1 / instrument.sequence[i].beat) * bpmMultiplier;
//         const source          = playSound(context, instrumentSound, startTime, duration, instrument.sequence[i].volume);
//
//         startTimes[i] = startTime;
//         durations[i]   = duration;
//
//         return [ ...sources, source ];
//     }, []);
//
//     const newInstrument = { ...instrument, sources, startTimes, durations };
//
//     return newInstrument;
// }

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


export {
    getInstrument,
    getInstrumentPack,
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    renderInstrumentSoundsAtTempo,
    repeatHits,
    repeatSequence,
}

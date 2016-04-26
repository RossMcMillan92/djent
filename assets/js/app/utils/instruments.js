import {
    loopSequence,
    generateTimeMap,
} from './sequences';

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
    sounds: [],
    sequence: [],
    sources: [],
    timeMap: [],
}

const instruments = [
    {
        id: 'guitar',
        sounds: [
            {
                id: 'guitar-palm-zero-1',
                path: 'assets/audio/guitar-palm-zero-1.wav',
            },
            {
                id: 'guitar-palm-zero-2',
                path: 'assets/audio/guitar-palm-zero-2.wav',
            },
            {
                id: 'guitar-open-zero-1',
                path: 'assets/audio/guitar-open-zero-1.wav',
            },
            {
                id: 'guitar-open-zero-2',
                path: 'assets/audio/guitar-open-zero-2.wav',
            },
            {
                id: 'guitar-open-first-1',
                path: 'assets/audio/guitar-open-first-1.wav',
            },
            {
                id: 'guitar-open-first-2',
                path: 'assets/audio/guitar-open-first-2.wav',
            },
            {
                id: 'guitar-open-eighth',
                path: 'assets/audio/guitar-open-eighth.wav',
            },
            {
                id: 'guitar-dissonance-high',
                path: 'assets/audio/guitar-dissonance-high.wav',
            }
        ],
    },
    {
        id: 'kick',
        sounds: [
            {
                id: 'kick',
                path: 'assets/audio/kick.wav'
            }
        ],
    },
    {
        id: 'snare',
        sounds: [
            {
                id: 'snare',
                path: 'assets/audio/snare.wav'
            }
        ],
    },
    {
        id: 'hihat',
        sounds: [
            {
                id: 'hihat',
                path: 'assets/audio/hihat.wav'
            }
        ],
    },
    {
        id: 'crash',
        sounds: [
            {
                id: 'crash1',
                path: 'assets/audio/crash1.wav',
            },
            {
                id: 'crash2',
                path: 'assets/audio/crash2.wav',
            },
            {
                id: 'china',
                path: 'assets/audio/china.wav',
            }
        ],
    }
]

const getInstrument = (id, other) => ({ ...defaultInstrument, ...instruments.find(i => i.id === id), ...other });

const getInstruments = () => [ ...instruments ];

const getInstrumentPack = (sequences, totalBeats) => Object.keys(sequences).map(instrumentId => getInstrument(instrumentId, { sequence: loopSequence(sequences[instrumentId]) }));

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
    getInstruments,
    getInstrumentPack,
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    renderInstrumentSoundsAtTempo,
    repeatHits,
    repeatSequence,
}

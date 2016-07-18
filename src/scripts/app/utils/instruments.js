import {
    loopSequence,
    generateTimeMap,
} from './sequences';

import {
    deepClone,
    randFromTo,
    repeatArray,
} from './tools';

import { playSound } from './audio';

const generateInstrumentTimeMap = (instrument) => ({
    ...instrument,
    timeMap: generateTimeMap(instrument.sequence)
})

const generateInstrumentHitTypes = (instrument, usePredefinedSettings) => {
    const predefinedHitTypes = instrument.predefinedHitTypes;

    if (usePredefinedSettings && predefinedHitTypes && predefinedHitTypes.length) return {
        ...instrument,
        hitTypes: [ ...predefinedHitTypes ]
    }

    const activeSounds = instrument.sounds.reduce((newArr, sound, i) => sound.enabled ? [ ...newArr, { ...sound } ] : newArr, []);
    let hitTypes = [];

    if (activeSounds.length) {
        hitTypes = instrument.sequence.map((hit) => {
            return activeSounds[randFromTo(0, activeSounds.length-1)].id});
    }

    return {
        ...instrument,
        hitTypes
    }
}

const getActiveSoundsFromHitTypes = (hitTypes) =>
    (!hitTypes ? [] : hitTypes)
        .reduce((newArr, hit, i) => {
            return newArr.includes(hit) ? newArr : [ ...newArr, hit ];
        }, [])
        .map(hit => ({ id: hit, enabled: true }));

const renderInstrumentSoundsAtTempo = (instruments, totalBeats, bpmMultiplier) => {
    const timeLength = totalBeats * bpmMultiplier;
    const offlineCtx = new OfflineAudioContext(2, 44100 * timeLength, 44100);

    instruments.forEach((instrument) => {
        let startTimes = [];
        let durations  = [];
        const sources = instrument.timeMap.reduce((sources, time, i) => {
            const pitchAmount       = instrument.pitch || 0;
            const instrumentSound    = instrument.buffers[instrument.hitTypes[i]];
            const startTime          = offlineCtx.currentTime + (time * bpmMultiplier);
            const duration           = instrument.ringout ? instrumentSound.duration : ((1 / instrument.sequence[i].beat) * bpmMultiplier);
            const source             = playSound(offlineCtx, instrumentSound, startTime, duration, instrument.sequence[i].volume, pitchAmount);

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
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    getActiveSoundsFromHitTypes,
    renderInstrumentSoundsAtTempo,
    repeatHits,
    repeatSequence,
}

import {
    loopSequence,
    generateTimeMap,
} from './sequences';

import {
    randFromTo,
    repeatArray,
} from './tools';

import { playSound } from './audio';

const generateInstrumentTimeMap = (instrument) => ({
    ...instrument,
    timeMap: generateTimeMap(instrument.sequence)
});

const generateInstrumentHitTypes = (instrument, usePredefinedSettings) => {
    const predefinedHitTypes = instrument.predefinedHitTypes;

    if (usePredefinedSettings && predefinedHitTypes && predefinedHitTypes.length) {
        return {
            ...instrument,
            hitTypes: [ ...predefinedHitTypes ]
        };
    }

    const activeSounds = instrument.sounds.reduce((newArr, sound) => sound.enabled ? [ ...newArr, { ...sound } ] : newArr, []);
    let hitTypes = [];

    if (activeSounds.length) {
        let beatCount = 0;
        let currentHitType = false;
        hitTypes = instrument.sequence.map((beat) => {
            const shouldRandomise = beatCount === 0 || beatCount >= instrument.repeatHitTypeForXBeat;
            currentHitType = shouldRandomise
                           ? randFromTo(0, activeSounds.length - 1)
                           : currentHitType;

            beatCount = beatCount < instrument.repeatHitTypeForXBeat ? beatCount + (1 / beat.beat) : beatCount - instrument.repeatHitTypeForXBeat + (1 / beat.beat);
            return activeSounds[currentHitType].id;
        });
    }

    return {
        ...instrument,
        hitTypes
    };
};

const getActiveSoundsFromHitTypes = (hitTypes) => (!hitTypes ? [] : hitTypes)
    .reduce((newArr, hit) => newArr.includes(hit) ? newArr : [ ...newArr, hit ], [])
    .map(hit => ({ id: hit, enabled: true }));

const getBufferFromAudioTemplate = (audioTemplate, timeLength) => {
    const offlineCtx = new OfflineAudioContext(2, 44100 * timeLength, 44100);

    audioTemplate.forEach(({
        buffer,
        startTime,
        duration,
        volume,
        pitchAmount,
        fadeInDuration,
        fadeOutDuration,
        reverb,
    }) => {
        playSound(offlineCtx, buffer, startTime, duration, volume, pitchAmount, fadeInDuration, fadeOutDuration, reverb);
    });

    return new Promise((res, rej) => {
        offlineCtx.oncomplete = ev => res(ev.renderedBuffer);
        offlineCtx.onerror    = ev => rej(ev.renderedBuffer);
        offlineCtx.startRendering();
    });
};

const renderRiffTemplateAtTempo = (instruments, bpmMultiplier) => instruments
    .reduce((newArr, instrument) => {
        const hits = instrument.timeMap
            .reduce((newHits, time, i) => {
                const pitchAmount     = instrument.pitch || 0;
                const buffer          = instrument.buffers[instrument.hitTypes[i]];
                const startTime       = time * bpmMultiplier;
                const duration        = instrument.ringout ? buffer.duration : ((1 / instrument.sequence[i].beat) * bpmMultiplier);
                const prevNoteExisted = i && instrument.sequence[i - 1].volume;
                const fadeOutDuration = Math.min(instrument.fadeOutDuration, duration) || 0;
                const fadeInDuration  = prevNoteExisted ? fadeOutDuration || 0 : 0;
                const reverb          = typeof instrument.reverb !== 'undefined' ? instrument.reverb : false;
                const volume          = instrument.sequence[i].volume * (instrument.volume ? instrument.volume : 1);

                return [
                    ...newHits,
                    {
                        buffer,
                        startTime,
                        duration,
                        volume,
                        pitchAmount,
                        fadeInDuration,
                        fadeOutDuration,
                        reverb
                    }
                ];
            }, []);

        return [
            ...newArr,
            ...hits
        ];
    }, [])
    .sort((a, b) => a.startTime - b.startTime);

const repeatHits = instrument => {
    const hitTypes = repeatArray(instrument.hitTypes, instrument.sequence.length);

    return {
        ...instrument,
        hitTypes
    };
};

const repeatSequence = (instrument, totalBeats) => {
    const sequence = loopSequence(instrument.sequence, totalBeats);

    return {
        ...instrument,
        sequence
    };
};


export {
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    getActiveSoundsFromHitTypes,
    getBufferFromAudioTemplate,
    renderRiffTemplateAtTempo,
    repeatHits,
    repeatSequence,
};

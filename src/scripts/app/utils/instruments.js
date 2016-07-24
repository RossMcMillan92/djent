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

    instrument.repeatHitTypeForXBeat > 0 && console.log('lmao')
    if (activeSounds.length) {
        let beatCount = 0;
        let currentHitType = false;
        hitTypes = instrument.sequence.map((beat, i) => {
            const shouldRandomise = beatCount === 0 || beatCount >= instrument.repeatHitTypeForXBeat;
            currentHitType = shouldRandomise
                           ? randFromTo(0, activeSounds.length-1)
                           : currentHitType;

            instrument.repeatHitTypeForXBeat > 0 && console.log('BEATCOUNT', activeSounds[currentHitType].id, beatCount, shouldRandomise, instrument.repeatHitTypeForXBeat)
            beatCount = beatCount < instrument.repeatHitTypeForXBeat ? beatCount + (1 / beat.beat) : beatCount - instrument.repeatHitTypeForXBeat + (1 / beat.beat)
            return activeSounds[currentHitType].id
        });
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

const renderInstrumentSoundsAtTempo = (instruments, timeLength, bpmMultiplier) => {
    const offlineCtx = new OfflineAudioContext(2, 44100 * timeLength, 44100);

    instruments.forEach((instrument) => {
        const sources = instrument.timeMap.forEach((sources, time, i) => {
            const pitchAmount       = instrument.pitch || 0;
            const instrumentSound    = instrument.buffers[instrument.hitTypes[i]];
            const startTime          = offlineCtx.currentTime + (time * bpmMultiplier);
            const duration           = instrument.ringout ? instrumentSound.duration : ((1 / instrument.sequence[i].beat) * bpmMultiplier);
            const prevNoteExisted    = i && instrument.sequence[i-1].volume
            const fadeOutDuration    = Math.min(instrument.fadeOutDuration, duration) || 0;
            const fadeInDuration     = prevNoteExisted ? fadeOutDuration || 0 : 0;
            const source             = playSound(offlineCtx, instrumentSound, startTime, duration, instrument.sequence[i].volume, pitchAmount, fadeInDuration, fadeOutDuration);
        });
    })

    return new Promise((res, rej) => {
        offlineCtx.oncomplete = ev => res(ev.renderedBuffer);
        offlineCtx.onerror    = ev => rej(ev.renderedBuffer);
        offlineCtx.startRendering();
    })
}

const renderRiffTemplateAtTempo = (instruments, bpmMultiplier) => {
    return instruments
        .reduce((newArr, instrument) => {
            const hits = instrument.timeMap
                .reduce((hits, time, i) => {
                    const pitchAmount     = instrument.pitch || 0;
                    const buffer          = instrument.buffers[instrument.hitTypes[i]];
                    const startTime       = time * bpmMultiplier;
                    const duration        = instrument.ringout ? buffer.duration   : ((1 / instrument.sequence[i].beat) * bpmMultiplier);
                    const prevNoteExisted = i && instrument.sequence[i-1].volume
                    const fadeOutDuration = Math.min(instrument.fadeOutDuration, duration) || 0;
                    const fadeInDuration  = prevNoteExisted ? fadeOutDuration || 0 : 0;
                    const volume          = instrument.sequence[i].volume;

                    return [
                        ...hits,
                        {
                            instrumentID: instrument.id,
                            buffer,
                            startTime,
                            duration,
                            volume,
                            pitchAmount,
                            fadeInDuration,
                            fadeOutDuration,
                        }
                    ];
                }, [])

            return [
                ...newArr,
                ...hits
            ]
        }, [])
        .sort((a, b) => a.startTime - b.startTime);;
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
    renderRiffTemplateAtTempo,
    renderInstrumentSoundsAtTempo,
    repeatHits,
    repeatSequence,
}

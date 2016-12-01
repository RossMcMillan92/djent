import { confineToRange } from '../utils/tools';

export function updateInstrumentSound({ soundID, parentID, prop, value }) {
    return {
        type: 'UPDATE_INSTRUMENT_SOUND_PROP',
        payload: { soundID, parentID, prop, value },
    };
}

export function updateInstrumentPitch({ instrumentID, value }) {
    return {
        type: 'UPDATE_INSTRUMENT_DETUNE_PROP',
        payload: { instrumentID, value: confineToRange(-1200, 1200, value) },
    };
}

export function updateInstrumentVolume({ instrumentID, value }) {
    return {
        type: 'UPDATE_INSTRUMENT_VOLUME_PROP',
        payload: { instrumentID, value: confineToRange(0, 1, value) },
    };
}

export function updateInstrumentRepeatingHits({ instrumentID, value }) {
    return {
        type: 'UPDATE_INSTRUMENT_REPEATING_HITS',
        payload: { instrumentID, value: confineToRange(0, 200, value) },
    };
}

export function updateCustomPresetInstruments(instruments) {
    return {
        type: 'UPDATE_CUSTOM_PRESET_INSTRUMENTS',
        payload: { instruments },
    };
}

export function updateInstrumentSequences(instrumentID, sequences) {
    return {
        type: 'UPDATE_INSTRUMENT_SEQUENCES',
        payload: { instrumentID, sequences },
    };
}

import { extendObjectArrayByID } from '../utils/tools';

const initialState = {
    activePresetID       : 'black-dahlia',
    bpm                  : 50,
    fadeIn               : false,
    continuousGeneration : false,
};

export default function config(state = { ...initialState }, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_BPM':
            return {
                ...state,
                bpm: payload.bpm
            };

        case 'UPDATE_IS_LOOOPING':
            return {
                ...state,
                continuousGeneration: payload.isLooping ? false : state.continuousGeneration
            };

        case 'UPDATE_CONTINUOUS_GENERATION':
            return {
                ...state,
                continuousGeneration: payload.continuousGeneration
            };

        case 'UPDATE_FADEIN':
            return {
                ...state,
                fadeIn: payload.fadeIn
            };

        case 'APPLY_PRESET':
            const { preset } = payload;
            const { bpm, fadeIn, allowedLengths, hitChance } = preset.settings.config;
            const newState = { ...initialState };

            if (bpm) newState.bpm = bpm;
            if (fadeIn) newState.fadeIn = fadeIn;
            if (hitChance) newState.hitChance = hitChance;
            if (allowedLengths) {
                newState.allowedLengths = extendObjectArrayByID(newState.allowedLengths, [ ...allowedLengths ])
            }

            return {
                ...newState,
                activePresetID: preset.id
            };

        default:
            return state;
  }
}

export {
    initialState
}

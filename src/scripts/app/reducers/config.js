import { extendObjectArrayByID } from '../utils/tools';

const allowedLengths = [
        {
            id: "0.25",
            name: 'whole',
            amount: 0,
            isTriplet: false
        },
        {
            id: "0.5",
            name: 'half',
            amount: 1,
            isTriplet: false
        },
        {
            id: "1",
            name: 'quarter',
            amount: 0,
            isTriplet: false
        },
        {
            id: "2",
            name: 'eighth',
            amount: 0,
            isTriplet: false
        },
        {
            id: "4",
            name: 'sixteenth',
            amount: 0,
            isTriplet: false
        },
];

const initialState = {
    allowedLengths,
    activePresetID : 'preset1',
    bpm            : 50,
    fadeIn         : false,
    fadeOut        : true,
    hitChance      : 1,
    isLooping      : true,
};

export default function config(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_ALLOWED_LENGTHS':
            return {
                ...state,
                allowedLengths: payload.allowedLengths
            };

        case 'UPDATE_BPM':
            return {
                ...state,
                bpm: payload.bpm
            };

        case 'UPDATE_IS_LOOPING':
            return {
                ...state,
                isLooping: payload.isLooping
            };

        case 'UPDATE_HITCHANCE':
            return {
                ...state,
                hitChance: payload.hitChance
            };

        case 'UPDATE_FADEIN':
            return {
                ...state,
                fadeIn: payload.fadeIn
            };

        case 'UPDATE_FADEOUT':
            return {
                ...state,
                fadeOut: payload.fadeOut
            };

        case 'APPLY_PRESET':
            const { preset } = payload;
            const { bpm, fadeIn, allowedLengths } = preset.settings.config;
            const newState = { ...initialState };

            if (bpm) newState.bpm = bpm;
            if (fadeIn) newState.fadeIn = fadeIn;
            if (allowedLengths) {
                newState.allowedLengths = extendObjectArrayByID(newState.allowedLengths, allowedLengths)
            }

            return {
                ...newState,
                activePresetID: preset.id
            };

        default:
            return state;
  }
}

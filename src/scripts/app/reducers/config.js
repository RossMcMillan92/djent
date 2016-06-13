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
        amount: 0,
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
    activePresetID       : 'thall-buster',
    bpm                  : 50,
    fadeIn               : false,
    hitChance            : 1,
    isLooping            : true,
    continuousGeneration : false,
};

const getInitialState = () => {
    return {
        ...initialState,
        allowedLengths: allowedLengths.map(length => ({ ...length }))
    }
}

export default function config(state = getInitialState(), action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_ALLOWED_LENGTHS':
            return {
                ...state,
                allowedLengths: payload.allowedLengths
            };

        case 'UPDATE_BPM':
            let newBPM = payload.bpm;

            if (!newBPM)       newBPM = 100;
            if (newBPM < 50)   newBPM = 50;
            if (newBPM > 9999) newBPM = 9999;

            return {
                ...state,
                bpm: newBPM
            };

        case 'UPDATE_IS_LOOPING':
            return {
                ...state,
                isLooping: payload.isLooping
            };

        case 'UPDATE_CONTINUOUS_GENERATION':
            return {
                ...state,
                continuousGeneration: payload.continuousGeneration
            };

        case 'UPDATE_HITCHANCE':
            let newHitChance = payload.hitChance;

            if (!newHitChance)       newHitChance = 1;
            if (newHitChance < 0.05)   newHitChance = 0.05;
            if (newHitChance > 1) newHitChance = 1;

            return {
                ...state,
                hitChance: newHitChance
            };

        case 'UPDATE_FADEIN':
            return {
                ...state,
                fadeIn: payload.fadeIn
            };

        case 'APPLY_PRESET':
            const { preset } = payload;
            const { bpm, fadeIn, allowedLengths, hitChance } = preset.settings.config;
            const newState = { ...getInitialState() };

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

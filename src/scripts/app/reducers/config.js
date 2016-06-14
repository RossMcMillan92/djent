import { fromJS, Map, List } from 'immutable';
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
    console.log('GETINITIALSTATE', fromJS(initialState))
    return fromJS(initialState)
}

export default function config(state = getInitialState(), action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_ALLOWED_LENGTHS':
            return state.set('allowedLengths', List(allowedLengths));

        case 'UPDATE_BPM':
            let newBPM = payload.bpm;

            if (!newBPM)       newBPM = 100;
            if (newBPM < 50)   newBPM = 50;
            if (newBPM > 9999) newBPM = 9999;

            return state.set('bpm', newBPM);

        case 'UPDATE_IS_LOOPING':
            return state.set('isLooping', payload.isLooping);

        case 'UPDATE_CONTINUOUS_GENERATION':
            return state.set('continuousGeneration', payload.continuousGeneration);

        case 'UPDATE_HITCHANCE':
            let newHitChance = payload.hitChance;

            if (!newHitChance)       newHitChance = 1;
            if (newHitChance < 0.05)   newHitChance = 0.05;
            if (newHitChance > 1) newHitChance = 1;

            return
                return state.set('hitChance', newHitChance);

        case 'UPDATE_FADEIN':
            return state.set('fadeIn', payload.fadeIn);

        case 'APPLY_PRESET':
            const { preset } = payload;
            const { bpm, fadeIn, allowedLengths, hitChance } = preset.settings.config;
            let newState = getInitialState().set('activePresetID', preset.id);

            if (bpm) newState = newState.set('bpm', bpm);
            if (fadeIn) newState = newState.set('fadeIn', fadeIn);
            if (hitChance) newState = newState.set('hitChance', hitChance);
            if (allowedLengths) {
                newState = newState.set('allowedLengths', List(extendObjectArrayByID(newState.get('allowedLengths').toJS(), allowedLengths)));
            }

            return fromJS(newState);

        default:
            return state;
  }
}

export {
    initialState
}

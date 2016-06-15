import { extendObjectArrayByID, deepCloneObject, updateObjByID } from '../utils/tools';
import deepExtend from 'deep-extend';

const initialState = {
    id: '',
    description: '',
    settings: {
        config: {
            bpm            : 100,
            hitChance      : 1,
            allowedLengths : [
                {
                    id: '1',
                    amount: 5
                },
                {
                    id: '2',
                    amount: 10
                }
            ],
        },
        beats: [],
    }
};

export default function config(state = { ...initialState }, action) {
    let { type, payload } = action;
    let newState;

    switch (type) {
        case 'UPDATE_CUSTOM_PRESET_INSTRUMENTS':
            newState = deepCloneObject(state);
            newState.settings.instruments = newState.settings.instruments
                .map(instrument => {
                    const i = payload.instruments
                        .find(i => i.id === instrument.id);

                    return {
                        ...instrument,
                        predefinedHitTypes: [ ...i.hitTypes ],
                        predefinedSequence: i.sequence.map(seq => deepCloneObject(seq)),
                    }
                });

            return newState;

        case 'UPDATE_ALLOWED_LENGTHS':
            newState = deepCloneObject(state);
            newState.settings.config.allowedLengths = payload.allowedLengths;

            return newState;

        case 'UPDATE_BPM':
            newState = deepCloneObject(state);
            newState.settings.config.bpm = payload.bpm;

            return newState;

        case 'UPDATE_IS_LOOPING':
            newState = deepCloneObject(state);
            newState.settings.config.isLooping = payload.isLooping;

            return newState;

        case 'UPDATE_CONTINUOUS_GENERATION':
            newState = deepCloneObject(state);
            newState.settings.config.continuousGeneration = payload.continuousGeneration;

            return newState;

        case 'UPDATE_HITCHANCE':
            newState = deepCloneObject(state);
            newState.settings.config.hitChance = payload.hitChance;

            return newState;

        case 'UPDATE_FADEIN':
            newState = deepCloneObject(state);
            newState.settings.config.fadeIn = payload.fadeIn;

            return newState;

        case 'UPDATE_BEATS':
            let { value, prop, id } = payload;
            newState = deepCloneObject(state);

            newState.settings.beats = updateObjByID({ objs: newState.settings.beats, id, prop, value });
            return newState;

        case 'APPLY_PRESET':
            const { preset } = payload;
            return deepExtend({}, preset);

        default:
            return state;
  }
}

export {
    initialState
}

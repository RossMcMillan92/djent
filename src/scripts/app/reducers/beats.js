import deepExtend from 'deep-extend';

import {
    deepClone,
    extendObjectArrayByID,
    updateObjByID
} from '../utils/tools';

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

const initialCustomBeat = {
    id    : 'RAND_BEAT_1',
    bars  : 1,
    beats : 12,
    allowedLengths,
    hitChance: 1
};

const initialState =  [
    {
        id    : 'total',
        bars  : 8,
        beats : 4,
    },
    initialCustomBeat
];

const getInitialState = () => deepClone(initialState)

export default function beats(state = getInitialState(), action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_BEATS':
            let { value, prop, id } = payload;

            return updateObjByID({ objs: state, id, prop, value })

        case 'APPLY_PRESET':
            const { preset } = payload;
            const newState = getInitialState();
            const newBeats = preset.settings.beats
                .map(beat => {
                    const oldBeat = newState.find(oldBeat => oldBeat.id === beat.id) || deepClone(initialCustomBeat);
                    if (beat.allowedLengths && oldBeat.allowedLengths) beat.allowedLengths = extendObjectArrayByID(oldBeat.allowedLengths, [ ...beat.allowedLengths ])
                    const newBeat = deepExtend(oldBeat, beat);

                    return newBeat;
                });

            if (newBeats) return newBeats;
            return state;

        default:
            return state;
  }
}

const defaultAllowedLengths = deepClone(allowedLengths);
export {
    defaultAllowedLengths
}

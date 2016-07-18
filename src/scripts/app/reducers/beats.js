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

const initialState =  [
    {
        id    : 'total',
        bars  : 8,
        beats : 4,
    },
    {
        id    : 'RAND_BEAT_1',
        bars  : 1,
        beats : 12,
        allowedLengths,
        hitChance: .25
    },
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
                    const allowedLengths = beat.allowedLengths;

                    if (allowedLengths) {
                        beat.allowedLengths = extendObjectArrayByID(newState.find(oldBeat => oldBeat.id === beat.id).allowedLengths, [ ...allowedLengths ])
                    }

                    return beat;
                });

            if (newBeats) return extendObjectArrayByID(newState, newBeats);
            return state;

        default:
            return state;
  }
}

const defaultAllowedLengths = deepClone(allowedLengths);
export {
    defaultAllowedLengths
}

import { extendObjectArrayByID } from '../utils/tools';

const initialState =  [
    {
        id    : 'total',
        bars  : 8,
        beats : 4,
    },
    {
        id    : 'groove',
        bars  : 1,
        beats : 12,
    },
];

const updateBeatByID = ({ beats, id, prop, value }) => {
    const newBeats = beats.map(beat => {
        const newBeat = { ...beat };
        if (newBeat.id === id) newBeat[prop] = value;
        return newBeat;
    })

    return newBeats;
}

export default function beats(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_BEATS':
            let { value, prop, id } = payload;

            if (prop === 'bars' || prop === 'beats') {
                if (!value)    value = 4;
                if (value < 1) value = 1;
                if (value > 8) value = 8;
            }

            return updateBeatByID({ beats: state, id, prop, value })

        case 'APPLY_PRESET':
            const { preset } = payload;
            const newBeats = preset.settings.beats;
            const newState = [ ...initialState ];

            if (newBeats) {
                return extendObjectArrayByID(newState, newBeats);
            }

            return state;

        default:
            return state;
  }
}

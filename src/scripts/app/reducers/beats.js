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
        if (beat.id === id) beat[prop] = value;
        return beat;
    })

    return newBeats;
}

export default function beats(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_BEATS':
            return updateBeatByID({ beats: state, id: payload.id, prop: payload.prop, value: payload.value })

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

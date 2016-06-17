import { extendObjectArrayByID, updateObjByID } from '../utils/tools';

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

export default function beats(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_BEATS':
            let { value, prop, id } = payload;

            return updateObjByID({ objs: state, id, prop, value })

        case 'APPLY_PRESET':
            const { preset } = payload;
            const newBeats = preset.settings.beats;
            const newState = [ ...initialState ];

            if (newBeats) return extendObjectArrayByID(newState, newBeats);
            return state;

        default:
            return state;
  }
}

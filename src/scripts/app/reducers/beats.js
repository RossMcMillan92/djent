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

export function beats(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_BEATS':
            return updateBeatByID({ beats: state, id: payload.id, prop: payload.prop, value: payload.value })
        default:
            return state;
  }
}

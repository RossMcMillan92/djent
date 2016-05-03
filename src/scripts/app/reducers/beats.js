const initialState =  [
    {
        id    : 'total',
        beats : 4,
        bars  : 4
    },
    {
        id    : 'groove',
        beats : 4,
        bars  : 4
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

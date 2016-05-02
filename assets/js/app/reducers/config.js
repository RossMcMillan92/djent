const allowedLengths = [
        {
            id: "0.25",
            name: 'One whole',
            amount: 0,
            isTriplet: false
        },
        {
            id: "0.5",
            name: 'One Half',
            amount: 2,
            isTriplet: true
        },
        {
            id: "1",
            name: 'One Quarter',
            amount: 0,
            isTriplet: true
        },
        {
            id: "2",
            name: 'One Eighth',
            amount: 0,
            isTriplet: false
        },
        {
            id: "4",
            name: 'One Sixteenth',
            amount: 0,
            isTriplet: false
        },
];

const initialState = {
    allowedLengths,
    bpm            : 80,
    totalBeats     : 8,
    grooveBeats    : 8,
};

export function config(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_ALLOWED_LENGTHS':
        console.log('payload.allowedLengths', payload.allowedLengths)
            return {
                ...state,
                allowedLengths: payload.allowedLengths
            };

        default:
            return state;
  }
}

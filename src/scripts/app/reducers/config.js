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
            amount: 1,
            isTriplet: false
        },
        {
            id: "1",
            name: 'One Quarter',
            amount:1,
            isTriplet: false
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
            amount: 1,
            isTriplet: false
        },
];

const initialState = {
    allowedLengths,
    bpm       : 90,
    hitChance : 1,
    isLooping : false,
};

export function config(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_ALLOWED_LENGTHS':
            return {
                ...state,
                allowedLengths: payload.allowedLengths
            };
        case 'UPDATE_BPM':
            return {
                ...state,
                bpm: payload.bpm
            };
        case 'UPDATE_IS_LOOPING':
            return {
                ...state,
                isLooping: payload.isLooping
            };
        case 'UPDATE_HITCHANCE':
            return {
                ...state,
                hitChance: payload.hitChance
            }

        default:
            return state;
  }
}

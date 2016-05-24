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
            amount: 1,
            isTriplet: true
        },
        {
            id: "1",
            name: 'quarter',
            amount:1,
            isTriplet: true
        },
        {
            id: "2",
            name: 'eighth',
            amount: 1,
            isTriplet: true
        },
        {
            id: "4",
            name: 'sixteenth',
            amount: 0,
            isTriplet: false
        },
];

const initialState = {
    allowedLengths,
    bpm       : 94,
    hitChance : 1,
    fadeIn    : false,
    fadeOut   : true,
    isLooping : true,
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
        case 'UPDATE_FADEIN':
            return {
                ...state,
                fadeIn: payload.fadeIn
            }
        case 'UPDATE_FADEOUT':
            return {
                ...state,
                fadeOut: payload.fadeOut
            }

        default:
            return state;
  }
}

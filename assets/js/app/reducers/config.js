const initialState = {
    allowedLengths: [1,1,2],
    bpm            : 100,
    totalBeats     : 8,
    grooveBeats    : 8,
};

export function config(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_ALLOWED_LENGTHS':
            return {
                ...state,
                allowedLengths: payload.allowedLengths
            };

        default:
            return state;
  }
}

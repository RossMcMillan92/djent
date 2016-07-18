export function updateBeats(id, prop, value) {
    if (prop === 'bars' || prop === 'beats') {
        if (!value)    value = 4;
        if (value < 1) value = 1;
        if (value > 8) value = 8;
    }

    if (prop === 'hitChance') {
        if (!value)       value = 1;
        if (value < 0.05) value = 0.05;
        if (value > 1)    value = 1;
    }

    return {
        type: 'UPDATE_BEATS',
        payload: { id, prop, value },
    };
}

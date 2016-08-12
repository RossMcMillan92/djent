export const updateSequence = (id, prop, value) => {
    if (prop === 'bars' || prop === 'beats') {
        if (!value)    value = 4;
        if (value < 1) value = 1;
        if (value > 16) value = 16;
    }

    if (prop === 'hitChance') {
        if (!value)       value = 1;
        if (value < 0.05) value = 0.05;
        if (value > 1)    value = 1;
    }

    return {
        type: 'UPDATE_SEQUENCE',
        payload: { id, prop, value },
    };
};

export const addSequence = () => ({
    type: 'ADD_SEQUENCE',
});

export const deleteSequence = (id) => ({
    type: 'DELETE_SEQUENCE',
    payload: { id },
});

export const updateSequenceDescription = (id, description) => ({
    type: 'UPDATE_SEQUENCE_DESCRIPTION',
    payload: { id, description },
});

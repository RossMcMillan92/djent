export function enableModal({ content }) {
    return {
        type: 'ENABLE_MODAL',
        payload: { content },
    };
}

export function disableModal() {
    return {
        type: 'DISABLE_MODAL',
        payload: {},
    };
}

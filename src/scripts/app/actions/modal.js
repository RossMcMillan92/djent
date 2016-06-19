export function enableModal({ content, isCloseable }) {
    return {
        type: 'ENABLE_MODAL',
        payload: { content, isCloseable },
    };
}

export function disableModal() {
    return {
        type: 'DISABLE_MODAL',
        payload: {},
    };
}

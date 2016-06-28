export function enableModal({ content, isCloseable, className }) {
    return {
        type: 'ENABLE_MODAL',
        payload: { content, isCloseable, className },
    };
}

export function disableModal() {
    return {
        type: 'DISABLE_MODAL',
        payload: {},
    };
}

export function enableModal({ content, isCloseable, className, title }) {
    return {
        type: 'ENABLE_MODAL',
        payload: { content, isCloseable, className, title },
    };
}

export function disableModal() {
    return {
        type: 'DISABLE_MODAL',
        payload: {},
    };
}

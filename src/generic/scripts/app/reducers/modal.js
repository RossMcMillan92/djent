const initialState =  {
    isActive: false,
    title: '',
    content: '',
    isCloseable: true,
    className: '',
}

export default function modal(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case 'ENABLE_MODAL':
            return {
                ...state,
                isActive: true,
                title: payload.title,
                content: payload.content,
                isCloseable: payload.isCloseable,
                className: payload.className,
            }

        case 'DISABLE_MODAL':
            return { ...state, isActive: false }

        default:
            return state
  }
}

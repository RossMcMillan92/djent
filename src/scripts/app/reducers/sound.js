const initialState =  {
    isPlaying            : false,
    isLooping            : true,
    generationState      : undefined,
    currentAudioTemplate : undefined,
    currentSrc           : undefined,
};

export default function sound(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'UPDATE_IS_PLAYING':
            return {
                ...state,
                isPlaying: payload.isPlaying
            };

        case 'UPDATE_CONTINUOUS_GENERATION':
            return {
                ...state,
                isLooping: payload.continuousGeneration ? false : payload.isLooping
            };

        case 'UPDATE_IS_LOOOPING':
            return {
                ...state,
                isLooping: payload.isLooping
            };

        case 'UPDATE_GENERATION_STATE':
            return {
                ...state,
                generationState: payload.generationState
            };

        case 'UPDATE_CURRENT_AUDIO_TEMPLATE':
            return {
                ...state,
                currentAudioTemplate: payload.currentAudioTemplate
            };

        case 'UPDATE_CURRENT_SRC':
            return {
                ...state,
                currentSrc: payload.currentSrc
            };

        default:
            return state;
  }
}

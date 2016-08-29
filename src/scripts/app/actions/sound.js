export function updateIsPlaying(isPlaying) {
    return {
        type: 'UPDATE_IS_PLAYING',
        payload: { isPlaying },
    };
}

export function updateIsLoading(isLoading) {
    return {
        type: 'UPDATE_IS_LOADING',
        payload: { isLoading },
    };
}

export function updateIsLooping(isLooping) {
    return {
        type: 'UPDATE_IS_LOOOPING',
        payload: { isLooping },
    };
}

export function updateError(error) {
    return {
        type: 'UPDATE_ERROR',
        payload: { error },
    };
}

export function updateGenerationState(generationState) {
    return {
        type: 'UPDATE_GENERATION_STATE',
        payload: { generationState },
    };
}

export function updateCurrentAudioTemplate(currentAudioTemplate) {
    return {
        type: 'UPDATE_CURRENT_AUDIO_TEMPLATE',
        payload: { currentAudioTemplate },
    };
}

export function updateCurrentSrc(currentSrc) {
    return {
        type: 'UPDATE_CURRENT_SRC',
        payload: { currentSrc },
    };
}

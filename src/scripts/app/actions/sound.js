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

export function updateAudioPlaylist(audioPlaylist) {
    return {
        type: 'UPDATE_AUDIO_PLAYLIST',
        payload: { audioPlaylist },
    };
}

export function updateActivePlaylistIndex(activePlaylistIndex) {
    return {
        type: 'UPDATE_ACTIVE_PLAYLIST_INDEX',
        payload: { activePlaylistIndex },
    };
}

export function updateCurrentSrc(currentSrc) {
    return {
        type: 'UPDATE_CURRENT_SRC',
        payload: { currentSrc },
    };
}

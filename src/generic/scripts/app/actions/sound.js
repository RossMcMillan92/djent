export function updateIsPlaying(isPlaying) {
    return {
        type: 'UPDATE_IS_PLAYING',
        payload: { isPlaying },
    }
}

export function updateIsLoading(isLoading) {
    return {
        type: 'UPDATE_IS_LOADING',
        payload: { isLoading },
    }
}

export function updateloopMode(loopMode) {
    return {
        type: 'UPDATE_LOOPING_MODE',
        payload: { loopMode },
    }
}

export function updateError(error) {
    return {
        type: 'UPDATE_ERROR',
        payload: { error },
    }
}

export function updateGenerationState(generationState) {
    return {
        type: 'UPDATE_GENERATION_STATE',
        payload: { generationState },
    }
}

export function updateAudioPlaylist(audioPlaylist) {
    return {
        type: 'UPDATE_AUDIO_PLAYLIST',
        payload: { audioPlaylist },
    }
}

export function updateActivePlaylistIndex(activePlaylistIndex) {
    return {
        type: 'UPDATE_ACTIVE_PLAYLIST_INDEX',
        payload: { activePlaylistIndex: activePlaylistIndex < 0 ? 0 : activePlaylistIndex },
    }
}

export function updateCurrentSrc(currentSrc) {
    return {
        type: 'UPDATE_CURRENT_SRC',
        payload: { currentSrc },
    }
}

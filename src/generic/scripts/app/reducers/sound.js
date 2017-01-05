import { compose, identity, map } from 'ramda'
import { Maybe } from 'ramda-fantasy'
import { safeGetLocalStorageIO } from 'modules/localStorageIO'

const loopModeDefault = 1

//    getLoopModeValue :: Key -> IO Maybe a
const getLoopModeValue = compose(
    map(Maybe.maybe(loopModeDefault, identity)),
    map(map(Number)),
    safeGetLocalStorageIO,
)

const initialState =  {
    isPlaying            : false,
    loopMode             : getLoopModeValue('loopMode').runIO(),
    generationState      : undefined,
    currentAudioTemplate : undefined,
    audioPlaylist        : [],
    activePlaylistIndex  : 0,
    currentSrc           : undefined,
}

export default function sound(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case 'UPDATE_IS_PLAYING':
            return {
                ...state,
                isPlaying: payload.isPlaying
            }

        case 'UPDATE_LOOPING_MODE':
            return {
                ...state,
                loopMode: payload.loopMode
            }

        case 'UPDATE_GENERATION_STATE':
            return {
                ...state,
                generationState: payload.generationState
            }

        case 'UPDATE_AUDIO_PLAYLIST':
            return {
                ...state,
                audioPlaylist: payload.audioPlaylist
            }

        case 'UPDATE_ACTIVE_PLAYLIST_INDEX':
            return {
                ...state,
                activePlaylistIndex: payload.activePlaylistIndex
            }

        case 'UPDATE_CURRENT_SRC':
            return {
                ...state,
                currentSrc: payload.currentSrc
            }

        default:
            return state
    }
}

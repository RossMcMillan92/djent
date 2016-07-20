import { extendObjectArrayByID, updateObjByID } from '../utils/tools';

const initialState =  {
    isPlaying       : false,
    isLooping       : false,
    generationState : undefined,
    currentBuffer   : undefined,
    currentSrc      : undefined,
}

export default function sound(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_IS_PLAYING':
            return {
                ...state,
                isPlaying: payload.isPlaying
            }

        case 'UPDATE_CONTINUOUS_GENERATION':
            return {
                ...state,
                isLooping: payload.continuousGeneration ? false : payload.isLooping
            };

        case 'UPDATE_IS_LOOOPING':
            return {
                ...state,
                isLooping: payload.isLooping
            }

        case 'UPDATE_GENERATION_STATE':
            return {
                ...state,
                generationState: payload.generationState
            }

        case 'UPDATE_CURRENT_BUFFER':
            return {
                ...state,
                currentBuffer: payload.currentBuffer
            }

        case 'UPDATE_CURRENT_SRC':
            return {
                ...state,
                currentSrc: payload.currentSrc
            }

        default:
            return state;
  }
}

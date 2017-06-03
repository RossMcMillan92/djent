import { initialPreset } from 'utils/presets'
import { extendObjectArrayByID } from 'utils/tools'

const initialState = {
    activePresetID : initialPreset,
    bpm            : 50,
}

export default function config(state = { ...initialState }, action) {
    const { type, payload } = action

    switch (type) {
        case 'UPDATE_BPM':
            return {
                ...state,
                bpm: payload.bpm
            }

        case 'APPLY_PRESET':
            const { preset } = payload
            const { bpm, allowedLengths, hitChance } = preset.settings.config
            const newState = { ...initialState }

            if (bpm) newState.bpm = bpm
            if (hitChance) newState.hitChance = hitChance
            if (allowedLengths) {
                newState.allowedLengths = extendObjectArrayByID(newState.allowedLengths, [ ...allowedLengths ])
            }

            return {
                ...newState,
                activePresetID: preset.id
            }

        default:
            return state
  }
}

export {
    initialState
}

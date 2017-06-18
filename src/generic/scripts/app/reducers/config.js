import initialState from './config.initial-state'

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
            const { bpm } = preset.settings.config
            const newState = { ...initialState }

            if (bpm) newState.bpm = bpm

            return {
                ...newState,
                activePresetID: preset.id
            }

        default:
            return state
  }
}

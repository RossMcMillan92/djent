import { remove } from 'ramda'
import initialState from './presets.initial-state'
import { updatePresets } from 'utils/presets'

export default function presets(state = initialState, action) {
    const { type, payload: newPreset } = action

    switch (type) {
        case 'ADD_PRESET':
            return updatePresets(state, newPreset)

        case 'REMOVE_PRESET':
            const presetIndexToRemove = state.indexOf(state.find(p => p.id === newPreset))
            return remove(presetIndexToRemove, 1, state)

        default:
            return state
  }
}

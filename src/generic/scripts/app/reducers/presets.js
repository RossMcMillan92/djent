import { remove } from 'ramda'
import initialState from './presets.initial-state'

export default function presets(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case 'ADD_PRESET':
            return state.concat([ payload ])

        case 'REMOVE_PRESET':
            const presetIndexToRemove = state.indexOf(state.find(p => p.id === payload))
            return remove(presetIndexToRemove, 1, state)

        default:
            return state
  }
}

import deepExtend from 'deep-extend'

import {
    deepClone,
    extendObjectArrayByID,
    updateObjByID
} from 'utils/tools'

import initialState, { initialCustomSequence } from './sequences.initial-state'

const getInitialState = () => deepClone(initialState)

const getCustomSequenceIndex = seqs =>
    (function loop(i) {
        if (seqs.find(s => s.id === `CUSTOM_SEQUENCE_${i}`)) return loop(i + 1)
        return i
    }(seqs.length))

export default function sequences(state = getInitialState(), action) {
    const { type, payload } = action

    switch (type) {
        case 'UPDATE_SEQUENCE':
            const { value, prop, id } = payload
            return updateObjByID({ objs: state, id, prop, value })

        case 'ADD_SEQUENCE':
            const index = getCustomSequenceIndex(state)
            const seqID = `CUSTOM_SEQUENCE_${index}`
            const description = `Custom Sequence ${index}`
            const newSequence = deepClone(initialCustomSequence)

            newSequence.allowedLengths[0].amount = 1

            return [
                ...state,
                {
                    ...newSequence,
                    id: seqID,
                    description,
                }
            ]
        case 'DELETE_SEQUENCE':
            return [
                ...state.filter(s => s.id !== payload.id),
            ]

        case 'UPDATE_SEQUENCE_DESCRIPTION':
            return updateObjByID({ objs: state, id: payload.id, prop: 'description', value: payload.description })

        case 'APPLY_PRESET':
            const { preset } = payload
            const newState = getInitialState()
            const newSequences = preset.settings.sequences
                .map((sequence) => {
                    const oldSequence = newState.find(s => s.id === sequence.id) || deepClone(initialCustomSequence)
                    if (sequence.allowedLengths && oldSequence.allowedLengths) sequence.allowedLengths = extendObjectArrayByID(oldSequence.allowedLengths, [ ...sequence.allowedLengths ])
                    const newSeq = deepExtend(oldSequence, sequence)

                    return newSeq
                })

            if (newSequences) return newSequences
            return state

        default:
            return state
    }
}

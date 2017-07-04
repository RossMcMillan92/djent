import presets from 'reducers/presets'
import initialState from 'reducers/presets.initial-state'

describe('Preset reducer:', () => {
    it('should return the initial state', () => {
        expect(presets(initialState, {})).toEqual(initialState)
    })

    describe('Action type: ADD_PRESET', () => {
        it('should push preset into store', () => {
            const preset = { id: 'preset-to-add' }
            const stateAfter = initialState.concat([ preset ])
            const payload = preset
            const action = {
                type: 'ADD_PRESET',
                payload,
            }

            expect(presets(initialState, action)).toEqual(stateAfter)
        })
    })

    describe('Action type: REMOVE_PRESET', () => {
        it('should remove the preset by id', () => {
            const stateBefore = [
                { id: 0 },
                { id: 1 },
                { id: 2 },
            ]
            const stateAfter = [
                { id: 0 },
                { id: 2 },
            ]
            const idToRemove = 1
            const action = {
                type: 'REMOVE_PRESET',
                payload: idToRemove,
            }

            expect(presets(stateBefore, action)).toEqual(stateAfter)
        })
    })
})

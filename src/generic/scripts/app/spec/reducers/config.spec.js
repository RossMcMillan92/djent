import { expect, assert } from 'chai'
import config from '../../reducers/config'
import initialState from '../../reducers/config.initial-state'

describe('Config reducer:', () => {
    it('should return the initial state', () => {
        expect(config(initialState, {}))
            .to.deep.equal(initialState)
    })

    describe('Action type: APPLY_PRESET', () => {
        it('should update activePresetID', () => {
            const stateAfterAdd = {
                ...initialState,
                activePresetID: 'newpreset',
            }
            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        config: {}
                    }
                }
            }
            const action = {
                type: 'APPLY_PRESET',
                payload,
            }

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd)
        })

        it('should update bpm', () => {
            const stateAfterAdd = {
                ...initialState,
                activePresetID: 'newpreset',
                bpm: 100,
            }
            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        config: {
                            bpm: 100,
                        }
                    }
                }
            }
            const action = {
                type: 'APPLY_PRESET',
                payload,
            }

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd)
        })
    })

    describe('Action type: UPDATE_BPM', () => {
        it('should update bpm', () => {
            const stateAfterAdd = {
                ...initialState,
                bpm: 200,
            }
            const payload = {
                bpm: 200
            }
            const action = {
                type: 'UPDATE_BPM',
                payload,
            }

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd)
        })
    })
})

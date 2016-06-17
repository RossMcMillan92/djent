import { expect, assert } from 'chai';
import config, { initialState } from '../../reducers/config';

describe('Config reducer:', () => {
    it('should return the initial state', () => {
        expect(config(initialState, {}))
            .to.deep.equal(initialState);
    });

    describe('Action type: APPLY_PRESET', () => {
        it('should update activePresetID', () => {
            const stateAfterAdd = {
                ...initialState,
                activePresetID: 'newpreset',
            };
            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        config: {}
                    }
                }
            };
            const action = {
                type: 'APPLY_PRESET',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });

        it('should update bpm', () => {
            const stateAfterAdd = {
                ...initialState,
                activePresetID: 'newpreset',
                bpm: 100,
            };
            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        config: {
                            bpm: 100,
                        }
                    }
                }
            };
            const action = {
                type: 'APPLY_PRESET',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });

        it('should update fadeIn', () => {
            const stateAfterAdd = {
                ...initialState,
                activePresetID: 'newpreset',
                fadeIn: true,
            };
            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        config: {
                            fadeIn: true,
                        }
                    }
                }
            };
            const action = {
                type: 'APPLY_PRESET',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });

        it('should update hitChance', () => {
            const stateAfterAdd = {
                ...initialState,
                activePresetID: 'newpreset',
                hitChance: .5,
            };
            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        config: {
                            hitChance: .5,
                        }
                    }
                }
            };
            const action = {
                type: 'APPLY_PRESET',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });

        it('should update allowedLengths', () => {
            const stateAfterAdd = {
                ...initialState,
                activePresetID: 'newpreset',
                allowedLengths: [
                        {
                            id: "0.25",
                            name: 'whole',
                            amount: 1,
                            isTriplet: false
                        },
                        {
                            id: "0.5",
                            name: 'half',
                            amount: 0,
                            isTriplet: false
                        },
                        {
                            id: "1",
                            name: 'quarter',
                            amount: 2,
                            isTriplet: false
                        },
                        {
                            id: "2",
                            name: 'eighth',
                            amount: 0,
                            isTriplet: true
                        },
                        {
                            id: "4",
                            name: 'sixteenth',
                            amount: 0,
                            isTriplet: false
                        },
                ],
            };
            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        config: {
                            allowedLengths: [
                                    {
                                        id: "0.25",
                                        name: 'whole',
                                        amount: 1,
                                        isTriplet: false
                                    },

                                    {
                                        id: "1",
                                        name: 'quarter',
                                        amount: 2,
                                        isTriplet: false
                                    },
                                    {
                                        id: "2",
                                        name: 'eighth',
                                        amount: 0,
                                        isTriplet: true
                                    },
                            ]
                        }
                    }
                }
            };
            const action = {
                type: 'APPLY_PRESET',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });
    });

    describe('Action type: UPDATE_BPM', () => {
        it('should update bpm', () => {
            const stateAfterAdd = {
                ...initialState,
                bpm: 200,
            };
            const payload = {
                bpm: 200
            };
            const action = {
                type: 'UPDATE_BPM',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });
    });

    describe('Action type: UPDATE_HITCHANCE', () => {
        it('should update hitChance', () => {
            const stateAfterAdd = {
                ...initialState,
                hitChance: 0.71,
            };
            const payload = {
                hitChance: 0.71
            };
            const action = {
                type: 'UPDATE_HITCHANCE',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });
    });

    describe('Action type: UPDATE_FADEIN', () => {
        it('should update fadeIn', () => {
            const stateAfterAdd = {
                ...initialState,
                fadeIn: true,
            };
            const payload = {
                fadeIn: true
            };
            const action = {
                type: 'UPDATE_FADEIN',
                payload,
            };

            expect(config(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });
    });

});

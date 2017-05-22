import { expect, assert } from 'chai';
import sequences, { initialState } from '../../reducers/sequences';

describe('Beats reducer:', () => {
    it('should return the initial state', () => {
        expect(sequences(initialState, {}))
            .to.deep.equal(initialState);
    });

    describe('Action type: APPLY_PRESET', () => {
        it('should update allowedLengths', () => {
            const initialState = [
                {
                    id: 'CUSTOM_SEQUENCE_1',
                    allowedLengths: [
                        {
                            id: '0.25',
                            name: 'whole',
                            amount: 0,
                            isDotted: false,
                            isTriplet: false,
                        },
                        {
                            id: '0.5',
                            name: 'half',
                            amount: 0,
                            isDotted: false,
                            isTriplet: false,
                        },
                        {
                            id: '1',
                            name: 'quarter',
                            amount: 0,
                            isDotted: false,
                            isTriplet: false,
                        },
                        {
                            id: '2',
                            name: 'eighth',
                            amount: 0,
                            isDotted: false,
                            isTriplet: true,
                        },
                        {
                            id: '4',
                            name: 'sixteenth',
                            amount: 0,
                            isDotted: false,
                            isTriplet: false,
                        },
                    ]
                }
            ];

            const stateAfterAdd = [
                {
                    id: 'CUSTOM_BEAT_TEST',
                    bars: 4,
                    beats: 4,
                    description: 'Custom Sequence',
                    hitChance: 1,
                    allowedLengths: [
                        {
                            id: '0.25',
                            name: 'whole',
                            amount: 1,
                            isDotted: true,
                            isTriplet: false,
                        },
                        {
                            id: '0.5',
                            name: 'half',
                            amount: 0,
                            isDotted: false,
                            isTriplet: false,
                        },
                        {
                            id: '1',
                            name: 'quarter',
                            amount: 2,
                            isDotted: false,
                            isTriplet: false,
                        },
                        {
                            id: '2',
                            name: 'eighth',
                            amount: 0,
                            isDotted: false,
                            isTriplet: true,
                        },
                        {
                            id: '4',
                            name: 'sixteenth',
                            amount: 0,
                            isDotted: false,
                            isTriplet: false,
                        },
                    ]
                }
            ];

            const payload = {
                preset: {
                    id: 'newpreset',
                    settings: {
                        sequences: [
                            {
                                id: 'CUSTOM_BEAT_TEST',
                                allowedLengths: [
                                        {
                                            id: '0.25',
                                            name: 'whole',
                                            amount: 1,
                                            isDotted: true
                                        },

                                        {
                                            id: '1',
                                            name: 'quarter',
                                            amount: 2,
                                        },
                                        {
                                            id: '2',
                                            name: 'eighth',
                                            amount: 0,
                                            isTriplet: true
                                        },
                                ]
                            }
                        ]
                    }
                }
            };
            const action = {
                type: 'APPLY_PRESET',
                payload,
            };

            expect(sequences(initialState, action))
                .to.deep.equal(stateAfterAdd);
        });
    });

});

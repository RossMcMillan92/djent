import { expect } from 'chai'
import {
    createPresetFactory,
} from '../../utils/presets'

const configInitialState = {
    bpm: 100,
}
const instrumentsInitialState = [
    {
      id: 'h',
      description: 'Hihat',
      sequences: [
        'steadyHalfs',
        'steadyQuarters',
      ],
      sounds: [
        {
          id: 'h',
          description: 'Open hihat',
          path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic/assets/audio/mastered/hihat-open.wav',
          category: 'Hihat',
          midi: {
            pitch: [
              'A#2'
            ]
          },
          amount: 0
        },
        {
          id: 'hc',
          description: 'Closed hihat',
          path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic/assets/audio/mastered/hihat-closed.wav',
          category: 'Hihat',
          midi: {
            pitch: [
              'A#2'
            ]
          },
          amount: 0
        }
      ],
      fadeOutDuration: 0,
      ringout: false,
      pitch: 0,
      volume: 1,
      repeatHitTypeForXBeat: 0
    }
]

const allowedLengths = [
    {
        id: '0.25',
        name: 'whole',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '0.5',
        name: 'half',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '1',
        name: 'quarter',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '2',
        name: 'eighth',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '4',
        name: 'sixteenth',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
]

const initialCustomSequence = {
    id          : 'CUSTOM_SEQUENCE_1',
    description : 'Custom Sequence',
    bars        : 4,
    beats       : 4,
    hitChance   : 1,
    allowedLengths,
}

const sequencesInitialState =  [
    {
        id    : 'total',
        bars  : 8,
        beats : 4,
    },
    initialCustomSequence
]

const createPreset = createPresetFactory({
    configInitialState,
    instrumentsInitialState,
    sequencesInitialState
})

describe('Presets', () => {
    describe('createPresetFactory', () => {
        it('doesn\'t add unnecessary props', () => {
            const propsInput = {}
            const presetOutput = {}
            const result = createPreset(propsInput)

            expect(result)
                .to.deep.equal(presetOutput)
        })
        it('keeps different props', () => {
            const propsInput = {
                description: 'Preset description',
                bpm: 40,
                instruments: [
                    {
                      id: 'h',
                      description: 'Hihat',
                      sequences: [
                        'steadyHalfs',
                      ],
                      sounds: [
                        {
                          id: 'h',
                          description: 'Open hihat',
                          path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic/assets/audio/mastered/hihat-open.wav',
                          category: 'Hihat',
                          midi: {
                            pitch: [
                              'A#2'
                            ]
                          },
                          amount: 3
                        },
                        {
                          id: 'hc',
                          description: 'Closed hihat',
                          path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic/assets/audio/mastered/hihat-closed.wav',
                          category: 'Hihat',
                          midi: {
                            pitch: [
                              'A#2'
                            ]
                          },
                          amount: 2
                        }
                      ],
                      fadeOutDuration: 1,
                      ringout: true,
                      pitch: 100,
                      volume: 0.4,
                      repeatHitTypeForXBeat: 4
                    }
                ],
            }

            const presetOutput = {
                description: 'Preset description',
                settings: {
                    config: {
                        bpm: 40
                    },
                    instruments: [
                        {
                          id: 'h',
                          sequences: [
                            'steadyHalfs',
                          ],
                          sounds: [
                            {
                              id: 'h',
                              amount: 3
                            },
                            {
                              id: 'hc',
                              amount: 2
                            }
                          ],
                          fadeOutDuration: 1,
                          ringout: true,
                          pitch: 100,
                          volume: 0.4,
                          repeatHitTypeForXBeat: 4
                        }
                    ]
                }
            }
            const result = createPreset(propsInput)

            expect(result)
                .to.deep.equal(presetOutput)
        })
        it('trims down unnecessary props from a preset', () => {
            const propsInput = {
                bpm: 100,
                instruments: instrumentsInitialState,
                sequences: sequencesInitialState
            }
            const presetOutput = {}
            const result = createPreset(propsInput)

            expect(result)
                .to.deep.equal(presetOutput)
        })
        it('doesn\'t add instruments without any sounds amounts', () => {
            const propsInput = {
                description: 'Preset description',
                bpm: 40,
                instruments: [
                    {
                      id: 'h',
                      description: 'Hihat',
                      sequences: [
                        'steadyHalfs',
                      ],
                      sounds: [
                        {
                          id: 'h',
                          description: 'Open hihat',
                          path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic/assets/audio/mastered/hihat-open.wav',
                          category: 'Hihat',
                          midi: {
                            pitch: [
                              'A#2'
                            ]
                          },
                          amount: 1
                        },
                        {
                          id: 'hc',
                          description: 'Closed hihat',
                          path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic/assets/audio/mastered/hihat-closed.wav',
                          category: 'Hihat',
                          midi: {
                            pitch: [
                              'A#2'
                            ]
                          },
                          amount: 0
                        }
                      ],
                      fadeOutDuration: 1,
                      ringout: true,
                      pitch: 100,
                      volume: 0.4,
                      repeatHitTypeForXBeat: 4
                    }
                ],
            }

            const presetOutput = {
                description: 'Preset description',
                settings: {
                    config: {
                        bpm: 40
                    },
                    instruments: [
                        {
                          id: 'h',
                          sequences: [
                            'steadyHalfs',
                          ],
                          sounds: [
                            {
                              id: 'h',
                              amount: 1,
                            },
                          ],
                          fadeOutDuration: 1,
                          ringout: true,
                          pitch: 100,
                          volume: 0.4,
                          repeatHitTypeForXBeat: 4
                        }
                    ]
                }
            }
            const result = createPreset(propsInput)

            expect(result)
                .to.deep.equal(presetOutput)
        })
    })
})

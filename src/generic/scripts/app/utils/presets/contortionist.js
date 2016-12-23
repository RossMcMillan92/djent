const preset = {
    id: 'contortionist',
    description: 'Poly Chords & Melody',
    settings: {
        config: {
            bpm            : 90,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 8,
                beats : 4,
            },
            {
                id          : 'CUSTOM_SEQUENCE_1',
                description : 'Guitars',
                bars        : 8,
                beats       : 4,
                hitChance   : 1,
                allowedLengths : [
                    {
                        id: '0.5',
                        amount: 1,
                        isDotted: true,
                    },
                    {
                        id: '1',
                        amount: 1,
                        isDotted: true,
                    },
                ],
            },
            {
                id          : 'CUSTOM_SEQUENCE_2',
                description : 'Lead Guitar',
                bars        : 1,
                beats       : 6,
                hitChance   : 1,
                allowedLengths : [
                    {
                        id: '0.5',
                        amount: 1,
                    },
                    {
                        id: '2',
                        amount: 2,
                        isDotted: true,
                    },
                    {
                        id: '4',
                        amount: 1,
                    },
                ],
            },
            {
                id          : 'CUSTOM_SEQUENCE_3',
                description : 'Hihat',
                bars        : 2,
                beats       : 4,
                hitChance   : 1,
                allowedLengths : [
                    {
                        id: '2',
                        amount: 9,
                    },
                    {
                        id: '4',
                        amount: 1,
                    },
                ],
            },
            {
                id          : 'CUSTOM_SEQUENCE_4',
                description : 'Dotted',
                bars        : 4,
                beats       : 4,
                hitChance   : 1,
                allowedLengths : [
                    {
                        id: '1',
                        amount: 1,
                        isDotted: true,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                repeatHitTypeForXBeat: 8,
                sounds: [
                    {
                        id: 'sixth-0-chord',
                        enabled: true,
                    },
                    {
                        id: 'sixth-3-chord',
                        enabled: true,
                    },
                    {
                        id: 'sixth-8-chord',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'lg',
                sequences: [
                    'CUSTOM_SEQUENCE_2',
                ],
                sounds: [
                    {
                        id: 'gs4',
                        enabled: true,
                    },
                    {
                        id: 'as5',
                        enabled: true,
                    },
                    {
                        id: 'b5',
                        enabled: true,
                    },
                    {
                        id: 'cs5',
                        enabled: true,
                    },
                    {
                        id: 'ds5',
                        enabled: true,
                    },
                    {
                        id: 'e5',
                        enabled: true,
                    },
                    {
                        id: 'fs5',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'k',
                sequences: [
                    'CUSTOM_SEQUENCE_1',
                ],
                sounds: [
                    {
                        id: 'k',
                        enabled: true,
                    }
                ],
            },
            {
                id: 's',
                sequences: [
                    'offsetWholes',
                    'offsetHalfs',
                ],
                sounds: [
                    {
                        id: 's',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'c',
                sequences: [
                    'twoBars',
                    'CUSTOM_SEQUENCE_4',
                ],
                sounds: [
                    {
                        id: 'crash-left',
                        enabled: true,
                    },
                    {
                        id: 'crash-right',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'h',
                volume: 0.7,
                sequences: [
                    'CUSTOM_SEQUENCE_3',
                ],
                sounds: [
                    {
                        id: 'hc',
                        enabled: true,
                    },
                ],
            },
        ]
    }
}

export default preset

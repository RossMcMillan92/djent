const preset = {
    id: 'contortionist',
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
                        amount: 1,
                    },
                    {
                        id: 'sixth-3-chord',
                        amount: 1,
                    },
                    {
                        id: 'sixth-8-chord',
                        amount: 1,
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
                        amount: 1,
                    },
                    {
                        id: 'as5',
                        amount: 1,
                    },
                    {
                        id: 'b5',
                        amount: 1,
                    },
                    {
                        id: 'cs5',
                        amount: 1,
                    },
                    {
                        id: 'ds5',
                        amount: 1,
                    },
                    {
                        id: 'e5',
                        amount: 1,
                    },
                    {
                        id: 'fs5',
                        amount: 1,
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
                        amount: 1,
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
                        amount: 1,
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
                        amount: 1,
                    },
                    {
                        id: 'crash-right',
                        amount: 1,
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
                        amount: 1,
                    },
                ],
            },
        ]
    }
}

export default preset

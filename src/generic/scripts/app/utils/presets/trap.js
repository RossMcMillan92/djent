const preset = {
    id: 'trap',
    description: 'Trap',
    settings: {
        config: {
            bpm            : 120,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id          : 'CUSTOM_SEQUENCE_1',
                description : 'Hits',
                bars        : 2,
                beats       : 4,
                hitChance   : 0.15,
                allowedLengths : [
                    {
                        id: '1',
                        amount: 1,
                    },
                    {
                        id: '2',
                        amount: 1,
                    },
                ],
            },
            {
                id          : 'CUSTOM_SEQUENCE_2',
                description : 'Bass Line',
                bars        : 2,
                beats       : 4,
                hitChance   : 0.9,
                allowedLengths : [
                    {
                        id: '1',
                        amount: 4,
                        isDotted: true,
                    },
                    {
                        id: '2',
                        amount: 1,
                        isDotted: true,
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
                        id: '1',
                        amount: 1,
                    },
                    {
                        id: '2',
                        amount: 8,
                    },
                    {
                        id: '4',
                        amount: 2,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'b',
                pitch: 600,
                sequences: [
                    'CUSTOM_SEQUENCE_2',
                ],
                sounds: [
                    {
                        id: 'a',
                        amount: 4,
                    },
                    {
                        id: 'as',
                        amount: 1,
                    },
                    {
                        id: 'c',
                        amount: 1,
                    },
                ],
            },
            {
                id: 'k',
                ringout: false,
                sequences: [
                    'CUSTOM_SEQUENCE_2',
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
                sounds: [
                    {
                        id: 's',
                        amount: 1,
                    }
                ],
            },
            {
                id: 'c',
                sounds: [
                    {
                        id: 'crash-left',
                        // amount: 1,
                    },
                    {
                        id: 'crash-right',
                        // amount: 1,
                    },
                ],
            },
            {
                id: 'h',
                sequences: [
                    'CUSTOM_SEQUENCE_3',
                ],
                sounds: [
                    {
                        id: 'h',
                        amount: 1,
                    },
                    {
                        id: 'hc',
                        amount: 6,
                    },
                ],
            },
            {
                id: 'd',
                sounds: [
                    {
                        id: 'drone-high',
                        enabled: false,
                    },
                ],
            },
        ]
    }
};

export default preset;

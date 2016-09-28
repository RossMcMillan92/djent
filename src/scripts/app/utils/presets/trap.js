const preset = {
    id: 'trap',
    description: 'Trap',
    settings: {
        config: {
            bpm            : 160,
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
                description : 'Bass',
                bars        : 2,
                beats       : 4,
                hitChance   : 0.95,
                allowedLengths : [
                    {
                        id: '0.25',
                        amount: 1,
                    },
                    {
                        id: '0.5',
                        amount: 2,
                    },
                    {
                        id: '2',
                        amount: 2,
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
                        amount: 5,
                    },
                    {
                        id: '2',
                        amount: 1,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'bass',
                sequences: [
                    'CUSTOM_SEQUENCE_2',
                ],
                sounds: [
                    {
                        id: 'a',
                        enabled: true,
                    },
                    {
                        id: 'b',
                        enabled: true,
                    },
                    {
                        id: 'c',
                        enabled: true,
                    },
                    {
                        id: 'd',
                        enabled: true,
                    },
                    {
                        id: 'e',
                        enabled: true,
                    },
                    {
                        id: 'f',
                        enabled: true,
                    },
                    {
                        id: 'gs',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'k',
                sequences: [
                    'CUSTOM_SEQUENCE_2',
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
                sounds: [
                    {
                        id: 's',
                        enabled: true,
                    }
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
                        id: 'h',
                        enabled: true,
                    },
                    {
                        id: 'hc',
                        enabled: true,
                    },
                ],
            },
        ]
    }
};

export default preset;

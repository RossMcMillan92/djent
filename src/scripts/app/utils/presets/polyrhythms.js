const preset = {
    id: 'polyrhythms',
    description: 'Polyrhythms',
    settings: {
        config: {
            bpm       : 112,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 8,
                beats : 4,
            },
            {
                id    : 'CUSTOM_SEQUENCE_1',
                description: 'Guitars',
                bars  : 1,
                beats : 7.5,
                hitChance : 0.95,
                allowedLengths: [
                        {
                            id: '0.5',
                            amount: 1,
                        },
                        {
                            id: '1',
                            amount: 1,
                        },
                        {
                            id: '2',
                            amount: 1,
                        },
                        {
                            id: '4',
                            amount:1,
                        },
                ],
            },
            {
                id    : 'CUSTOM_SEQUENCE_2',
                description: 'Cymbal Beat',
                bars  : 4,
                beats : 4,
                hitChance : 1,
                allowedLengths: [
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
                sounds: [
                    {
                        id: 'sixth-0-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-1-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-8-open',
                        enabled: true,
                    },
                    {
                        id: 'scratch',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'k',
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
                    'offsetWhole',
                    'offsetHalves',
                ],
                sounds: [
                    {
                        id: 's',
                        enabled: true,
                    }
                ],
            },
            {
                id: 's',
                volume: 0.3,
                sequences: [
                    'steadyQuarters',
                ],
                sounds: [
                    {
                        id: 'hc',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'c',
                sequences: [
                    'CUSTOM_SEQUENCE_2',
                ],
                sounds: [
                    {
                        id: 'china-left',
                        enabled: true,
                    }
                ],
            },
        ]
    }
};

export default preset;

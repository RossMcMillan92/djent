const preset = {
    id: 'thall-chicken',
    settings: {
        config: {
            bpm       : 75,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id    : 'CUSTOM_SEQUENCE_1',
                bars  : 2,
                beats : 4,
                description : 'Guitars',
                hitChance : .8,
                allowedLengths: [
                    {
                        id: '2',
                        amount:1,
                        isDotted: true
                    },
                    {
                        id: '4',
                        amount:3,
                    },
                ],
            },
            {
                id    : 'CUSTOM_SEQUENCE_2',
                bars  : 2,
                beats : 4,
                description : 'Cymbal',
                hitChance : 1,
                allowedLengths: [
                    {
                        id: '2',
                        amount:1,
                        isDotted: true
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
                        amount: 1,
                    },
                    {
                        id: 'sixth-0-muted',
                        amount: 1,
                    },
                    {
                        id: 'scratch',
                        amount: 3,
                    },
                ],
            },
            {
                id: 'k',
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
                sequences: [
                    'CUSTOM_SEQUENCE_2',
                    'steadyQuarters',
                    'steadyHalfs',
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
                    {
                        id: 'china-left',
                        amount: 1,
                    }
                ],
            },
            {
                id: 'd',
                pitch: 1200,
                volume: 0.6,
                sequences: [
                    'twoBars',
                    'none',
                ],
                sounds: [
                    {
                        id: 'drone-high-2',
                        amount: 1,
                    }
                ],
            },
        ],
    },
};

export default preset;

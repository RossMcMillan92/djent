const preset = {
    id: 'thall-buster',
    description: 'Thall II',
    settings: {
        config: {
            bpm       : 65,
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
                hitChance : 1,
                allowedLengths: [
                        {
                            id: '1',
                            amount:2,
                            isTriplet: false
                        },
                        {
                            id: '2',
                            amount:1,
                            isTriplet: false
                        },
                        {
                            id: '4',
                            amount:2,
                            isTriplet: false
                        },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                pitch: -200,
                sounds: [
                    {
                        id: 'sixth-0-muted',
                        amount: 1,
                    },
                    {
                        id: 'sixth-1-muted',
                        amount: 1,
                    },
                    {
                        id: 'scratch',
                        amount: 1,
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

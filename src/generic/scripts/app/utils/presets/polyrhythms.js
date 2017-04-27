const preset = {
    id: 'polyrhythms',
    settings: {
        config: {
            bpm       : 112,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id             : 'CUSTOM_SEQUENCE_1',
                description    : 'Guitars',
                bars           : 1,
                beats          : 6,
                hitChance      : 1,
                allowedLengths : [
                        {
                            id: '0.5',
                            amount: 1,
                        },
                        {
                            id: '1',
                            amount: 1,
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
                id             : 'CUSTOM_SEQUENCE_2',
                description    : 'Cymbal Beat',
                bars           : 4,
                beats          : 4,
                hitChance      : 1,
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
                        id: 'sixth-0-open',
                        amount: 1,
                    },
                    {
                        id: 'sixth-1-open',
                        amount: 1,
                    },
                    {
                        id: 'fifth-4-open',
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
                sequences: [
                    'offsetWholes',
                    'offsetHalfs',
                    'offsetQuarters',
                ],
                sounds: [
                    {
                        id: 's',
                        amount: 1,
                    }
                ],
            },
            {
                id: 'h',
                volume: 0.3,
                sequences: [
                    'steadyQuarters',
                ],
                sounds: [
                    {
                        id: 'hc',
                        amount: 1,
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
                        amount: 1,
                    }
                ],
            },
        ]
    }
};

export default preset;

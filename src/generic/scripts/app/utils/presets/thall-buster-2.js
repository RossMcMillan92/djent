const preset = {
    id: 'thall',
    description: 'Thall I',
    settings: {
        config: {
            bpm       : 87,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id             : 'CUSTOM_SEQUENCE_1',
                bars           : 1,
                beats          : 7.5,
                hitChance      : 1,
                allowedLengths : [
                        {
                            id: '1',
                            amount: 1,
                            isDotted: true
                        },
                        {
                            id: '2',
                            amount: 1,
                            isDotted: true
                        },
                        {
                            id: '4',
                            amount: 3,
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
                        id: 'fifth-5-open',
                        amount: 1,
                    },
                    {
                        id: 'fifth-6-open',
                        amount: 1,
                    },
                    {
                        id: 'third-7-open',
                        amount: 1,
                    },
                    {
                        id: 'third-8-open',
                        amount: 1,
                    },
                    {
                        id: 'third-7-bend',
                        amount: 1,
                    },
                    {
                        id: 'third-8-bend',
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
                sounds: [
                    {
                        id: 'drone-high',
                        amount: 1,
                    },
                    {
                        id: 'drone-high-2',
                        amount: 1,
                    }
                ],
            },
        ]
    }
};

export default preset;

const preset = {
    id: 'thall-triplets',
    settings: {
        config: {
            bpm       : 104,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 8,
                beats : 4,
            },
            {
                id    : 'CUSTOM_SEQUENCE_1',
                bars  : 1,
                beats : 12,
                hitChance : 1,
                allowedLengths: [
                        {
                            id: '0.25',
                            amount: 1,
                            isTriplet: true
                        },
                        {
                            id: '0.5',
                            amount: 1,
                            isTriplet: true
                        },
                        {
                            id: '2',
                            amount:1,
                            isTriplet: true
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
                        id: 'sixth-1-open',
                        amount: 1,
                    },
                    {
                        id: 'sixth-1-muted',
                        amount: 1,
                    },
                    {
                        id: 'fifth-6-open',
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
                        id: 'dissonance-10',
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
                ringout: true,
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
        ]
    }
};

export default preset;

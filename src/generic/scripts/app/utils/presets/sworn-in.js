const preset = {
    id: 'sworn-in',
    description: 'Sworn In',
    settings: {
        config: {
            bpm            : 90,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id    : 'CUSTOM_SEQUENCE_1',
                bars  : 4,
                beats : 4,
                hitChance      : .9,
                allowedLengths : [
                        {
                            id: "0.25",
                            amount: 1,
                        },
                        {
                            id: "2",
                            amount: 2,
                        },
                        {
                            id: "4",
                            amount: 3,
                        },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                pitch: -100,
                sounds: [
                    {
                        id: 'sixth-0-muted',
                        amount: 1,
                    },
                    {
                        id: 'sixth-0-open',
                        amount: 1,
                    },
                    {
                        id: 'sixth-1-muted',
                        amount: 1,
                    },
                    {
                        id: 'sixth-1-open',
                        amount: 1,
                    },
                    {
                        id: 'sixth-3-muted',
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
                id: 'h',
                sounds: [
                    {
                        id: 'h',
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
            {
                id: 'd',
                sounds: [
                    {
                        id: 'drone-high',
                        amount: 1,
                    },
                    {
                        id: 'drone-medium',
                        amount: 1,
                    },
                ],
            },
        ]
    }
}

export default preset;

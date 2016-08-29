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
                        enabled: true,
                    },
                    {
                        id: 'sixth-0-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-1-muted',
                        enabled: true,
                    },
                    {
                        id: 'sixth-1-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-3-muted',
                        enabled: true,
                    },
                    {
                        id: 'dissonance-10',
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
                sounds: [
                    {
                        id: 's',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'h',
                sounds: [
                    {
                        id: 'h',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'c',
                ringout: true,
                sounds: [
                    {
                        id: 'crash-left',
                        enabled: true,
                    },
                    {
                        id: 'crash-right',
                        enabled: true,
                    },
                    {
                        id: 'china-left',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'd',
                sounds: [
                    {
                        id: 'drone-high',
                        enabled: true,
                    },
                    {
                        id: 'drone-medium',
                        enabled: true,
                    },
                ],
            },
        ]
    }
}

export default preset;

const preset = {
    id: 'tesseract',
    description: 'Tesseract',
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
                bars  : 1,
                beats : 7.5,
                hitChance : .95,
                allowedLengths: [
                        {
                            id: "0.5",
                            amount: 1,
                        },
                        {
                            id: "1",
                            amount: 1,
                        },
                        {
                            id: "2",
                            amount: 1,
                        },
                        {
                            id: "4",
                            amount:1,
                        },
                ],
            },
            {
                id    : 'CUSTOM_SEQUENCE_2',
                description: 'Cymbal Beat',
                bars  : 1,
                beats : 6,
                hitChance : 1,
                allowedLengths: [
                        {
                            id: "0.5",
                            amount: 1,
                        },
                        {
                            id: "1",
                            amount: 1,
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
                sounds: [
                    {
                        id: 's',
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
        ]
    }
}

export default preset;

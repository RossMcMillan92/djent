const preset = {
    id: 'adtr',
    settings: {
        config: {
            bpm: 90,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id        : 'CUSTOM_SEQUENCE_1',
                bars      : 2,
                beats     : 4,
                hitChance : 0.8,
                allowedLengths : [
                    {
                        id: '1',
                        amount:1,
                    },
                    {
                        id: '2',
                        amount: 1,
                    },
                    {
                        id: '4',
                        amount: 2,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                sounds: [
                    {
                        id: 'sixth-3-muted',
                        amount: 9,
                    },
                    {
                        id: 'sixth-4-muted',
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
                        id: 'china-left',
                        amount: 1,
                    }
                ],
            },
        ]
    }
}

export default preset

const preset = {
    id: 'meshuggah',
    description: 'Meshuggah',
    settings: {
        config: {
            bpm : 90,
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
                beats          : 7,
                hitChance      : 1,
                allowedLengths : [
                        {
                            id: '1',
                            amount: 1,
                            isDotted: true,
                        },
                        {
                            id: '2',
                            amount: 3,
                            isDotted: true,
                        },
                        {
                            id: '4',
                            amount: 1,
                        },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                pitch: -300,
                sounds : [
                    {
                        id: 'sixth-0-open',
                        amount: 10,
                    },
                    {
                        id: 'sixth-12-open',
                        amount: 1,
                    },
                    {
                        id: 'sixth-13-open',
                        amount: 1,
                    },
                    {
                        id: 'sixth-15-open',
                        amount: 1,
                    },
                    {
                        id: 'sixth-0-muted',
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
}

export default preset

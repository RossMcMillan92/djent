const preset = {
    id: 'meshuggah',
    description: 'Meshuggah',
    settings: {
        config: {
            bpm            : 75,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 1,
                beats : 4,
            },
            {
                id    : 'CUSTOM_SEQUENCE_1',
                bars  : 4,
                beats : 4,
                hitChance      : 1,
                allowedLengths : [
                        {
                            id: "0.25",
                            amount: 1,
                        },
                        {
                            id: "0.5",
                            amount: 2,
                            isTriplet: true,
                        },
                        {
                            id: "1",
                            amount: 5,
                            isTriplet: true,
                        },
                        {
                            id: "2",
                            amount: 7,
                            isTriplet: true,
                        },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                pitch: -300,
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
                        id: 'sixth-4-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-0-muted',
                        enabled: true,
                    },
                    {
                        id: 'sixth-1-muted',
                        enabled: true,
                    },
                    {
                        id: 'fifth-6-open',
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
        ]
    }
}

export default preset;

const preset = {
    id: 'thall-buster',
    description: 'Thall - Buster',
    settings: {
        config: {
            bpm       : 65,
        },
        beats: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id    : 'RAND_BEAT_1',
                bars  : 2,
                beats : 4,
                hitChance : 1,
                allowedLengths: [
                        {
                            id: "1",
                            amount:2,
                            isTriplet: false
                        },
                        {
                            id: "2",
                            amount:1,
                            isTriplet: false
                        },
                        {
                            id: "4",
                            amount:2,
                            isTriplet: false
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
                        enabled: true,
                    },
                    {
                        id: 'sixth-1-muted',
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
                        id: 'drone-high-2',
                        enabled: true,
                    }
                ],
            },
        ],
    },
}

export default preset;

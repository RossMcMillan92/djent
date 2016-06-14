const preset = {
    id: 'tb',
    description: 'Thall - Buster',
    settings: {
        config: {
            bpm       : 65,
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
        beats: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id    : 'groove',
                bars  : 2,
                beats : 4,
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
                predefinedSequence: [
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 2, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 2, volume:1 }
                ],
                predefinedHitTypes: [1, 0, 2, 0, 2, 2, 2, 2, 0, 2, 1, 1, 2, 1, 0, 2, 0, 2, 2, 2, 2, 0, 2, 1, 1, 2],
            },
            {
                id: 'k',
                sounds: [
                    {
                        id: 'k',
                        enabled: true,
                    }
                ],
                predefinedSequence: [
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 2, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 1, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 4, volume:1 },
                    { beat: 2, volume:1 }
                ],
                predefinedHitTypes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

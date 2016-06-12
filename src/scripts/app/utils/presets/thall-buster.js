const preset = {
    id: 'thall-buster',
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
                id: 'guitar',
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
                        id: 'dissonance-10',
                        enabled: true,
                    },
                    {
                        id: 'scratch',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'kick',
                sounds: [
                    {
                        id: 'kick',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'snare',
                sounds: [
                    {
                        id: 'snare',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'cymbal',
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
                id: 'drone',
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
        ]
    }
}

export default preset;

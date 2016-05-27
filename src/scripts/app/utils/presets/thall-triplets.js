const preset = {
    id: 'thall-triplets',
    description: 'Thall - Triplets',
    settings: {
        config: {
            bpm       : 94,
            hitChance : 1,
            allowedLengths: [
                    {
                        id: "0.5",
                        amount: 1,
                        isTriplet: true
                    },
                    {
                        id: "1",
                        amount:1,
                        isTriplet: true
                    },
                    {
                        id: "2",
                        amount: 1,
                        isTriplet: true
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
                bars  : 1,
                beats : 12,
            },
        ],
        instruments: [
            {
                id: 'guitar',
                sounds: [
                    {
                        id: 'guitar-palm-zero-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-palm-zero-2',
                        enabled: true,
                    },
                    {
                        id: 'guitar-open-zero-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-open-zero-2',
                        enabled: true,
                    },
                    {
                        id: 'guitar-open-first-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-open-sixth-second-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-root-dissonance',
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
                id: 'crash',
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
                id: 'drone',
                sounds: [
                    {
                        id: 'drone-high',
                        enabled: true,
                    },
                ],
            },
        ]
    }
}

export default preset;

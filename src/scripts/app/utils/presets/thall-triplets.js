const preset = {
    id: 'thall-triplets',
    description: 'Thall - Triplets',
    settings: {
        config: {
            bpm       : 104,
            hitChance : 1,
            allowedLengths: [
                    {
                        id: "0.25",
                        amount: 1,
                        isTriplet: true
                    },
                    {
                        id: "2",
                        amount:1,
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
                        id: 'sixth-0-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-0-muted',
                        enabled: true,
                    },
                    {
                        id: 'sixth-1-open',
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
                    {
                        id: 'third-8-bend',
                        enabled: true,
                    },
                    {
                        id: 'dissonance-16',
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

const preset = {
    id: 'thall-triplets-slow',
    description: 'Thall - Triplets Slow',
    settings: {
        config: {
            bpm       : 108,
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
                bars  : 4,
                beats : 4,
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
                        id: 'third-8-open',
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

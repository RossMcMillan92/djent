const preset = {
    id: 'blacktongue',
    settings: {
        config: {
            bpm       : 20,
            hitChance : 1,
            allowedLengths: [
                    {
                        id: "1",
                        amount:1,
                        isTriplet: false
                    },
                    {
                        id: "2",
                        amount: 1,
                        isTriplet: false
                    },
            ],
        },
        beats: [
            {
                id    : 'total',
                bars  : 8,
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
                        enabled: false,
                    },
                    {
                        id: 'guitar-open-zero-2',
                        enabled: false,
                    },
                    {
                        id: 'guitar-open-first-1',
                        enabled: false,
                    },
                    {
                        id: 'guitar-open-sixth-second-1',
                        enabled: false,
                    },
                    {
                        id: 'guitar-root-dissonance',
                        enabled: false,
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
                        enabled: false,
                    },
                ],
            },
        ]
    }
}

export default preset;

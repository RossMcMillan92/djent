const preset = {
    id: 'sworn-in',
    description: 'Sworn In',
    settings: {
        config: {
            bpm            : 100,
            hitChance      : .7,
            allowedLengths : [
                    {
                        id: "0.5",
                        amount: 3,
                        isTriplet: false
                    },
                    {
                        id: "4",
                        amount: 1,
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
                bars  : 4,
                beats : 4,
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
                        id: 'guitar-palm-first-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-open-first-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-open-first-2',
                        enabled: true,
                    },
                    {
                        id: 'guitar-open-eighth',
                        enabled: false,
                    },
                    {
                        id: 'guitar-open-sixth-second-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-root-dissonance',
                        enabled: false,
                    },
                    {
                        id: 'guitar-dissonance-high',
                        enabled: true,
                    },
                    {
                        id: 'guitar-dissonance-high-2',
                        enabled: true,
                    }
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
                id: 'hihat',
                sounds: [
                    {
                        id: 'hihat',
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
            {
                id: 'drone',
                sounds: [
                    {
                        id: 'drone-high',
                        enabled: true,
                    },
                    {
                        id: 'drone-medium',
                        enabled: true,
                    },
                ],
            },
        ]
    }
}

export default preset;

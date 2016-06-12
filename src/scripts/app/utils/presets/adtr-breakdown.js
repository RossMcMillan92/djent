const preset = {
    id: 'adtr-breakdown',
    description: 'ADTR Breakdown',
    settings: {
        config: {
            bpm            : 90,
            hitChance      : .8,
            allowedLengths : [
                    {
                        id: "1",
                        amount:1,
                    },
                    {
                        id: "2",
                        amount: 1,
                    },
                    {
                        id: "4",
                        amount: 2,
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
                beats : 4,
            },
        ],
        instruments: [
            {
                id: 'guitar',
                sounds: [
                    {
                        id: 'sixth-3-muted',
                        enabled: true,
                    },
                    {
                        id: 'sixth-4-muted',
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

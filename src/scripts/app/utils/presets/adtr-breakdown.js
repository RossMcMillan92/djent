const preset = {
    id: 'adtr-breakdown',
    description: 'ADTR - Breakdown',
    settings: {
        config: {
            bpm            : 90,
            hitChance      : .9,
            allowedLengths : [
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
                    {
                        id: "4",
                        amount: 2,
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
                        id: 'guitar-palm-zero-1',
                        enabled: true,
                    },
                    {
                        id: 'guitar-palm-zero-2',
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

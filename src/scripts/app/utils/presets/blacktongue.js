const preset = {
    id: 'blacktongue',
    description: 'Black Tongue',
    settings: {
        config: {
            bpm            : 50,
            hitChance      : 1,
            allowedLengths : [
                    {
                        id: "0.25",
                        amount:1,
                        isTriplet: false
                    },
                    {
                        id: "0.5",
                        amount:1,
                        isTriplet: false
                    },
                    {
                        id: "1",
                        amount: 1,
                        isTriplet: false
                    },
                    {
                        id: "2",
                        amount: 5,
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
                bars  : 2,
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

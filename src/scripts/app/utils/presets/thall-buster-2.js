const preset = {
    id: 'thall',
    description: 'Thall',
    settings: {
        config: {
            bpm       : 87,
            hitChance : 1,
            allowedLengths: [
                    {
                        id: "1",
                        amount:1,
                        isTriplet: false
                    },
                    {
                        id: "4",
                        amount:3,
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
                bars  : 1,
                beats : 7.5,
            },
        ],
        instruments: [
            {
                id: 'g',
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
                        id: 'fifth-5-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-6-open',
                        enabled: true,
                    },
                    {
                        id: 'third-7-open',
                        enabled: true,
                    },
                    {
                        id: 'third-8-open',
                        enabled: true,
                    },
                    {
                        id: 'third-7-bend',
                        enabled: true,
                    },
                    {
                        id: 'third-8-bend',
                        enabled: true,
                    },
                    {
                        id: 'scratch',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'k',
                sounds: [
                    {
                        id: 'k',
                        enabled: true,
                    }
                ],
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
        ]
    }
}

export default preset;

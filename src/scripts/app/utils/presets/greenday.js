const preset = {
    id: 'greenday',
    description: 'American Idiot',
    settings: {
        config: {
            bpm       : 160,
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
                id: 'g',
                sounds: [
                    {
                        id: 'fifth-5-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-7-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-12-open',
                        enabled: true,
                    },
                ],
                predefinedHitTypes: [
                    'fifth-7-open',
                    'fifth-7-open',
                    'fifth-7-open',
                    'fifth-12-open',
                    'fifth-12-open',
                    'fifth-12-open',
                    'fifth-5-open',
                    'fifth-5-open',
                    'fifth-12-open',
                    'fifth-7-open',
                    'fifth-5-open',
                ],
                predefinedSequence: [
                    { beat: 2, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 1, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 1, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 1, volume: 1 },
                    { beat: 1, volume: 1 },
                    { beat: 1, volume: 1 },
                ]
            },
            {
                id: 'k',
                sounds: [
                    {
                        id: 'k',
                        enabled: true,
                    }
                ],
                predefinedHitTypes: [
                    'k',
                    'k',
                    'k',
                    'k',
                    'k',
                    'k',
                    'k',
                    'k',
                    'k',
                    'k',
                    'k',
                ],
                predefinedSequence: [
                    { beat: 2, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 2, volume: 0 },
                    { beat: 1, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 2, volume: 0 },
                    { beat: 1, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 1, volume: 0 },
                    { beat: 2, volume: 1 },
                    { beat: 2, volume: 1 },
                    { beat: 1, volume: 0 },
                ]
            },
            {
                id: 's',
                sounds: [
                    {
                        id: 's',
                        enabled: true,
                    }
                ],
                predefinedHitTypes: [
                    's',
                    's',
                ],
                predefinedSequence: [
                    { beat: 1, volume: 0 },
                    { beat: 1, volume: 1 },
                ]
            },
            {
                id: 'h',
                sounds: [
                    {
                        id: 'h',
                        enabled: true,
                    },
                ],
                predefinedHitTypes: [
                    'h',
                ],
                predefinedSequence: [
                    { beat: 1, volume: 1 },
                ]
            },
        ],
    },
}

export default preset;

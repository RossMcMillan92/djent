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
                        amount: 1,
                    },
                    {
                        id: 'fifth-7-open',
                        amount: 1,
                    },
                    {
                        id: 'fifth-12-open',
                        amount: 1,
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
                        amount: 1,
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
                        amount: 1,
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
                        amount: 1,
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

const preset = {
    id: 'black-dahlia',
    description: 'Black Dhalia Murder',
    settings: {
        config: {
            bpm            : 212,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 8,
                beats : 4,
            },
            {
                id          : 'CUSTOM_SEQUENCE_1',
                description : 'Guitars',
                bars        : 8,
                beats       : 4,
                hitChance   : 1,
                allowedLengths : [
                    {
                        id: '4',
                        amount:1,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                repeatHitTypeForXBeat: 2,
                sounds: [
                    {
                        id: 'fifth-5-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-6-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-9-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-10-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-12-open',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'k',
                sequences: [
                    [
                        { beat: 2, volume: 1 },
                   ],
                   [
                       { beat: 1, volume: 1 },
                   ],
                ],
                sounds: [
                    {
                        id: 'k',
                        enabled: true,
                    }
                ],
            },
            {
                id: 's',
                sequences: [
                    [
                        { beat: 4, volume: 0 },
                        { beat: 4, volume: 1 },
                    ],
                    [
                        { beat: 2, volume: 0 },
                        { beat: 2, volume: 1 },
                    ],
                ],
                sounds: [
                    {
                        id: 's',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'c',
                sequences: [
                    'drone',
                ],
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
                    },
                ],
            },
            {
                id: 'h',
                sequences: [
                    [
                        { beat: 1, volume: 0 },
                        { beat: 1, volume: 1 },
                        { beat: 1, volume: 1 },
                        { beat: 1, volume: 1 },
                   ]
                ],
                sounds: [
                    {
                        id: 'h',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'd',
                sounds: [
                    {
                        id: 'drone-high',
                        enabled: false,
                    },
                ],
            },
        ]
    }
};

export default preset;

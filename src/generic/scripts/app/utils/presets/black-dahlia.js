const preset = {
    id: 'black-dahlia',
    description: 'Blast Beats',
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
                        amount: 1,
                    },
                    {
                        id: 'fifth-6-open',
                        amount: 1,
                    },
                    {
                        id: 'fifth-9-open',
                        amount: 1,
                    },
                    {
                        id: 'fifth-10-open',
                        amount: 1,
                    },
                    {
                        id: 'fifth-12-open',
                        amount: 1,
                    },
                ],
            },
            {
                id: 'k',
                volume: 0.8,
                sequences: [
                    'steadyEighths',
                ],
                sounds: [
                    {
                        id: 'k',
                        amount: 1,
                    }
                ],
            },
            {
                id: 's',
                volume: 0.7,
                sequences: [
                    'offsetEighths',
                ],
                sounds: [
                    {
                        id: 's',
                        amount: 1,
                    }
                ],
            },
            {
                id: 'c',
                sequences: [
                    'twoBars',
                ],
                sounds: [
                    {
                        id: 'crash-left',
                        amount: 1,
                    },
                    {
                        id: 'crash-right',
                        amount: 1,
                    },
                    {
                        id: 'china-left',
                        amount: 1,
                    },
                ],
            },
            {
                id: 'h',
                sequences: [
                    'steadyQuarters'
                ],
                sounds: [
                    {
                        id: 'h',
                        amount: 1,
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

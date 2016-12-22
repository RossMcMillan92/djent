const preset = {
    id: 'deftones',
    description: 'Chords',
    settings: {
        config: {
            bpm            : 90,
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
                        id: '0.25',
                        amount: 1,
                    },
                    {
                        id: '0.5',
                        amount: 1,
                    },
                    {
                        id: '1',
                        amount: 1,
                    },
                ],
            },
            {
                id          : 'CUSTOM_SEQUENCE_2',
                description : 'Lead Guitar',
                bars        : 1,
                beats       : 8,
                hitChance   : 1,
                allowedLengths : [
                    {
                        id: '1',
                        amount: 1,
                    },
                    {
                        id: '2',
                        amount: 3,
                        isDotted: true,
                    },
                    {
                        id: '4',
                        amount: 2,
                    },
                ],
            },
            {
                id          : 'CUSTOM_SEQUENCE_3',
                description : 'Hihat',
                bars        : 2,
                beats       : 4,
                hitChance   : 1,
                allowedLengths : [
                    {
                        id: '2',
                        amount: 8,
                    },
                    {
                        id: '4',
                        amount: 3,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                repeatHitTypeForXBeat: 8,
                sounds: [
                    {
                        id: 'sixth-0-chord',
                        enabled: true,
                    },
                    {
                        id: 'sixth-3-chord',
                        enabled: true,
                    },
                    {
                        id: 'sixth-8-chord',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'lg',
                sequences: [
                    'CUSTOM_SEQUENCE_2',
                ],
                sounds: [
                    {
                        id: 'gs4',
                        enabled: true,
                    },
                    {
                        id: 'as5',
                        enabled: true,
                    },
                    {
                        id: 'b5',
                        enabled: true,
                    },
                    {
                        id: 'cs5',
                        enabled: true,
                    },
                    {
                        id: 'ds5',
                        enabled: true,
                    },
                    {
                        id: 'e5',
                        enabled: true,
                    },
                    {
                        id: 'fs5',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'k',
                sequences: [
                    'CUSTOM_SEQUENCE_1',
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
                    'twoBars',
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
                ],
            },
            {
                id: 'h',
                sequences: [
                    'CUSTOM_SEQUENCE_3',
                ],
                sounds: [
                    {
                        id: 'h',
                        enabled: true,
                    },
                    {
                        id: 'hc',
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

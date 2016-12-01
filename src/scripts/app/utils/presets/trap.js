const preset = {
    id: 'trap',
    description: 'Trap',
    settings: {
        config: {
            bpm            : 120,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id          : 'CUSTOM_SEQUENCE_1',
                description : 'Hits',
                bars        : 2,
                beats       : 4,
                hitChance   : 0.15,
                allowedLengths : [
                    {
                        id: '1',
                        amount: 1,
                    },
                    {
                        id: '2',
                        amount: 1,
                    },
                ],
            },
            {
                id          : 'CUSTOM_SEQUENCE_2',
                description : 'Bass drum',
                bars        : 1,
                beats       : 4,
                hitChance   : 0.8,
                allowedLengths : [
                    {
                        id: '1',
                        amount: 4,
                    },
                    {
                        id: '2',
                        amount: 2,
                    },
                    {
                        id: '4',
                        amount: 1,
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
                        id: '1',
                        amount: 1,
                    },
                    {
                        id: '2',
                        amount: 8,
                    },
                    {
                        id: '4',
                        amount: 2,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                // repeatHitTypeForXBeat: 8,
                ringout: true,
                pitch: 600,
                sounds: [
                    {
                        id: 'sixth-1-muted',
                        path: '/assets/audio/trap/hit.wav',
                        enabled: false,
                    },
                    {
                        id: 'sixth-2-muted',
                        path: '/assets/audio/trap/hit2.wav',
                        enabled: false,
                    },
                    {
                        id: 'sixth-3-muted',
                        path: '/assets/audio/trap/hit3.wav',
                        enabled: true,
                    },
                    {
                        id: 'sixth-4-muted',
                        path: '/assets/audio/trap/hit4.wav',
                        enabled: false,
                    },
                ],
            },
            {
                id: 'k',
                ringout: false,
                sequences: [
                    'CUSTOM_SEQUENCE_2',
                ],
                sounds: [
                    {
                        id: 'k',
                        enabled: true,
                        path: '/assets/audio/trap/bass.wav',
                    }
                ],
            },
            {
                id: 's',
                sounds: [
                    {
                        id: 's',
                        path: '/assets/audio/trap/snare.wav',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'c',
                sounds: [
                    {
                        id: 'crash-left',
                        // enabled: true,
                    },
                    {
                        id: 'crash-right',
                        // enabled: true,
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
                        path: '/assets/audio/trap/hihat-open.wav',
                        enabled: true,
                    },
                    {
                        id: 'hc',
                        path: '/assets/audio/trap/hihat-closed.wav',
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

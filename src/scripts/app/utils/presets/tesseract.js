const preset = {
    id: 'tesseract',
    description: 'Tesseract',
    settings: {
        config: {
            bpm       : 122,
            hitChance : .78,
            allowedLengths: [
                    {
                        id: "1",
                        amount: 1,
                        isTriplet: true
                    },
                    {
                        id: "2",
                        amount:1,
                        isTriplet: true
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
                beats : 6,
            },
        ],
        instruments: [
            {
                id: 'guitar',
                sounds: [
                    {
                        id: 'sixth-2-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-4-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-5-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-7-open',
                        enabled: true,
                    },
                    {
                        id: 'fifth-10-open',
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
        ]
    }
}

export default preset;

const preset = {
    id: 'tes',
    description: 'Tesseract',
    settings: {
        config: {
            bpm       : 122,
            hitChance : .95,
            allowedLengths: [
                    {
                        id: "0.25",
                        amount: 1,
                        isTriplet: true
                    },
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
                bars  : 8,
                beats : 4,
            },
            {
                id    : 'groove',
                bars  : 1,
                beats : 7,
            },
        ],
        instruments: [
            {
                id: 'g',
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
        ]
    }
}

export default preset;

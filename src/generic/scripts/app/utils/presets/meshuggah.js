const preset = {
  id: 'meshuggah',
  settings: {
    config: {
      bpm: 90,
    },
    sequences: [
      {
        id: 'total',
        bars: 4,
        beats: 4,
      },
      {
        id: 'CUSTOM_SEQUENCE_1',
        bars: 1,
        beats: 7,
        hitChance: 1,
        allowedLengths: [
          {
            id: '0.25',
            value: 0.25,
            amount: 1,
          },
        ],
        enabledPatterns: [
          {
            id: 'pattern-1',
            amount: 3,
            value: [
              { value: 8 },
              { value: 8 },
              { value: 8 },
              { value: 8, isMuted: true },
              { value: 8 },
              { value: 8, isMuted: true },
            ]
          },
        ]
      },
    ],
    instruments: [
      {
        id: 'g',
        pitch: -300,
        sounds: [
          {
            id: 'sixth-0-open',
            amount: 8,
          },
        ],
      },
      {
        id: 'k',
        sounds: [
          {
            id: 'k',
            amount: 1,
          },
        ],
      },
      {
        id: 's',
        sounds: [
          {
            id: 's',
            amount: 1,
          },
        ],
      },
      {
        id: 'c',
        ringout: true,
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
    ],
  },
}

export default preset

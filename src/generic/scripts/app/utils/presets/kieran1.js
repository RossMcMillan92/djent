const mainRythm = [
    { beat: 2, volume: 1 },
    { beat: 2, volume: 1 },
    { beat: 1, volume: 1 },
    { beat: 4, volume: 1 },
    { beat: 4, volume: 1 },
    { beat: 2, volume: 1 },
    { beat: 4, volume: 1 },
    { beat: 4, volume: 1 },
    { beat: 1, volume: 1 },
    { beat: 2, volume: 1 },
    { beat: 2, volume: 1 },
    { beat: 2, volume: 1 },
    { beat: 2, volume: 1 },
    { beat: 2, volume: 1 },
    { beat: 4, volume: 1 },
    { beat: 4, volume: 1 },
    { beat: 1, volume: 1 },
]

const preset = {
  id: 'kieran',
  description: 'Kierannnnn',
  settings: {
    config: {
      bpm: 135,
    },
    sequences: [
        {
            id    : 'total',
            bars  : 2,
            beats : 4,
        },
        {
            id             : 'CUSTOM_SEQUENCE_1',
            bars           : 2,
            beats          : 4,
            hitChance      : 1,
            allowedLengths : [
                {
                  id: '1',
                  amount: 2,
                  isTriplet: false
                },
                {
                  id: '2',
                  amount: 1,
                  isTriplet: false
                },
                {
                  id: '4',
                  amount: 2,
                  isTriplet: false
                },
            ],
          },
    ],
    instruments: [
      {
        id: 'g',
        pitch: -100,
        sounds: [
          {
            id: 'sixth-0-muted',
            amount: 1,
          },
          {
            id: 'fifth-6-open',
            amount: 1,
          },
          {
            id: 'fifth-12-open',
            amount: 1,
          },
        ],
        predefinedHitTypes: [
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'fifth-6-open',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'fifth-6-open',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
          'sixth-0-muted',
        ],
        predefinedSequence: mainRythm
      },
      {
        id: 'k',
        sounds: [
          {
            id: 'k',
            amount: 1,
          }
        ],
        predefinedHitTypes: mainRythm.map(x => 'k'),
        predefinedSequence: mainRythm
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
        id: 'c',
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
        predefinedHitTypes: [
            'crash-left',
            'crash-right',
            'crash-right',
            'crash-right',
            'crash-right',
            'crash-right',
            'crash-right',
          'crash-right',
        ],
        predefinedSequence: [
          { beat: 1, volume: 1 },
        ]
      },
    ],
    },
}

export default preset

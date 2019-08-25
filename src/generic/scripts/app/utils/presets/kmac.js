const preset = {
  id: "kmac",
  settings: {
    config: {
      bpm: 90
    },
    sequences: [
      {
        id: "total",
        bars: 4,
        beats: 4
      },
      {
        id: "CUSTOM_SEQUENCE_1",
        bars: 1,
        beats: 7,
        hitChance: 1,
        allowedLengths: [
          {
            id: "1",
            amount: 1,
            isDotted: true
          },
          {
            id: "2",
            amount: 3,
            isDotted: true
          },
          {
            id: "4",
            amount: 1
          }
        ]
      }
    ],
    instruments: [
      {
        id: "g",
        pitch: -300,
        sounds: [
          {
            id: "sixth-0-open",
            path: "assets/audio/kmac/ktestnote1.mp3",
            amount: 1
          },
          {
            id: "dissonance-10",
            path: "assets/audio/kmac/kree.mp3",
            amount: 1
          }
        ]
      },
      {
        id: "k",
        sounds: [
          {
            id: "k",
            path: "assets/audio/kmac/kbass.mp3",
            amount: 1
          }
        ]
      },
      {
        id: "s",
        sounds: [
          {
            id: "s",
            path: "assets/audio/kmac/ksnare.mp3",
            amount: 1
          }
        ]
      },
      {
        id: "c",
        ringout: true,
        sounds: [
          {
            id: "crash-left",
            path: "assets/audio/kmac/kcymbal.mp3",
            amount: 1
          }
        ]
      },
      {
        id: "h",
        sounds: [
          {
            id: "hc",
            path: "assets/audio/kmac/khhc.mp3",
            amount: 1
          },
          {
            id: "h",
            path: "assets/audio/kmac/khho.mp3",
            amount: 1
          }
        ]
      }
    ]
  }
};

export default preset;

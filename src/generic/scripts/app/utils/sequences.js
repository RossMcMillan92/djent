import { multiply, divide } from 'ramda'

import { randomFromArray, repeatArray } from 'utils/tools'

const predefinedSequences = {
  steadyWholes: {
    description: 'Steady Wholes',
    sequence: [{ beat: 0.25, volume: 1 }],
  },

  steadyHalfs: {
    description: 'Steady Halfs',
    sequence: [{ beat: 0.5, volume: 1 }],
  },

  steadyQuarters: {
    description: 'Steady Quarters',
    sequence: [{ beat: 1, volume: 1 }],
  },

  steadyEighths: {
    description: 'Steady Eighths',
    sequence: [{ beat: 2, volume: 1 }],
  },

  steadySixteenths: {
    description: 'Steady Sixteenths',
    sequence: [{ beat: 4, volume: 1 }],
  },

  offsetWholes: {
    description: 'Offset Wholes',
    sequence: [{ beat: 0.5, volume: 0 }, { beat: 0.5, volume: 1 }],
  },

  offsetHalfs: {
    description: 'Offset Halfs',
    sequence: [{ beat: 1, volume: 0 }, { beat: 1, volume: 1 }],
  },

  offsetQuarters: {
    description: 'Offset Quarters',
    sequence: [{ beat: 2, volume: 0 }, { beat: 2, volume: 1 }],
  },

  offsetEighths: {
    description: 'Offset Eights',
    sequence: [{ beat: 4, volume: 0 }, { beat: 4, volume: 1 }],
  },

  twoBars: {
    description: '2 Bars',
    sequence: [{ beat: 0.125, volume: 1 }],
  },

  none: {
    description: 'none',
    sequence: [{ beat: 1, volume: 0 }],
  },
}

const noteTransform = (isTriplet, isDotted, value) => {
  const multiplier = isTriplet || isDotted ? 1.5 : 1
  const transform = isTriplet ? multiply : divide
  return transform(value, multiplier)
}

const convertAllowedLengthsToArray = objs =>
  objs.reduce((newArr, obj) => {
    if (!obj.amount) return newArr

    const {
 amount, id, isDotted, isTriplet, value,
} = obj
    const finalValue = value || parseFloat(id)
    const length = noteTransform(isTriplet, isDotted, finalValue)
    return [...newArr, ...repeatArray([length], amount)]
  }, [])

const convertEnabledPatternsToArray = objs =>
  objs.reduce((newArr, obj) => {
    if (!obj.amount) return newArr

    const { amount, value } = obj

    return [...newArr, ...repeatArray([value], amount)]
  }, [])

const getFinalBeatsFromPattern = (finalThing, hitChance) => {
  const chanceVolume = Math.random() < hitChance ? 1 : 0
  return finalThing
    .map(n => ({
      beat: n.value,
      volume: n.isMuted
        ? 0
        : chanceVolume,
    }))
}


const getFinalBeatsFromNote = (finalThing, hitChance) => ([
  {
    beat: finalThing,
    volume: Math.random() < hitChance ? 1 : 0,
  },
])

const generateSequence = ({
  allowedLengths,
  enabledPatterns,
  hitChance,
  totalBeats,
}) =>
  (function loop(sequence, targetBeats, allowedNotes, allowedPatterns) {
    const sumOfSequence = sequence.reduce(
      (acc, n) => acc + (n ? 1 / n.beat : 0),
      0,
    )
    const randomNote = randomFromArray(allowedNotes)
    const totalSelection = allowedNotes.concat(enabledPatterns)
    const randomThing = randomFromArray(totalSelection)
    const randomThingIsPattern = Array.isArray(randomThing)
    const randomNoteLength = 1 / randomNote
    const randomPatternLength = randomThingIsPattern
      ? randomThing.reduce((acc, n) => acc + (n.value ? 1 / n.value : 0), 0)
      : 0
    const randomNoteIsTooBig = sumOfSequence + randomNoteLength > targetBeats
    const randomPatternIsTooBig = sumOfSequence + randomPatternLength > targetBeats
    const randomThingIsTooBig = randomThingIsPattern ? randomPatternIsTooBig : randomNoteIsTooBig

    if (randomThingIsTooBig) {
      const availableAllowedNotes = allowedNotes.filter(length => 1 / length <= targetBeats - sumOfSequence)
      const availableAllowedPatterns = enabledPatterns
        .map(p => p.reduce((acc, n) => acc + (n.value ? 1 / n.value : 0), 0))
        .filter(length => length <= targetBeats - sumOfSequence)
      if (availableAllowedNotes.length || availableAllowedPatterns.length) {
        return loop(sequence, targetBeats, availableAllowedNotes, availableAllowedPatterns)
      }
    }

    const remainingNote = 1 / (targetBeats - sumOfSequence)
    const finalThing = randomThingIsTooBig ? remainingNote : randomThing
    const finalThingIsPattern = Array.isArray(finalThing)
    const finalThingLength = !finalThingIsPattern
      ? finalThing
      : finalThing.reduce((acc, n) => acc + (n.value ? 1 / n.value : 0), 0)
    const thereIsNoTimeLeft =
      Math.floor(sumOfSequence + 0.001) >= targetBeats &&
      !Number.isFinite(finalThingLength)

    if (thereIsNoTimeLeft) return sequence

    const newBeats = finalThingIsPattern
      ? getFinalBeatsFromPattern(finalThing, hitChance)
      : getFinalBeatsFromNote(finalThing, hitChance)

    return loop([...sequence, ...newBeats], targetBeats, allowedNotes, allowedPatterns)
  }([], totalBeats, allowedLengths, enabledPatterns))

const generateAllowedLengthsFromSequence = (sequence, allowedLengths) =>
  allowedLengths.map((length) => {
    const amount = sequence.filter(item => item.beat === parseFloat(length.id))
      .length
    const amountTriplets = sequence.filter(item => item.beat === parseFloat(length.id) * 1.5).length
    const amountDotted = sequence.filter(item => item.beat === parseFloat(length.id) * 0.75).length

    return {
      ...length,
      amount: amount || amountTriplets,
      isTriplet: !!amountTriplets,
      isDotted: !!amountDotted,
    }
  })

const loopSequence = (sequence, totalBeats) => {
  if (!sequence.length) return []

  const totalBeatLength = sequence.reduce(
    (prev, next) => 1 / next.beat + prev,
    0,
  )
  if (totalBeatLength === totalBeats) return [...sequence]

  let newSequence = []
  let newTotalBeatLength = 0
  let i = 0
  while (newTotalBeatLength < totalBeats) {
    let newBeat = sequence[i]

    if (totalBeats - newTotalBeatLength < 1 / newBeat.beat) {
      newBeat = { ...newBeat, beat: 1 / (totalBeats - newTotalBeatLength) }
    }

    newSequence = newSequence.concat(newBeat)
    newTotalBeatLength += 1 / newBeat.beat
    i = i + 1 < sequence.length ? i + 1 : 0
  }

  return newSequence
}

const generateTimeMap = (sequence) => {
  const times = sequence.map((beat, i, seq) =>
    seq.slice(0, i + 1).reduce((prev, cur) => prev + 1 / cur.beat, 0))
  return [0, ...times.slice(0, times.length - 1)]
}

const generateSequenceFromAllowedLengths = (
  instrument,
  sequences,
  sequenceId,
) => {
  const instrumentSequence = sequences.find(s => s.id === sequenceId)

  if (!instrumentSequence) return

  const {
    allowedLengths,
    bars,
    beats,
    enabledPatterns,
    hitChance,
  } = instrumentSequence

  const totalBeats = beats * bars
  const allowedLengthsArray = convertAllowedLengthsToArray(allowedLengths)
  const enabledPatternsArray = convertEnabledPatternsToArray(enabledPatterns)

  return generateSequence({
    allowedLengths: allowedLengthsArray,
    enabledPatterns: enabledPatternsArray,
    hitChance,
    totalBeats,
  })
}

//    getSequenceForInstrument ::
//    sequences -> generatedSequences -> instrument -> sequence
const getSequenceForInstrument = (
  sequences,
  generatedSequences,
  instrument,
) => {
  const { sequences: instrumentSequences } = instrument

  const sequenceId =
    instrumentSequences &&
    instrumentSequences.length &&
    randomFromArray(instrumentSequences)
  const pregeneratedSequence =
    predefinedSequences[sequenceId] && predefinedSequences[sequenceId].sequence
  const riffSpecificPregeneratedSequence = generatedSequences[sequenceId]

  const finalSequence =
    pregeneratedSequence ||
    riffSpecificPregeneratedSequence ||
    generateSequenceFromAllowedLengths(instrument, sequences, sequenceId) ||
    []

  return {
    id: sequenceId,
    sequence: finalSequence,
  }
}

//    getSequence :: { ... } -> instrument -> sequence
const getSequence = ({
  sequences,
  generatedSequences,
  usePredefinedSettings,
}) => (instrument) => {
  const { predefinedSequence } = instrument
  const shouldUsePredefinedSequence =
    usePredefinedSettings && predefinedSequence

  return shouldUsePredefinedSequence
    ? { sequence: predefinedSequence }
    : getSequenceForInstrument(sequences, generatedSequences, instrument)
}

const getTotalTimeLength = (sequences, bpm) =>
  getTotalBeatsLength(sequences) * (60 / bpm)

const getTotalBeatsLength = (sequences) => {
  const totalBeats = sequences.find(s => s.id === 'total')
  const totalBeatsLength = totalBeats.bars * totalBeats.beats
  return totalBeatsLength
}

export {
  convertAllowedLengthsToArray,
  generateSequence,
  generateAllowedLengthsFromSequence,
  getTotalBeatsLength,
  getTotalTimeLength,
  loopSequence,
  generateTimeMap,
  getSequence,
  predefinedSequences,
}

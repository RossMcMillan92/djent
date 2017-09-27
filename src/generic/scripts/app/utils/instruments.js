import { curry, update } from 'ramda'

import { loopSequence, generateTimeMap } from './sequences'

import { randFromTo, repeatArray } from './tools'

const generateInstrumentTimeMap = instrument => ({
  ...instrument,
  timeMap: generateTimeMap(instrument.sequence),
})

const generateInstrumentHitTypes = (instrument, usePredefinedSettings) => {
  const predefinedHitTypes = instrument.predefinedHitTypes

  if (
    usePredefinedSettings &&
    predefinedHitTypes &&
    predefinedHitTypes.length
  ) {
    return {
      ...instrument,
      hitTypes: predefinedHitTypes,
    }
  }

  const activeSounds = instrument.sounds.reduce(
    (newArr, sound) =>
      sound.amount
        ? newArr.concat(repeatArray([{ ...sound }], sound.amount))
        : newArr,
    [],
  )

  let hitTypes = []

  if (activeSounds.length) {
    let beatCount = 0
    let currentHitType = false
    hitTypes = instrument.sequence.map((beat) => {
      const shouldRandomise =
        beatCount === 0 || beatCount >= instrument.repeatHitTypeForXBeat
      currentHitType = shouldRandomise
        ? randFromTo(0, activeSounds.length - 1)
        : currentHitType

      beatCount =
        beatCount < instrument.repeatHitTypeForXBeat
          ? beatCount + 1 / beat.beat
          : beatCount - instrument.repeatHitTypeForXBeat + 1 / beat.beat
      return activeSounds[currentHitType].id
    })
  }

  return {
    ...instrument,
    hitTypes,
  }
}

const getActiveSoundsFromHitTypes = hitTypes =>
  (!hitTypes ? [] : hitTypes).reduce((newArr, hit) => {
    const hitInArray = newArr.find(h => h.id === hit)
    return hitInArray
      ? update(
          newArr.indexOf(hitInArray),
          { ...hitInArray, amount: hitInArray.amount + 1 },
          newArr,
        )
      : [...newArr, { id: hit, amount: 1 }]
  }, [])

//    renderAudioTemplateAtTempo :: instruments -> bpmMultiplier -> AudioTemplate
const renderAudioTemplateAtTempo = (instruments, bpmMultiplier) =>
  instruments
    .reduce((newArr, instrument) => {
      const hits = instrument.timeMap.reduce((newHits, time, i) => {
        const instrumentSequence = instrument.sequence[i]
        if (!instrumentSequence || instrument.volume === 0) return newHits

        const pitchAmount = instrument.pitch || 0
        const buffer = instrument.buffers[instrument.hitTypes[i]]
        const startTime = time * bpmMultiplier
        const duration = instrument.ringout
          ? buffer.duration
          : 1 / instrumentSequence.beat * bpmMultiplier
        const prevNoteExisted = i && instrument.sequence[i - 1].volume
        const fadeOutDuration =
          Math.min(instrument.fadeOutDuration, duration) || 0
        const fadeInDuration = prevNoteExisted ? fadeOutDuration || 0 : 0
        const reverb =
          typeof instrument.reverb !== 'undefined' ? instrument.reverb : false
        const volume =
          instrumentSequence.volume *
          (instrument.volume ? instrument.volume : 1)

        return [
          ...newHits,
          {
            buffer,
            startTime,
            duration,
            volume,
            pitchAmount,
            fadeInDuration,
            fadeOutDuration,
            reverb,
          },
        ]
      }, [])

      return [...newArr, ...hits]
    }, [])
    .sort((a, b) => a.startTime - b.startTime)

const repeatHits = instrument => ({
  ...instrument,
  hitTypes: repeatArray(instrument.hitTypes, instrument.sequence.length),
})

const repeatSequence = curry((totalBeats, instrument) => ({
  ...instrument,
  sequence: loopSequence(instrument.sequence, totalBeats),
}))

export {
  generateInstrumentTimeMap,
  generateInstrumentHitTypes,
  getActiveSoundsFromHitTypes,
  renderAudioTemplateAtTempo,
  repeatHits,
  repeatSequence,
}

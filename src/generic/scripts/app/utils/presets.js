import deepEqual from 'deep-equal'
import { __, compose, curry, indexOf, isNil, map, update } from 'ramda'
import { Maybe } from 'ramda-fantasy'
import configInitialState from 'reducers/config.initial-state'
import sequencesInitialState from 'reducers/sequences.initial-state'
import instrumentsInitialState from 'utils/default-instruments'
import { getAllowedLengthsFromSequence } from 'utils/sequences'

const createPresetFactory = ({
    configInitialState: _configInitialState,
    instrumentsInitialState: _instrumentsInitialState,
    sequencesInitialState: _sequencesInitialState
}) =>
    ({ bpm, description, group, id, instruments, sequences, usePredefinedSettings }) => {
        const newPreset = {}
        const configObj = {}

        if (description) newPreset.description = description
        if (!isNil(id)) newPreset.id = id
        if (!isNil(group)) newPreset.group = group
        if (bpm && _configInitialState.bpm !== bpm) configObj.bpm = bpm

        const settingsObj = {
            ...(
                Object.keys(configObj).length
                    ? { config: configObj }
                    : {}
            ),
            ...(
                sequences && sequences.length && !deepEqual(sequences, _sequencesInitialState)
                    ? { sequences }
                    : {}
            ),
        }

        if (usePredefinedSettings) {
            settingsObj.instruments = instruments
                .map(instrument => ({
                    id: instrument.id,
                    pitch: instrument.pitch,
                    predefinedHitTypes: instrument.hitTypes,
                    predefinedSequence: instrument.sequence,
                    sequences: instrument.sequences,
                    volume: instrument.volume,
                    fadeOutDuration: instrument.fadeOutDuration,
                    repeatHitTypeForXBeat: instrument.repeatHitTypeForXBeat,
                }))
        } else if (instruments && instruments.length) {
            const newInstruments =  instruments
                .reduce((_newInstruments, instrument) => {
                    const originalInstrument = _instrumentsInitialState
                        .find(i => i.id === instrument.id)

                    if (!originalInstrument) return _newInstruments

                    const newInstrument = { id: instrument.id }
                    if (!deepEqual(instrument.sequences, originalInstrument.sequences)) {
                        newInstrument.sequences = instrument.sequences
                    }
                    if (!deepEqual(instrument.sounds, originalInstrument.sounds)) {
                        newInstrument.sounds = instrument.sounds
                            .reduce((newSounds, sound) => {
                                const originalSound = originalInstrument.sounds
                                    .find(s => s.id === sound.id)

                                if (!sound.amount) return newSounds
                                if (!originalSound) return [ ...newSounds, sound ]

                                const newSound = { id: sound.id }
                                if (sound.amount !== originalSound.amount) {
                                    newSound.amount = sound.amount
                                }

                                return [ ...newSounds, newSound]
                            }, [])
                    }
                    if (!isNil(instrument.fadeOutDuration) && instrument.fadeOutDuration !== originalInstrument.fadeOutDuration) {
                        newInstrument.fadeOutDuration = instrument.fadeOutDuration
                    }
                    if (!isNil(instrument.ringout) && instrument.ringout !== originalInstrument.ringout) {
                        newInstrument.ringout = instrument.ringout
                    }
                    if (!isNil(instrument.pitch) && instrument.pitch !== originalInstrument.pitch) {
                        newInstrument.pitch = instrument.pitch
                    }
                    if (!isNil(instrument.volume) && instrument.volume !== originalInstrument.volume) {
                        newInstrument.volume = instrument.volume
                    }
                    if (!isNil(instrument.repeatHitTypeForXBeat) && instrument.repeatHitTypeForXBeat !== originalInstrument.repeatHitTypeForXBeat) {
                        newInstrument.repeatHitTypeForXBeat = instrument.repeatHitTypeForXBeat
                    }

                    return [ ..._newInstruments, ...(Object.keys(newInstrument).length > 1 ? [newInstrument] : []) ]
                }, [])

            if (newInstruments.length) {
                settingsObj.instruments = newInstruments
            }
        }

        return {
            ...newPreset,
            ...(
                settingsObj && Object.keys(settingsObj).length
                    ? { settings: settingsObj }
                    : {}
            )
        }
    }

const createPreset = createPresetFactory({ configInitialState, instrumentsInitialState, sequencesInitialState })

const backwardsCompatibility = (preset, allowedLengths) => {
    if (preset.settings.beats && preset.settings.beats.length) {
        preset.settings.sequences = preset.settings.beats
    }

    if (preset.settings.sequences.find(seq => seq.id === 'groove')) {
        preset.settings.sequences = preset.settings.sequences
            .map((seq) => {
                if (seq.id === 'groove') {
                    seq.id = 'CUSTOM_SEQUENCE_1'
                    seq.hitChance = preset.settings.config.hitChance
                    seq.allowedLengths = getAllowedLengthsFromSequence(preset.settings.instruments.find(i => i.id === 'g').predefinedSequence, allowedLengths)
                }

                return seq
            })
    }
    return preset
}

//    getIndexOfPreset :: [preset] -> preset -> Maybe Integer
const getIndexOfPreset = curry((presets, preset) => compose(
    map(indexOf(__, presets)),
    Maybe,
)(preset))

//    getIndexOfPresetById :: [preset] -> presetId -> Maybe Integer
const getIndexOfPresetById = curry((presets, presetId) => compose(
    getIndexOfPreset(presets),
    pId => presets.find(p => p.id === pId),
)(presetId))

//    updatePresetsByIndex :: [preset] -> [preset] -> Maybe Integer -> [preset]
const updatePresetsByIndex = curry((presets, preset, index) => Maybe.maybe(
    presets.concat(preset),
    update(__, preset, presets),
    index
))

//    updatePresets :: [preset] -> preset -> presetId -> [preset]
const updatePresets = curry((presets, preset) => compose(
    updatePresetsByIndex(presets, preset),
    getIndexOfPresetById(presets),
)(preset.id))

export {
    backwardsCompatibility,
    createPresetFactory,
    createPreset,
    updatePresets
}

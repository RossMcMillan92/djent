import adtrBreakdown from './presets/adtr-breakdown'
import blackDahlia from './presets/black-dahlia'
import contortionist from './presets/contortionist'
import meshuggah from './presets/meshuggah'
import polyrhythms from './presets/polyrhythms'
import swornIn from './presets/sworn-in'
import thallBuster from './presets/thall-buster'
import thallBuster2 from './presets/thall-buster-2'
import thallTriplets from './presets/thall-triplets'

import { getAllowedLengthsFromSequence } from './sequences'
import { deepClone } from './tools'

const presets = [
    adtrBreakdown,
    blackDahlia,
    meshuggah,
    polyrhythms,
    contortionist,
    swornIn,
    thallBuster2,
    thallBuster,
    thallTriplets,
]

const createPreset = ({ id, instruments, sequences, bpm, usePredefinedSettings }) => ({
    id,
    settings: {
        config: {
            bpm,
        },
        sequences: deepClone(sequences),
        instruments: usePredefinedSettings
            ? instruments
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
            : instruments,
    }
})

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

export default presets

export {
    backwardsCompatibility,
    createPreset,
}

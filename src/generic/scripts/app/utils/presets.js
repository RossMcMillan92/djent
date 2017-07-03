import promiseToTask from 'modules/promiseToTask'

const presets = [
    {
        id: 'adtr',
        description: 'ADTR Breakdown',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.adtr-breakdown" */ './presets/adtr-breakdown'))
    },
    {
        id: 'black-dahlia',
        description: 'Blast Beats',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.black-dahlia" */ './presets/black-dahlia'))
    },
    {
        id: 'contortionist',
        description: 'Poly Chords & Melody',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.contortionist" */ './presets/contortionist'))
    },
    {
        id: 'meshuggah',
        description: 'Meshuggah',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.meshuggah" */ './presets/meshuggah'))
    },
    {
        id: 'polyrhythms',
        description: 'Polyrhythms',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.polyrhythms" */ './presets/polyrhythms'))
    },
    {
        id: 'sworn-in',
        description: 'Sworn In',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.sworn-in" */ './presets/sworn-in'))
    },
    {
        id: 'thall',
        description: 'Thall I',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.thall-buster-2" */ './presets/thall-buster-2'))
    },
    {
        id: 'thall-buster',
        description: 'Thall II',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.thall-buster" */ './presets/thall-buster'))
    },
    {
        id: 'thall-triplets',
        description: 'Thall III',
        load: promiseToTask(() => import(/* webpackChunkName: "presets.thall-triplets" */ './presets/thall-triplets'))
    },
]

const initialPreset = 'meshuggah'

import { getAllowedLengthsFromSequence } from './sequences'
import { deepClone } from './tools'

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
    initialPreset,
}

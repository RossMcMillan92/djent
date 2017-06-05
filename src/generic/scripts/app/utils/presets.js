import promiseToTask from 'modules/promiseToTask'
import { getAllowedLengthsFromSequence } from './sequences'

const presets = [
    {
        id: 'meshuggah',
        description: 'Meshuggah',
        group: 'Artists',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.meshuggah" */ './presets/meshuggah')
        )
    },
    {
        id: 'sworn-in',
        description: 'Sworn In',
        group: 'Artists',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.sworn-in" */ './presets/sworn-in')
        )
    },
    {
        id: 'thall-buster',
        description: 'Scratchy heavy',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall-buster" */ './presets/thall-buster')
        )
    },
    {
        id: 'thall-chicken',
        description: 'Scratchy groovy',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall-chicken" */ './presets/thall-chicken')
        )
    },
    {
        id: 'thall',
        description: 'Thall',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall" */ './presets/thall')
        )
    },
    {
        id: 'thall-triplets',
        description: 'Thall (triplets)',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall-triplets" */ './presets/thall-triplets')
        )
    },
    {
        id: 'black-dahlia',
        description: 'Blast Beats',
        group: 'Heavy',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.black-dahlia" */ './presets/black-dahlia')
        )
    },
    {
        id: 'adtr',
        description: 'Breakdown',
        group: 'Pop Punk',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.adtr-breakdown" */ './presets/adtr-breakdown')
        )
    },
    {
        id: 'contortionist',
        description: 'Poly Chords & Melody',
        group: 'Progressive',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.contortionist" */ './presets/contortionist')
        )
    },
    {
        id: 'polyrhythms',
        description: 'Polyrhythms',
        group: 'Progressive',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.polyrhythms" */ './presets/polyrhythms')
        )
    },
]

const initialPreset = 'thall-chicken'

const createPreset = ({ id, instruments, sequences, bpm, usePredefinedSettings }) => ({
    id,
    settings: {
        config: {
            bpm,
        },
        sequences,
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

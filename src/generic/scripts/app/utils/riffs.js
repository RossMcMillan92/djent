import {
    compose,
} from 'ramda'

import {
    loadInstrumentBuffers,
} from './audio'

import audioContext from './audioContext'

import {
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    renderAudioTemplateAtTempo,
    repeatHits,
    repeatSequence,
} from './instruments'

import {
    getSequence,
    getTotalBeatsLength,
} from './sequences'

//    addSoundMapsToInstrument :: Instrument -> Instrument
const addSoundMapsToInstrument = ({ instruments, totalBeatsProduct, usePredefinedSettings }) => {
    const createSoundMaps = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        newInstrument => repeatSequence(newInstrument, totalBeatsProduct),
        generateInstrumentHitTypes
    )(instrument, usePredefinedSettings)

    const instrumentsWithSoundMaps = instruments
        .map(createSoundMaps)

    return instrumentsWithSoundMaps
}

//    generateRiff :: audioSettings -> Task Error [Instrument]
const generateRiff = ({ context, totalBeatsProduct, instruments, usePredefinedSettings }) =>
    loadInstrumentBuffers(context, instruments)
        .map(newInstruments => addSoundMapsToInstrument({ instruments: newInstruments, totalBeatsProduct, usePredefinedSettings }))

//    generateNewRiff :: audioSettings -> Task Error [Instrument]
const generateNewRiff = ({ context, sequences, usePredefinedSettings, instruments, totalBeatsProduct }) => {
    const generatedSequences    = {}
    const getInstrumentSequence = getSequence({
        sequences,
        generatedSequences,
        usePredefinedSettings
    })
    const instrumentsWithSequences = instruments
        .map(getInstrumentSequence)
        .filter(i => i.sequence !== undefined)

    return generateRiff({
        context,
        totalBeatsProduct,
        instruments: instrumentsWithSequences,
        usePredefinedSettings
    })
}

let playlistItemCount = 0
//    createPlaylistItem :: (id, audioTemplate, instruments, sequences, bpm, isLocked) -> PlaylistItem
const createPlaylistItem = ({ id, title, audioTemplate, instruments, sequences, bpm, isLocked}) => {
    const key = `${id}-${playlistItemCount}`
    playlistItemCount += 1
    return {
        id,
        title: title || `Track ${id} - ${sequences[0].bars} × ${sequences[0].beats}`,
        isLocked,
        key,
        audioTemplate,
        instruments,
        sequences,
        bpm,
    }
}

//    generatePlaylistItem :: audioSettings -> Task Error PlaylistItem
const generatePlaylistItem = (genID, bpm, sequences, instruments, usePredefinedSettings) => {
    const generationState   = { bpm, sequences, instruments, usePredefinedSettings }
    const totalBeatsProduct = getTotalBeatsLength(sequences)

    return generateNewRiff({ ...generationState, totalBeatsProduct, context: audioContext })
        .map((newInstruments) => {
            const bpmMultiplier = 60 / bpm
            const audioTemplate = renderAudioTemplateAtTempo(newInstruments, bpmMultiplier)
            return createPlaylistItem({id: genID, audioTemplate, instruments: newInstruments, sequences, bpm, isLocked: false})
        })
}

//    presetToPlaylistItem :: { id, settings } -> Task Error PlaylistItem
const presetToPlaylistItem = ({ id, settings }) => {
    const { config, instruments, sequences } = settings
    const usePredefinedSettings = true
    return generatePlaylistItem(id, config.bpm, sequences, instruments, usePredefinedSettings)
}

//    getGenerationID :: (currentCount, playlist) -> Integer
const getGenerationID = (currentCount, playlist) =>
    playlist.find(pi => `${pi.id}` === `${currentCount}`)
        ? getGenerationID(currentCount + 1, playlist)
        : currentCount

export {
    createPlaylistItem,
    generatePlaylistItem,
    getGenerationID,
    presetToPlaylistItem,
}

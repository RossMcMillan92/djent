import {
    loadInstrumentBuffers,
} from './audio';

import audioContext from './audioContext';

import {
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    renderAudioTemplateAtTempo,
    repeatHits,
    repeatSequence,
} from './instruments';

import {
    getSequence,
    getTotalBeatsLength,
} from './sequences';

import {
    compose,
    logError,
} from './tools';

const generateRiff = ({ context, totalBeatsProduct, instruments, usePredefinedSettings }) =>
    loadInstrumentBuffers(context, instruments)
        .then(newInstruments => initiateInstruments({ instruments: newInstruments, totalBeatsProduct, usePredefinedSettings }))
        .catch(logError);

const initiateInstruments = ({ instruments, totalBeatsProduct, usePredefinedSettings }) => {
    const createSoundMaps = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        newInstrument => repeatSequence(newInstrument, totalBeatsProduct),
        generateInstrumentHitTypes
    )(instrument, usePredefinedSettings);

    const instrumentsWithSoundMaps = instruments
        .map(createSoundMaps);

    return instrumentsWithSoundMaps;
};

const generateNewRiff = ({ context, sequences, usePredefinedSettings, instruments, totalBeatsProduct }) => {
    const generatedSequences    = {};
    const getInstrumentSequence = getSequence({
        sequences,
        generatedSequences,
        usePredefinedSettings
    });
    const instrumentsWithSequences = instruments
        .map(getInstrumentSequence)
        .filter(i => i.sequence !== undefined);

    return generateRiff({
        context,
        totalBeatsProduct,
        instruments: instrumentsWithSequences,
        usePredefinedSettings
    });
};

const generatePlaylistItem = (genID, bpm, sequences, instruments, usePredefinedSettings) => {
    const generationState   = { bpm, sequences, instruments, usePredefinedSettings };
    const totalBeatsProduct = getTotalBeatsLength(sequences);

    let newInstruments;
    return generateNewRiff({ ...generationState, totalBeatsProduct, context: audioContext })
        .then((instrumentss) => {
            newInstruments = instrumentss;
            const bpmMultiplier = 60 / bpm;
            return renderAudioTemplateAtTempo(instrumentss, bpmMultiplier);
        })
        .then((audioTemplate) => createPlaylistItem(genID, audioTemplate, newInstruments, sequences, bpm));
};

let playlistItemCount = 0;
const createPlaylistItem = (genID, audioTemplate, instruments, sequences, bpm) => {
    console.log('INSTRUMENTS, SEQUENCES', instruments, sequences)
    const key = `${genID}-${playlistItemCount}`;
    console.log('PLAYLISTITEMCOUNT', playlistItemCount)
    playlistItemCount = playlistItemCount + 1;
    return {
        id: genID,
        key,
        audioTemplate,
        instruments,
        sequences,
        bpm,
    };
};

const getGenerationID = (currentCount, playlist) =>
    playlist.find(pi => `${pi.id}` === `${currentCount}`)
        ? getGenerationID(currentCount + 1, playlist)
        : currentCount;

export {
    createPlaylistItem,
    generateRiff,
    generatePlaylistItem,
    getGenerationID,
};

import {
    loadInstrumentBuffers,
} from './audio';

import {
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    repeatHits,
    repeatSequence,
} from './instruments';

import {
    compose,
    logError
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

export {
    generateRiff,
};

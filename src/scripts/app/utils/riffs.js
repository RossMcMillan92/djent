import {
    loadInstrumentBuffers,
} from './audio';

import {
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    getInstrumentsSequences,
    repeatHits,
    repeatSequence,
    renderBufferTemplateAtTempo,
    renderInstrumentSoundsAtTempo,
} from './instruments';

import {
    compose,
} from './tools';

const generateRiff = ({ context, totalBeatsProduct, instruments, usePredefinedSettings }) => {
    return loadInstrumentBuffers(context, instruments)
        .then((instruments) => initiateInstruments({ instruments, totalBeatsProduct, usePredefinedSettings }))
        .then((instruments) => {
            return Promise.resolve(instruments)
        })
        .catch(e => { (console.error || console.log).call(console, e); });
}

const initiateInstruments = ({ instruments, totalBeatsProduct, usePredefinedSettings }) => {
    const createSoundMaps = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        instrument => repeatSequence(instrument, totalBeatsProduct),
        generateInstrumentHitTypes
    )(instrument, usePredefinedSettings);

    const instrumentsWithSoundMaps = instruments
        .map(createSoundMaps);

    return Promise.resolve(instrumentsWithSoundMaps)
}

export {
    generateRiff,
}

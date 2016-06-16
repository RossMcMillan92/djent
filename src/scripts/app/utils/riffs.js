import {
    loadInstrumentBuffers,
} from './audio';

import {
    generateInstrumentTimeMap,
    generateInstrumentHitTypes,
    getInstrumentsSequences,
    repeatHits,
    repeatSequence,
    renderInstrumentSoundsAtTempo
} from './instruments';

import {
    compose,
} from './tools';

const generateRiff = ({ bpm, totalBeatsProduct, allowedLengths, sequences, instruments }) => {
    console.log('INSTRUMENTS', instruments)
    const bpmMultiplier  = 60 / bpm;
    const context        = new AudioContext();
    const instrumentPack = getInstrumentsSequences(instruments, sequences, totalBeatsProduct);

    return loadInstrumentBuffers(context, instrumentPack)
        .then((instrumentPack) => initiateInstruments(context, instrumentPack, totalBeatsProduct, bpmMultiplier))
        .then(({ buffer, instruments }) => {
            context.close();
            return Promise.resolve({ buffer, instruments })
        })
        .catch(e => { (console.error || console.log).call(console, e); });
}

const initiateInstruments = (context, instrumentPack, totalBeatsProduct, bpmMultiplier) => {
    const createSoundMaps = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        instrument => repeatSequence(instrument, totalBeatsProduct),
        generateInstrumentHitTypes
    )(instrument);

    const instruments = instrumentPack
        .map(createSoundMaps);

        console.log('INSTRUMENTS', instruments)
    return renderInstrumentSoundsAtTempo(instruments, totalBeatsProduct, bpmMultiplier)
        .then(buffer => Promise.resolve({ buffer, instruments }));
}

export {
    generateRiff,
}

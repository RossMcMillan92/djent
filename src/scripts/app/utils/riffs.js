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

const generateRiff = ({ bpm, totalBeatsProduct, instruments, usePredefinedSettings }) => {
    const bpmMultiplier  = 60 / bpm;
    const context        = new AudioContext();

    return loadInstrumentBuffers(context, instruments)
        .then((instruments) => initiateInstruments({ context, instruments, totalBeatsProduct, bpmMultiplier, usePredefinedSettings }))
        .then(({ buffer, instruments }) => {
            if (context.close) context.close();
            return Promise.resolve({ buffer, instruments })
        })
        .catch(e => { (console.error || console.log).call(console, e); });
}

const initiateInstruments = ({ context, instruments, totalBeatsProduct, bpmMultiplier, usePredefinedSettings }) => {
    const createSoundMaps = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        instrument => repeatSequence(instrument, totalBeatsProduct),
        generateInstrumentHitTypes
    )(instrument, usePredefinedSettings);

    const instrumentsWithSoundMaps = instruments
        .map(createSoundMaps);

    return renderInstrumentSoundsAtTempo(instrumentsWithSoundMaps, totalBeatsProduct, bpmMultiplier)
        .then(buffer => Promise.resolve({ buffer, instruments: instrumentsWithSoundMaps }));
}

export {
    generateRiff,
}

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

const generateRiff = ({ bpm, totalBeats, grooveBeats, allowedLengths, sequences, instruments }) => {
    const bpmMultiplier  = 60 / bpm;
    const context        = new AudioContext();
    const instrumentPack = getInstrumentsSequences(instruments, sequences, totalBeats);

    return loadInstrumentBuffers(context, instrumentPack)
        .then((instrumentPack) => initiateInstruments(context, instrumentPack, totalBeats, bpmMultiplier))
        .then(buffer => {
            context.close();
            return buffer
        })
        .catch(e => { console.log(e); console.trace() });
}

const initiateInstruments = (context, instrumentPack, totalBeats, bpmMultiplier) => {
    const createSoundMaps = instrument => compose(
        generateInstrumentTimeMap,
        repeatHits,
        instrument => repeatSequence(instrument, totalBeats),
        generateInstrumentHitTypes
    )(instrument);

    const instruments = instrumentPack
        .map(createSoundMaps);

    return renderInstrumentSoundsAtTempo(instruments, totalBeats, bpmMultiplier);
}

export {
    generateRiff,
}

import { compose, curry, filter, prop, map } from 'ramda';
import { Future } from 'ramda-fantasy';
import { catchError, fork, logError } from '../utils/tools';

const bufferCache = {};

// getBuffer :: url -> Future Error Buffer
const getBuffer = curry((context, url) =>
    Future((rej, res) => {
        if (bufferCache[url]) return res(bufferCache[url]);

        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = () =>
            context.decodeAudioData(
                request.response,
                (buffer) => {
                    if (!buffer) {
                        rej(Error(`Error decoding file data: ${url}`));
                        return;
                    }
                    bufferCache[url] = buffer;
                    res(buffer);
                },
                rej
            );
        request.onerror = rej;
        request.send();
    }));

// filterInstrumentsWithSounds :: [Instrument] -> [Instrument]
const filterInstrumentsWithSounds = instrument =>
    instrument.sounds.filter(sound => sound.enabled).length;

// getBufferPromise :: Instrument -> Promise Error [Instrument]
const getBufferPromise = curry((context, instrument) => {
    const newInstrument = { ...instrument };
    const enabledSounds = newInstrument.sounds
        .filter(sound => sound.enabled);
    newInstrument.buffers = {};

    return new Promise((res, rej) => {
        let bufferCount = 0;
        enabledSounds.forEach((sound, i, sounds) => {
            compose(
                fork(rej, (buffer) => {
                    newInstrument.buffers[sound.id] = buffer;
                    bufferCount++;
                    if (bufferCount === sounds.length) {
                        res(newInstrument);
                    }
                }),
                getBuffer(context),
                prop('path'),
            )(sound);
        });
    });
});

// loadInstrumentBuffers :: context -> [Instrument] -> Promise Error [Instruments]
const loadInstrumentBuffers = (context, instruments) =>
    compose(
        catchError(logError),
        ps => Promise.all(ps),
        map(getBufferPromise(context)),
        filter(filterInstrumentsWithSounds),
    )(instruments);

// getPitchPlaybackRatio :: Integer -> Integer
const getPitchPlaybackRatio = (pitchAmount) => {
    const pitchIsPositive = pitchAmount > 0;
    const negAmount = pitchIsPositive ? pitchAmount * -1 : pitchAmount;
    const val = 1 / Math.abs((negAmount / 1200) - 1);

    return pitchIsPositive ? 1 / val : val;
};

const playSound = (context, buffer, time, duration, volume, pitchAmount = 0, fadeInDuration = 0, fadeOutDuration = 0) => {
    if (!buffer) return;

    const source = context.createBufferSource();
    const gainNode = context.createGain();
    const durationMultiplier = getPitchPlaybackRatio(pitchAmount);

    source.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.value = volume;

    source.playbackRate.value = durationMultiplier;
    source.buffer = buffer;

    if (volume && fadeInDuration) {
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(volume, time + fadeInDuration);
    }

    if (volume && fadeOutDuration) {
        gainNode.gain.setValueAtTime(volume, time + duration);
        gainNode.gain.linearRampToValueAtTime(0, time + duration + fadeOutDuration);
    }

    source.start(time, 0, (duration + fadeOutDuration) * durationMultiplier);

    return source;
};

export {
    loadInstrumentBuffers,
    playSound,
};

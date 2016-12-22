import { chain, compose, curry, filter, prop, map, traverse } from 'ramda';
import { Future } from 'ramda-fantasy';
import { catchError, fork, logError } from 'utils/tools';

import {
    getTotalTimeLength,
} from './sequences';

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


//    getBufferFromAudioTemplate :: audioTemplate -> timeLength -> Future audioBuffer
const getBufferFromAudioTemplate = (audioTemplate, timeLength) => {
    const offlineCtx = new OfflineAudioContext(2, 44100 * timeLength, 44100);

    audioTemplate.forEach(({
        buffer,
        startTime,
        duration,
        volume,
        pitchAmount,
        fadeInDuration,
        fadeOutDuration,
    }) => {
        playSound(offlineCtx, buffer, startTime, duration, volume, pitchAmount, fadeInDuration, fadeOutDuration);
    });

    return Future((rej, res) => {
        offlineCtx.oncomplete = ev => res(ev.renderedBuffer);
        offlineCtx.onerror    = ev => rej(ev.renderedBuffer);
        offlineCtx.startRendering();
    });
};

//    renderBuffer :: {sequences, bpm, audioTemplate} -> Future audioBuffer
const renderBuffer = ({ sequences, bpm, audioTemplate }) => {
    const duration = getTotalTimeLength(sequences, bpm);
    return getBufferFromAudioTemplate(audioTemplate, duration);
};

//    audioPlaylistItemToRenderable :: audioPlaylistItem -> renderable
const audioPlaylistItemToRenderable = ({ sequences, bpm, audioTemplate }) => ({ sequences, bpm, audioTemplate });

//    combineAudioBuffers :: [audioBuffer] -> Task audioBuffer
const combineAudioBuffers = audioBuffers => {
    let totalDuration = 0;
    const audioTemplate = audioBuffers.map(buffer => {
        const startTime = totalDuration;
        const duration = buffer.duration;

        totalDuration = totalDuration + duration;
        return {
            buffer,
            startTime,
            duration,
            volume: 1,
        };
    });
    return getBufferFromAudioTemplate(audioTemplate, totalDuration);
};

//    renderAudioPlaylistToBuffer :: [audioPlaylistItem] -> Future [audioBuffer]
const renderAudioPlaylistItemToBuffer = compose(
    chain(combineAudioBuffers),
    traverse(Future.of, renderBuffer),
    map(audioPlaylistItemToRenderable),
);

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
    audioPlaylistItemToRenderable,
    combineAudioBuffers,
    getBufferFromAudioTemplate,
    loadInstrumentBuffers,
    playSound,
    renderAudioPlaylistItemToBuffer,
    renderBuffer,
};

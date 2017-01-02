import { chain, compose, curry, filter,  map, traverse } from 'ramda';
import { Future as Task } from 'ramda-fantasy';

import {
    getTotalTimeLength,
} from 'utils/sequences';

const bufferCache = {};

//    getBufferFromURL :: context -> url -> Task Error Buffer
const getBufferFromURL = (context, url) =>
    Task((rej, res) => {
        if (bufferCache[url]) return res(bufferCache[url]);
        const onError = () => rej(Error(`Error decoding file data: ${url}`));
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = () =>
            context.decodeAudioData(
                request.response,
                (buffer) => {
                    if (!buffer) {
                        onError();
                        return;
                    }
                    bufferCache[url] = buffer;
                    res(buffer);
                },
                onError
            );
        request.onerror = onError;
        request.send();
    });

//    filterInstrumentsWithSounds :: [Instrument] -> [Instrument]
const filterInstrumentsWithSounds = instrument =>
    instrument.sounds.filter(sound => sound.enabled).length;

//    getBufferFromInstrument :: audioContext -> Instrument -> Task Error [Instrument]
const getBufferFromInstrument = curry((context, instrument) => {
    const newInstrument = { ...instrument };
    const enabledSounds = newInstrument.sounds
        .filter(sound => sound.enabled);
    newInstrument.buffers = {};

    return Task((rej, res) => {
        const onComplete = (buffer, sound, sounds) => {
            newInstrument.buffers[sound.id] = buffer;
            bufferCount++;
            if (bufferCount === sounds.length) {
                res(newInstrument);
            }
        };
        let bufferCount = 0;
        enabledSounds.forEach((sound, i, sounds) =>
            getBufferFromURL(context, sound.path)
                .fork(rej, buffer => onComplete(buffer, sound, sounds)));
    });
});

//    loadInstrumentBuffers :: context -> [Instrument] -> Task Error [Instrument]
const loadInstrumentBuffers = (context, instruments) =>
    compose(
        traverse(Task.of, getBufferFromInstrument(context)),
        filter(filterInstrumentsWithSounds),
    )(instruments);


//    getBufferFromAudioTemplate :: audioTemplate -> timeLength -> Task audioBuffer
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

    return Task((rej, res) => {
        offlineCtx.oncomplete = ev => res(ev.renderedBuffer);
        offlineCtx.onerror    = () => rej(Error('Failed rendering buffer'));
        offlineCtx.startRendering();
    });
};

//    renderBuffer :: {sequences, bpm, audioTemplate} -> Task audioBuffer
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

//    renderAudioPlaylistToBuffer :: [audioPlaylistItem] -> Task [audioBuffer]
const renderAudioPlaylistItemToBuffer = compose(
    chain(combineAudioBuffers),
    traverse(Task.of, renderBuffer),
    map(audioPlaylistItemToRenderable),
);

//    getPitchPlaybackRatio :: Integer -> Integer
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

// cache
const bufferCache = {};

const BufferLoader = (context) => {
    let newInstrumentPack = [];

    const loadBuffer = (instrument, index) => {
        const newInstrument = Object.assign({}, instrument);
        const enabledSounds = newInstrument.sounds.filter(sound => sound.enabled);
        const bufferAmount = enabledSounds.length;
        let bufferCount = 0;
        newInstrument.buffers = {};

        const loadingSound = new Promise((res, rej) => {
            enabledSounds.forEach((sound, i) => {
                const url = sound.path;
                if (bufferCache[url]) {
                    newInstrument.buffers[sound.id] = bufferCache[url];
                    newInstrumentPack[index] = newInstrument;
                    bufferCount++;
                    if(bufferCount === bufferAmount) {
                        res();
                    }
                    return;
                };

                // Load buffer asynchronously
                const request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";

                request.onload = () => {
                    // Asynchronously decode the audio file data in request.response
                    context.decodeAudioData(
                        request.response,
                        (buffer) => {
                            if (!buffer) {
                                alert('error decoding file data: ' + url);
                                return;
                            }
                            newInstrument.buffers[sound.id] = buffer;
                            bufferCache[url] = buffer;
                            newInstrumentPack[index] = newInstrument;
                            bufferCount++;
                            if(bufferCount === bufferAmount) {
                                res();
                            }
                        },
                        (error) => {
                            rej(error);
                        }
                    );
                }

                request.onerror = (error) => {
                    rej(error);
                    alert('BufferLoader: XHR error');
                }

                request.send();
            })

        });

        return loadingSound;

    }

    const load = (instruments) => {
        const loadingSounds = instruments
            .filter(instrument => instrument.sounds.filter(sound => sound.enabled).length)
            .map(loadBuffer)

        return Promise.all(loadingSounds)
                .then(() => newInstrumentPack)
                .catch(e => (console.error || console.log).call(console, e))
    }

    return {
        load
    }
}


const loadInstrumentBuffers = (context, instruments) => {
    return BufferLoader(context)
        .load(instruments);
}

const renderSoundsToBuffer = (buffers) => {
    const offlineCtx = new OfflineAudioContext(2,44100*40,44100);

    buffers.forEach(buffer => playSound());

    return newBuffer;
}

const playSound = (context, buffer, time, duration, volume) => {
    if (!buffer) return;

    const source = context.createBufferSource();
    const gainNode = context.createGain();

    source.connect(gainNode);

    gainNode.connect(context.destination);
    gainNode.gain.value = volume;

    source.buffer = buffer;
    source.start(time, 0, duration);

    return source;
}

export {
    loadInstrumentBuffers,
    renderSoundsToBuffer,
    playSound
}

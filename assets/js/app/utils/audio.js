const BufferLoader = (context) => {
    let newInstrumentPack = [];

    const loadBuffer = function(instrument, index) {
        const bufferAmount = instrument.sounds.length;
        let bufferCount = 0;
        instrument.buffers = [];

        const loadingSound = new Promise((res, rej) => {

            instrument.sounds.map((sound, i) => {
                if (!sound.enabled) return res();
                const url = sound.path;
                // Load buffer asynchronously
                const request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";

                request.onload = function() {
                    // Asynchronously decode the audio file data in request.response
                    context.decodeAudioData(
                        request.response,
                        function(buffer) {
                            if (!buffer) {
                                alert('error decoding file data: ' + url);
                                return;
                            }
                            instrument.buffers[i] = buffer;
                            newInstrumentPack[index] = instrument;
                            bufferCount++;
                            if(bufferCount === bufferAmount) {
                                res();
                            }
                        },
                        function(error) {
                            rej(error);
                            console.error('decodeAudioData error', error);
                        }
                    );
                }

                request.onerror = function() {
                    alert('BufferLoader: XHR error');
                }

                request.send();
            })

        });

        return loadingSound;

    }

    const load = function(instrumentPack) {
        const loadingSounds = instrumentPack.map(loadBuffer)

        return new Promise((res, rej) => {
            Promise.all(loadingSounds)
                .then(() => res(newInstrumentPack))
                .catch(rej)
        })
    }

    return {
        load
    }
}


const loadInstrumentBuffers = (context, instrumentPack) => {
    return BufferLoader(context)
        .load(instrumentPack);
}

const renderSoundsToBuffer = (buffers) => {
    const offlineCtx = new OfflineAudioContext(2,44100*40,44100);

    buffers.forEach(buffer => playSound());

    return newBuffer;
}

const playSound = (context, buffer, time, duration, volume, detune = 0) => {
    if (!buffer) return;

    const source = context.createBufferSource();
    const gainNode = context.createGain();

    source.connect(gainNode);

    gainNode.connect(context.destination);
    gainNode.gain.value = volume;

    source.buffer = buffer;
    source.start(time, 0, duration);

    source.detune.value = detune;

    return source;
}

export {
    loadInstrumentBuffers,
    renderSoundsToBuffer,
    playSound
}

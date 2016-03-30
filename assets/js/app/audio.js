

const BufferLoader = (context) => {
    let newInstrumentPack = new Array();

    const loadBuffer = function(instrument, index) {
        const bufferAmount = instrument.paths.length;
        let bufferCount = 0;
        instrument.buffers = [];

        const loadingSound = new Promise((res, rej) => {

            instrument.paths.map((url, i) => {
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
                            rej();
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

const playSound = (context, buffer, time, duration, volume) => {
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
    playSound
}

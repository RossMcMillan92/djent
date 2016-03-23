window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

const BufferLoader = (context, callback) => {
    let newInstrumentPack = new Array();
    let loadCount = 0;

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


const createBufferList = (instrumentPack, cb) => {
    return BufferLoader(context, cb)
        .load(instrumentPack);
}

const playSound = (buffer, time, duration) => {
  const source = context.createBufferSource();

  source.buffer = buffer;
  source.connect(context.destination);

  source.start(context.currentTime + time, 0, duration);
}

export {
    createBufferList,
    playSound
}

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

const BufferLoader = (context, urlList, callback) => {
    const onload = callback;
    const bufferList = new Array();
    let loadCount = 0;

    const loadBuffer = function(url, index) {
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
                    bufferList[index] = buffer;
                    if (++loadCount == urlList.length) {
                        onload(bufferList);
                    }
                },
                function(error) {
                    console.error('decodeAudioData error', error);
                }
            );
        }

        request.onerror = function() {
            alert('BufferLoader: XHR error');
        }

        request.send();
    }

    const load = function() {
        for (let i = 0; i < urlList.length; ++i) {
            loadBuffer(urlList[i], i);
        }
    }

    return {
        load
    }
}


const createBufferList = (paths, cb) => {
    const bufferLoader = BufferLoader(context, paths, cb)
        .load();
}

const playSound = (buffer, time, duration) => {
  const source = context.createBufferSource();

  source.buffer = buffer;
  source.connect(context.destination);

  source.start(context.currentTime + time, 0, 1 / duration.beat);
}

export {
    createBufferList,
    playSound
}

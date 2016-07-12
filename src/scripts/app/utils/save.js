import audioBufferToWav from 'audiobuffer-to-wav';

const saveAsWAVFile = (() => {
    const a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);

    return (audioBuffer) => {
        const wav = audioBufferToWav(audioBuffer);
        const blob = new window.Blob([ new DataView(wav) ], {
          type: 'audio/wav'
        })
        const url = window.URL.createObjectURL(blob)

        a.href = url
        a.download = 'djen.wav'
        a.click();

        window.URL.revokeObjectURL(url);
    };
})();

const saveAsMIDIFile = (() => {
    const a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);

    return (url) => {
        a.href = url;
        a.download = 'djen.mid';
        a.click();
    };
})();

export {
    saveAsMIDIFile,
    saveAsWAVFile,
}

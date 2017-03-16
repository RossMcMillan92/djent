import audioBufferToWav from 'audiobuffer-to-wav'
import { curry } from 'ramda'

const downloadAudioBuffer = (a, fileName, audioBuffer) => {
    const wav = audioBufferToWav(audioBuffer)
    const blob = new window.Blob([ new DataView(wav) ], {
        type: 'audio/wav'
    })
    const url = window.URL.createObjectURL(blob)

    downloadURL(a, fileName, url)

    setTimeout(() => {
        console.log('release url')
        window.URL.revokeObjectURL(url)
    }, 0)
}

const downloadURL = curry((a, fileName, url) => {
    a.href = url
    a.download = fileName
    a.click()
    a.parentNode.removeChild(a)
})

const downloadFile = {
    wav: downloadAudioBuffer,
    mid: downloadURL,
}

const saveAsFile = curry((fileType, fileName, fileContents) => {
    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)
    const downloadFn = downloadFile[fileType]
    downloadFn(a, `${fileName}.${fileType}`, fileContents)
})

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log('FileTransfer', FileTransfer);
}

export {
    saveAsFile,
}

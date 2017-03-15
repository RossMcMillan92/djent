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
        window.URL.revokeObjectURL(url)
    }, 0)
}

const downloadURL = curry((a, fileName, url) => {
    saveyDavey(url)
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

const saveyDavey = (file) => {
    var savedFile;

    window.resolveLocalFileSystemURL( cordova.file.cacheDirectory, function( dir ) {

        dir.getFile( data.FileName, { create:true }, function( file_ ) {

            savedFile = file_;
            saveFile();

        });
    });

    function saveFile(str) {
        if( !savedFile ) return;

        savedFile.createWriter(function(fileWriter) {

            fileWriter.write( file );
            cordova.plugins.disusered.open( savedFile.nativeURL );
            console.log( "file " + savedFile.nativeURL + " opened" );

        }, function( e ){
            throw( 'createWriter Error error' + JSON.stringify( e ) );
        });
    }
}

export {
    saveAsFile,
}

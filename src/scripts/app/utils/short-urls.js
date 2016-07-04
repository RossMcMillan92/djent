import { compress, decompress } from 'lzutf8';
import { getHashQueryParam, loadScript } from './tools';

const googleAPIKey = 'AIzaSyCUN26hzVNf0P_ED_oALvsVx3ffmyzliOI';

const handleGoogleAPI = () => {
    return new Promise((res, rej) => {
        loadScript('https://apis.google.com/js/client.js?onload=handleClientLoad');

        let attempts = 0;
        const handleClientLoad = () => {
            if (!window.gapi) {
                attempts++;
                if (attempts === 3) rej();
                return setTimeout(handleClientLoad, 1000)
            };

            window.gapi.client.setApiKey(googleAPIKey);
            window.gapi.client.load('urlshortener', 'v1')
                .then(res);
        }
        window.handleClientLoad = handleClientLoad
    })
}

const getPresetData = (shareID) => {
    if (!window.gapi) return Promise.reject();
    return window.gapi.client.urlshortener.url
        .get({
          'shortUrl': `http://goo.gl/${shareID}`
        })
        .then((response) => {
            return getHashQueryParam('share', response.result.longUrl)
        }, (reason) => {
            (console.error || console.log).call(console, reason)
        })
}

const getPresetFromData = (data) => {
    if (!data) return;

    const decompressedData = data
                          && data.length % 4 === 0
                          && decompress(data, {inputEncoding: 'Base64'});
    const preset = /[A-Za-z0-9+/=]/.test(decompressedData) ? JSON.parse(decompressedData) : undefined;

    return preset;

}

export {
    getPresetData,
    getPresetFromData,
    handleGoogleAPI,
}

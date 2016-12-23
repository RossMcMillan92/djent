import { decompress } from 'lzutf8';
import { Future as Task } from 'ramda-fantasy';
import { logError, loadScript } from './tools';

const googleAPIKey = 'AIzaSyCUN26hzVNf0P_ED_oALvsVx3ffmyzliOI';

const handleGoogleAPI = () =>
    new Promise((res, rej) => {
        loadScript('https://apis.google.com/js/client.js?onload=handleClientLoad');

        let attempts = 0;
        const handleClientLoad = () => {
            if (!window.gapi) {
                attempts++;
                if (attempts === 3) rej();
                return setTimeout(handleClientLoad, 1000);
            }

            window.gapi.client.setApiKey(googleAPIKey);
            window.gapi.client.load('urlshortener', 'v1')
                .then(res);
        };
        window.handleClientLoad = handleClientLoad;
    });

//    getLongURLFromShareID :: shareID -> Task Error LongURL
const getLongURLFromShareID = (shareID) =>
    Task((rej, res) => {
        if (!window.gapi) return rej(Error(`Google URL Shortener API Failed: ${shareID}`));
        return window.gapi.client.urlshortener.url
            .get({
              shortUrl: `http://goo.gl/${shareID}`
            })
            .then((response) => res(response.result.longUrl), logError);
    });


const getPresetFromData = (data) => {
    if (!data) return;

    const decompressedData = data
                          && data.length % 4 === 0
                          && decompress(data, { inputEncoding: 'Base64' });

    const preset = /[A-Za-z0-9+/=]/.test(decompressedData) ? JSON.parse(decompressedData) : undefined;
    return preset;
};

export {
    getLongURLFromShareID,
    getPresetFromData,
    handleGoogleAPI,
};

import { Future as Task } from 'ramda-fantasy'
import { logError, loadScript } from './tools'

const googleAPIKey = 'AIzaSyCUN26hzVNf0P_ED_oALvsVx3ffmyzliOI'
// const pgAPIKey = 'AIzaSyAi4tg_orXCkGP-tU7nzfZv7JkbArnv4Rw'

const handleGoogleAPI = () =>
    Task((rej, res) => {
        loadScript('https://apis.google.com/js/client.js?onload=handleClientLoad')

        let attempts = 0
        const handleClientLoad = () => {
            if (!window.gapi) {
                attempts += 1
                if (attempts === 3) rej(Error('Trouble loading the Google API'))
                return setTimeout(handleClientLoad, 1000)
            }

            window.gapi.client.setApiKey(googleAPIKey)
            window.gapi.client.load('urlshortener', 'v1')
                .then(res)
        }
        window.handleClientLoad = handleClientLoad
    })

const shortURLCache = {}

//    getGoogleShortURL :: url -> Task Error url
const getGoogleShortURL = url =>
    Task((rej, res) => {
        if (shortURLCache[url]) return res(shortURLCache[url])

        const onError = e => rej(Error(`Problem getting short URL: ${e.result.error.message} - ${url}`))
        window.gapi.client.urlshortener.url
            .insert({ longUrl: url })
            .then(({ result }) => {
                const shortURL = result.id
                shortURLCache[url] = shortURL
                res(shortURL)
            }, onError)
    })

//    getLongURLFromShareID :: shareID -> Task Error LongURL
const getLongURLFromShareID = shareID =>
    Task((rej, res) => {
        if (!window.gapi) return rej(Error(`Google URL Shortener API Failed: ${shareID}`))
        return window.gapi.client.urlshortener.url
            .get({
              shortUrl: `http://goo.gl/${shareID}`
            })
            .then(response => res(response.result.longUrl), logError)
    })


//    getPresetFromData :: base64Data -> Task Preset
const getPresetFromData = base64Data =>
    Task((rej, res) => {
        require.ensure('lzutf8', (require) => {
            const decompress = require('lzutf8').decompress
            if (!base64Data) rej(Error('No base64 data given'))

            const decompressedData = base64Data
                                  && base64Data.length % 4 === 0
                                  && decompress(base64Data, { inputEncoding: 'Base64' })

            const preset = /[A-Za-z0-9+/=]/.test(decompressedData) ? JSON.parse(decompressedData) : undefined
            res(preset)
        }, 'lzutf8')
    })

export {
    getGoogleShortURL,
    getLongURLFromShareID,
    getPresetFromData,
    handleGoogleAPI,
}

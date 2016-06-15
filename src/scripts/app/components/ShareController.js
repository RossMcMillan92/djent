import React, { Component } from 'react';
import { compress, decompress } from 'lzutf8';
import { loadScript } from '../utils/tools';

const clientId = 'djenerator-1343';
const apiKey = 'AIzaSyCUN26hzVNf0P_ED_oALvsVx3ffmyzliOI';
const scopes = 'https://www.googleapis.com/auth/urlshortener';

class ShareController extends Component {
    state = {
        isEnabled: false,
        shortURL: ''
    }

    componentWillMount = () => {
        loadScript('https://apis.google.com/js/client.js?onload=handleClientLoad')
        const handleClientLoad = () => {
            gapi.client.setApiKey(apiKey);
            gapi.client.load('urlshortener', 'v1')
                .then(() => this.setState({ isEnabled: true }) );
        }
        window.handleClientLoad = handleClientLoad
    }

    onClick = e => {
        const compressedPreset = compress(JSON.stringify(this.props.customPreset), {outputEncoding: "Base64" });
        const shareableURL = `${window.location.href.split('#')[0]}#preset=${compressedPreset}`;
        console.log('SHAREABLEURL', shareableURL)

        this.getShortURL(shareableURL)
            .then((url) => this.setState({ shortURL: url }));
    }

    getShortURL = url => {
        return gapi.client.urlshortener.url.insert({ 'longUrl': url })
            .then((response) => {
                return response.result.id
            }, (reason) => {
                console.log('Error: ' + reason.result.error.message);
            })
    }

    render = () => {
        return (
            <div className="">
            { this.state.shortURL }
                <button className="button-primary" onClick={this.onClick} disabled={!this.state.isEnabled}>Share Riff</button>
            </div>
        );
    }
}

export default ShareController;

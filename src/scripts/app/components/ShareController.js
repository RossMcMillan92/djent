import React, { Component } from 'react';
import { compress, decompress } from 'lzutf8';
import { deepCloneObject } from '../utils/tools';

class ShareController extends Component {
    state = {
        isEnabled: false,
        shortURL: ''
    }

    generatePreset = () => {
        console.log('THIS.PROPS.ACTIVEPRESETID', this.props)
        const preset = {
            id: this.props.activePresetID,
            settings: {
                config: {
                    bpm            : this.props.bpm,
                    hitChance      : this.props.hitChance,
                },
                beats: this.props.beats.map(beat => deepCloneObject(beat)),
                instruments: this.props.instruments
                    .map(instrument => {
                        return {
                            id: instrument.id,
                            predefinedHitTypes: instrument.hitTypes,
                            predefinedSequence: instrument.sequence,
                        }
                    }),
            }
        };

        this.getShareableURL(preset)
            .then((url) => {
                const shareableURL = `${window.location.href.split('#')[0]}#share/${url.split('/').pop()}`;
                this.setState({ shortURL: shareableURL })
            });
    }

    onClick = e => {
        this.generatePreset();
    }

    getShareableURL = (preset) => {
        const compressedPreset = compress(JSON.stringify(preset), {outputEncoding: "Base64" });
        const shareableURL = `${window.location.href.split('#')[0]}#share=${compressedPreset}`;
        console.log('SHAREABLEURL', shareableURL)

        if (shareableURL.length > 3000) alert('No can do');

        return this.getShortURL(shareableURL)
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
                <button className="button-primary" onClick={this.onClick} disabled={!this.props.googleAPIHasLoaded}>Share Riff</button>
            </div>
        );
    }
}

export default ShareController;

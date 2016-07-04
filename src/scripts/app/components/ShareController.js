import React, { Component } from 'react';
import { compress, decompress } from 'lzutf8';
import { deepClone } from '../utils/tools';

import ShareBox from './ShareBox.js';

const domain = `${window.location.protocol}//${window.location.host}`;

class ShareController extends Component {
    state = {
        isEnabled: false,
        isLoading: false,
        shortURL: ''
    }

    generatePreset = () => {
        const preset = {
            id: 'custom',
            settings: {
                config: {
                    bpm            : this.props.bpm,
                    hitChance      : this.props.hitChance,
                },
                beats: deepClone(this.props.beats),
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
                if (url) {
                    const shareableURL = `${domain}/share/${url.split('/').pop()}`;
                    const content = (<ShareBox url={shareableURL} />);
                    this.props.actions.enableModal({ content, isCloseable: true });
                }
                this.setState({ isLoading: false })
            });
    }

    onClick = e => {
        this.setState({ isLoading: true });
        this.generatePreset();
    }

    getShareableURL = (preset) => {
        const compressedPreset = compress(JSON.stringify(preset), {outputEncoding: "Base64" });
        const shareableURL = `${domain}/#share=${compressedPreset}`;

        if (shareableURL.length > 3000) alert('No can do');

        return this.getShortURL(shareableURL);
    }

    getShortURL = url => {
        return gapi.client.urlshortener.url.insert({ 'longUrl': url })
            .then((response) => response.result.id, (reason) => (console.error || console.log).call(console, reason));
    }

    render = () => {
        const isDisabled = !this.props.googleAPIHasLoaded || !this.props.currentBuffer
        return (
            <div className="">
                <button className={`button-primary u-flex-row ${ this.state.isLoading ? '' : 'icon-is-hidden' }`} onClick={this.onClick} disabled={isDisabled}>
                    <span className="button-primary__inner">Share Riff</span>
                    <span className="button-primary__icon">
                        <span className="spinner" />
                    </span>
                </button>
            </div>
        );
    }
}

export default ShareController;

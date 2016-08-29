import React, { Component } from 'react';
import { compress } from 'lzutf8';
import { deepClone, log } from '../utils/tools';

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
                    bpm : this.props.bpm,
                },
                sequences: deepClone(this.props.sequences),
                instruments: this.props.instruments
                    .map(instrument => ({
                        id: instrument.id,
                        pitch: instrument.pitch,
                        predefinedHitTypes: instrument.hitTypes,
                        predefinedSequence: instrument.sequence,
                        volume: instrument.volume,
                        repeatHitTypeForXBeat: instrument.repeatHitTypeForXBeat,
                    })),
            }
        };

        this.getShareableURL(preset)
            .then((url) => {
                if (url) {
                    const shareableURL = `${domain}/share/${url.split('/').pop()}`;
                    const content = (<ShareBox url={shareableURL} />);
                    this.props.actions.enableModal({ content, title: 'Share URL', isCloseable: true, className: 'modal--auto-width' });
                }
                this.setState({ isLoading: false });
            });
    }

    onClick = () => {
        this.setState({ isLoading: true });
        this.generatePreset();
    }

    getShareableURL = (preset) => {
        const compressedPreset = compress(JSON.stringify(preset), { outputEncoding: 'Base64' });
        const shareableURL = `djen.co/#share=${compressedPreset}`;

        if (shareableURL.length > 3000) {
            log('No can do');
            return;
        }

        return this.getShortURL(shareableURL);
    }

    getShortURL = url => window.gapi.client.urlshortener.url.insert({ longUrl: url })
        .then((response) => response.result.id, (reason) => log(reason));

    render = () => {
        const isDisabled = !this.props.googleAPIHasLoaded;
        return (
            <div className="">
                <button className={`button-primary button-primary--alpha-dark button-primary--tiny u-flex-row ${this.state.isLoading ? '' : 'icon-is-hidden'}`} onClick={this.onClick} disabled={isDisabled}>
                    <span className="button-primary__inner">Share</span>
                    <span className="button-primary__icon">
                        <span className="spinner" />
                    </span>
                </button>
            </div>
        );
    }
}

export default ShareController;

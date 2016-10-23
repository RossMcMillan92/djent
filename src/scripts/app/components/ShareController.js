import React, { Component } from 'react';
import { compress } from 'lzutf8';
import { compose, deepClone, logError, log } from '../utils/tools';

const domain = `${window.location.protocol}//${window.location.host}`;

class ShareController extends Component {
    state = {
        isEnabled: false,
        isLoading: false,
        shortURL: ''
    }

    generatePreset = ({ id, instruments, sequences, bpm }) => ({
        id,
        settings: {
            config: {
                bpm,
            },
            sequences: deepClone(sequences),
            instruments: instruments
                .map(instrument => ({
                    id: instrument.id,
                    pitch: instrument.pitch,
                    predefinedHitTypes: instrument.hitTypes,
                    predefinedSequence: instrument.sequence,
                    volume: instrument.volume,
                    repeatHitTypeForXBeat: instrument.repeatHitTypeForXBeat,
                })),
        }
    })

    getShortURLPromise = (preset) => compose(
        this.getShortURL,
        this.getShareableURL,
        this.generatePreset,
    )(preset);

    onClick = () => {
        this.setState({ isLoading: true });
        const presetPromises = this.props.audioPlaylist
            .map(this.getShortURLPromise);

        Promise.all(presetPromises)
            .then(this.combineShortURLs)
            .then(this.launchModal)
            .then(() => this.setState({ isLoading: false }));
    }

    getShareableURL = (preset) => {
        const compressedPreset = compress(JSON.stringify(preset), { outputEncoding: 'Base64' });
        const shareableURL = `djen.co/#share=${compressedPreset}`;
        if (shareableURL.length > 3000) logError('URL exceeds 3000 chars. May not succeed');
        return shareableURL;
    }

    getShortURL = url => window.gapi.client.urlshortener.url.insert({ longUrl: url })
        .then((response) => response.result.id, (reason) => log(reason));

    combineShortURLs = (googleURLs) => {
        const urlIDs = googleURLs
            .map(url => url.split('/').pop());
        return `${domain}/share/${urlIDs.join('-')}`;
    }

    launchModal = (url) => {
        const content = (<ShareBox url={url} />);
        this.props.actions.enableModal({ content, title: 'Share URL', isCloseable: true, className: 'modal--auto-width' });
    }

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

const ShareBox = (props) => (
    <div>
        <input
            className="input-base input-base--bare input-base--large input-base--long"
            type="text"
            value={props.url}
            onClick={e => e.target.select()}
            readOnly
        />
    </div>
);

export default ShareController;

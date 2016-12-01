import React, { Component } from 'react';
import { assoc } from 'ramda';
import { compress } from 'lzutf8';
import { createPreset } from 'utils/presets';
import { compose, logError } from 'utils/tools';

const domain = `${window.location.protocol}//${window.location.host}`;

const shortURLCache = {};

//    getGoogleShortURL :: url -> Promise url
const getGoogleShortURL = url =>
    shortURLCache[url]
        ? shortURLCache[url]
        : window.gapi.client.urlshortener.url
            .insert({ longUrl: url })
            .then(({ result }) => {
                const shortURL = result.id;
                shortURLCache[url] = shortURL;
                return shortURL;
            }, logError);

class ShareController extends Component {
    state = {
        isEnabled: false,
        isLoading: false,
        shortURL: ''
    }

    getShortURLPromise = (preset) => compose(
        getGoogleShortURL,
        this.getShareableURL,
        createPreset,
        assoc('usePredefinedSettings', true),
    )(preset);

    onClick = () => {
        this.setState({ isLoading: true });
        const presetPromises = this.props.audioPlaylist
            .map(this.getShortURLPromise);

        Promise.all(presetPromises)
            .then(this.combineShortURLs)
            .then(url => {
                if (url.includes('-')) {
                    return getGoogleShortURL(url)
                        .then(shortURL => this.combineShortURLs([shortURL]));
                }
                return url;
            })
            .then(this.launchModal)
            .then(() => this.setState({ isLoading: false }));
    }

    getShareableURL = (preset) => {
        const compressedPreset = compress(JSON.stringify(preset), { outputEncoding: 'Base64' });
        const shareableURL = `djen.co/#share=${compressedPreset}`;
        if (shareableURL.length > 2048) logError('URL exceeds 2048 chars. May not succeed');
        return shareableURL;
    }

    // combineShortURLs :: [url] -> url
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
            defaultValue={props.url}
            onClick={e => e.target.select()}
        />
    </div>
);

export default ShareController;

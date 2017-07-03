import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assoc, chain, compose, concat, head, last, join, map, split } from 'ramda'
import { Future as Task } from 'ramda-fantasy'
import { List } from 'immutable-ext'

import * as modalActions from 'actions/modal'

import * as Tracking from 'modules/tracking'

import { createPreset } from 'utils/presets'
import { logError } from 'utils/tools'
import { getGoogleShortURL } from 'utils/short-urls'

const domain = `${window.location.protocol}//${window.location.host}`

const getIDFromGoogleURL = compose(last, split('/'))

//    combineShortURLs :: [url] -> url
const combineShortURLs = compose(
    concat(`${domain}/share/`),
    join('-'),
    map(getIDFromGoogleURL),
)

//    compressShortMultiURL :: url -> Task Error url
const compressShortMultiURL = (url) => {
    if (!url.includes('-')) return Task.of(url)
    return getGoogleShortURL(url)
        .map(shortURL => combineShortURLs([shortURL]))
}

//    getShareableURL :: preset -> Task url
const getShareableURL = preset =>
    Task((rej, res) => {
        require.ensure(['lzutf8'], (require) => {
            const compress = require('lzutf8').compress
            const compressedPreset = compress(JSON.stringify(preset), { outputEncoding: 'Base64' })
            const shareableURL = `djen.co/#share=${compressedPreset}`
            if (shareableURL.length > 2048) logError('URL exceeds 2048 chars. May not succeed')
            res(shareableURL)
        }, 'lzutf8')
    })

//    getShortURL :: preset -> Task Error url
const getShortURL = preset => compose(
    chain(getGoogleShortURL),
    getShareableURL,
    createPreset,
    assoc('usePredefinedSettings', true),
)(preset)

class ShareController extends Component {
    state = {
        isEnabled: false,
        isLoading: false,
        shortURL: ''
    }

    onClick = () => {
        this.setState({ isLoading: true })
        Tracking.sendShareEvent('share')

        const result = compose(
            createPreset,
            head,
        )

        console.log('result', result(this.props.audioPlaylist))

        List(this.props.audioPlaylist)
            .traverse(Task.of, getShortURL)
            .map(combineShortURLs)
            .chain(compressShortMultiURL)
            .fork(logError, (url) => {
                this.launchModal(url)
                this.setState({ isLoading: false })
            })
    }

    launchModal = (url) => {
        const content = (<ShareBox url={url} />)
        this.props.actions.enableModal({ content, title: 'Share URL', isCloseable: true, className: 'modal--auto-width' })
    }

    render = () => {
        const isDisabled = !this.props.googleAPIHasLoaded
        return (
            <div className="">
                <button className={`button-primary button-primary--alpha-dark u-flex-row ${this.state.isLoading ? '' : 'icon-is-hidden'}`} onClick={this.onClick} disabled={isDisabled}>
                    <span className="button-primary__inner">Share</span>
                    <span className="button-primary__icon">
                        <span className="spinner" />
                    </span>
                </button>
            </div>
        )
    }
}

const ShareBox = props => (
    <div>
        <input
            className="input-base input-base--bare input-base--large input-base--long"
            type="text"
            value={props.url}
            onClick={e => e.target.select()}
            readOnly={true}
        />
    </div>
)

const mapStateToProps = state => ({
    audioPlaylist : state.sound.audioPlaylist,
})

const actions = {
    ...modalActions
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareController)

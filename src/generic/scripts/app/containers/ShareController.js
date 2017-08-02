import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assoc, chain, compose, concat, head, last, join, map, split } from 'ramda'
import { Future as Task } from 'ramda-fantasy'
import { List } from 'immutable-ext'
import * as modalActions from 'actions/modal'
import IconButton from 'components/IconButton'
import * as Tracking from 'modules/tracking'
import { createPreset } from 'utils/presets'
import { logError } from 'utils/tools'
import { getGoogleShortURL } from 'utils/short-urls'

const getIDFromGoogleURL = compose(last, split('/'))

//    combineShortURLs :: [url] -> url
const combineShortURLs = compose(
    concat(`${window.location.host}/share/`),
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
        this.props.actions.enableModal({ className: 'modal--small', content, title: 'Share URL', isCloseable: true })
    }

    render = () => {
        const { googleAPIHasLoaded, audioPlaylist } = this.props
        const isDisabled = !googleAPIHasLoaded || !audioPlaylist.length
        return (
            <IconButton
                icon="share"
                isDisabled={isDisabled}
                isLoading={this.state.isLoading}
                onClick={this.onClick}
                theme="alpha-dark"
            >
                Share
            </IconButton>
        )
    }
}

const ShareBox = props => (
    <div className="u-flex-row u-flex-justify-center">
        <input
            className="input-container__input input-container__input--bare input-container__input--large input-container__input--long u-tac"
            type="text"
            value={props.url}
            onFocus={e => e.target.select()}
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

import React, { Component } from 'react'
import { assoc, compose, last, map, split, traverse } from 'ramda'
import { Future as Task } from 'ramda-fantasy'
import { List } from 'immutable-ext'

import Expandable from 'components/Expandable'
import Panel from 'components/Panel'
import Spinner from 'components/Spinner'
import SwipeableViews from 'components/SwipeableViews'

import Modal from 'containers/Modal'
import Player from 'containers/Player'

import { defaultAllowedLengths } from 'reducers/sequences.initial-state'

import { backwardsCompatibility } from 'utils/presets'
import { getActiveSoundsFromHitTypes } from 'utils/instruments'
import { getLongURLFromShareID, getPresetFromData, handleGoogleAPI } from 'utils/short-urls'

import {
    presetToPlaylistItem,
} from 'utils/riffs'

import { isMobile } from 'utils/mobile'
import { getHashQueryParam, logError, throttle } from 'utils/tools'

let Instruments
let Sequences

export default class Main extends Component {
    state = {
        activePageIndex: 0,
        googleAPIHasLoaded: false,
        childrenLoaded: false,
    }

    componentWillMount = () => {
        this.setupBackButtonController()
        const { params, presets } = this.props
        const shareID = params.shareID

        handleGoogleAPI()
            .fork(logError, () => {
                if (shareID) this.setupSharedItemsAndUpdate(shareID)
                this.setState({ googleAPIHasLoaded: true })
            })

        if (!shareID) {
            const presetID = this.props.params.presetID || this.props.activePresetID
            const preset = presets.find(p => p.id === presetID)
                        || presets.find(p => p.id === this.props.activePresetID)

            this.loadAndApplyPreset(preset)
        } else {
            this.props.actions.enableModal({
                content: (<Spinner subtext="Loading..." />),
                isCloseable: false,
                className: 'modal--auto-width',
            })
        }
    }

    loadAndApplyPreset = preset => preset.load
        .fork(logError, ({ default: fullPreset }) => this.props.actions.applyPreset(fullPreset))

    componentDidMount = () => {
        this.refreshOnWindowResize()
        this.loadAdditionalViews()
    }

    loadAdditionalViews = () => {
        require.ensure([
            'containers/Instruments',
            'containers/Sequences',
        ], (require) => {
            Instruments = require('containers/Instruments').default
            Sequences = require('containers/Sequences').default
            this.setState(() => ({
                childrenLoaded: true,
            }))
        }, 'additional-views')
    }

    componentWillUpdate = (nextProps) => {
        if (!this.props.params.shareID && nextProps.params.shareID) {
            this.setupSharedItemsAndUpdate(nextProps.params.shareID)
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('popstate', this.backToHome)
    }

    // setupSharedItems :: shareID -> Task Error audioPlaylist
    setupSharedItems = shareID =>
        List(shareID.split('-'))
            .traverse(Task.of, getLongURLFromShareID)
            .chain(this.updatePresetAndGetPlaylist)

    // updatePresetAndGetPlaylist :: List longURLs -> Task Error audioPlaylist
    updatePresetAndGetPlaylist = (longURLs) => {
        if (longURLs.size === 1 && longURLs.get(0).includes('-')) {
            return compose(this.setupSharedItems, last, split('/'))(longURLs.get(0))
        }

        const sharedPresets = longURLs
            .traverse(Task.of, this.urlToPreset)

        sharedPresets
            .fork(logError, (_sharedPresets) => {
                this.props.actions.applyPreset(_sharedPresets.get(0))
            })

        return sharedPresets
            .chain(traverse(Task.of, presetToPlaylistItem))
            .map(map(assoc('isLocked', true)))
    }

    setupSharedItemsAndUpdate = (shareID) => {
        this.setupSharedItems(shareID)
            .fork(logError, (audioPlaylist) => {
                this.props.actions.updateAudioPlaylist(audioPlaylist.toJS())
                this.props.actions.disableModal()
            })
    }

    // urlToPreset :: url -> Task Error Preset
    urlToPreset = dataString => compose(
        map(this.insertSoundsIntoPresetInstruments),
        map(preset => backwardsCompatibility(preset, defaultAllowedLengths)),
        getPresetFromData,
        getHashQueryParam('share')
    )(dataString)

    insertSoundsIntoPresetInstruments = (preset) => {
        preset.settings.instruments = preset.settings.instruments
            .map((i) => {
                const inst = this.props.instruments.find(ins => ins.id === i.id)
                const sounds = getActiveSoundsFromHitTypes(i.predefinedHitTypes)
                    .map(sound => ({ ...inst.sounds.find(s => s.id === sound.id), ...sound }))
                return { ...i, sounds }
            })

        return preset
    }

    refreshOnWindowResize = () => {
        const throttledFn = throttle(() => this.forceUpdate(), 500)
        window.addEventListener('resize', throttledFn)
    }

    setupBackButtonController = () => {
        window.addEventListener('popstate', this.backToHome)
    }

    backToHome = () => {
        if (document.location.hash !== '#fwd') {
            this.changeActivePageIndex(0)
        }
    }

    setActivePageIndex = (index) => {
        if (this.state.activePageIndex !== index) this.setState({ activePageIndex: index })
    }

    changeActivePageIndex = (index) => {
        if (this.state.activePageIndex === index) return
        document.location.hash = index === 0 ? '' : '#fwd'
        this.setActivePageIndex(index)
    }

    getViews = (isMobileView) => {
        const expandableTitleClass = 'title-primary u-txt-large dropdown-icon-before u-curp u-no-select'
        return isMobileView
            ? (
                <SwipeableViews
                    viewHeight={true}
                    resistance={true}
                    index={this.state.activePageIndex}
                    onChangeIndex={i => this.changeActivePageIndex(i)}
                >
                    <Player
                        route={this.props.route}
                        googleAPIHasLoaded={this.state.googleAPIHasLoaded}
                    />
                        {
                            this.state.childrenLoaded &&
                                <Panel>
                                    <Sequences route={this.props.route} />
                                </Panel>
                        }
                        {
                            this.state.childrenLoaded &&
                                <Panel>
                                    <Instruments route={this.props.route} />
                                </Panel>
                        }
                    }
                </SwipeableViews>
            )
            : (
                <div>
                    <Player
                        route={this.props.route}
                        googleAPIHasLoaded={this.state.googleAPIHasLoaded}
                    />
                    {
                        this.state.childrenLoaded &&
                        [
                            <Panel key="sequences" className="u-bdrb">
                                <Expandable
                                    title="Sequences"
                                    titleClassName={expandableTitleClass}
                                    enableStateSave={true}
                                    isExpanded={true}
                                >
                                    <Sequences route={this.props.route} className="u-mt1" />
                                </Expandable>
                            </Panel>,
                            <Panel key="instruments">
                                <Expandable
                                    title="Instruments"
                                    titleClassName={expandableTitleClass}
                                    enableStateSave={true}
                                >
                                    <Instruments route={this.props.route} className="u-mt1" />
                                </Expandable>
                            </Panel>
                        ]
                    }
                </div>
            )
    }

    render = () => {
        const tabs = ['Player', 'Sequences', 'Instruments']
            .map((tabName, i) => (
                <div
                    key={i}
                    className={`nav-tab ${i === this.state.activePageIndex ? 'is-active' : ''}`}
                    onClick={() => this.changeActivePageIndex(i)}
                >
                    <div className="nav-tab__inner">
                        { tabName }
                    </div>
                </div>
            ))
        const isMobileView = isMobile()
        const views = this.getViews(isMobileView)

        return (
            <div className="site">
                <Modal />
                <div className="site__content" ref="content">
                    { views }
                </div>

                {
                    isMobile &&
                    <div className="site__fixed">
                        <div className="u-flex-row u-flex-justify-around">
                            {
                                isMobileView &&
                                tabs
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { curry, insert, update, remove } from 'ramda'

import Generator from 'components/Generator'
import PlaylistTrack from 'components/PlaylistTrack'
import ReorderableList from 'components/ReorderableList'

import {
    updateAudioPlaylist,
    updateActivePlaylistIndex,
    updateIsPlaying,
} from 'actions/sound'

import {
    applyPreset
} from 'actions/config'

import * as Tracking from 'modules/tracking'

import { createPreset } from 'utils/presets'
import { createPlaylistItem } from 'utils/riffs'
import { confineToRange } from 'utils/tools'


//    getPresetItemIndex :: [playlistItem] -> playlistItem -> Integer
const getPresetItemIndex = (audioPlaylist, playlistItem) =>
    audioPlaylist.reduce((result, next, x) =>
        result !== null
            ? result
            : playlistItem.id === next.id
                ? x
                : null
    , null)

//    updatePlaylistProp :: playlistItem -> String -> a -> playlistItem
const updatePlaylistProp = (playlistItem, prop, value) => ({
    ...playlistItem,
    [prop]: value
})

//    updateItemInPlaylist :: [playlistItem], playlistItem -> String -> a -> playlistItem
const updateItemInPlaylist = (audioPlaylist, playlistItem, prop, value) => {
    const newPlaylistItem = updatePlaylistProp(playlistItem, prop, value)
    const i = getPresetItemIndex(audioPlaylist, playlistItem)
    const newAudioPlaylist = update(i, newPlaylistItem, audioPlaylist)
    return newAudioPlaylist
}

//    generateDuplicateItemId :: String -> String
const generateDuplicateItemId = (audioPlaylist, currentId) =>
    !audioPlaylist.find(pi => pi.id === `${currentId}-c`)
        ? `${currentId}-c`
        : generateDuplicateItemId(audioPlaylist, `${currentId}-c`)

class PlaylistEditor extends Component {
    static defaultProps = {
        audioPlaylist: []
    }

    trackLimit = 30
    state = {
        isLoading: false,
    }

    updateActivePlaylistIndex = (playlistIndex) => {
        if (playlistIndex === undefined || this.props.activePlaylistIndex === playlistIndex) return
        this.props.actions.updateActivePlaylistIndex(playlistIndex)
    }

    onListItemClick = (playlistIndex) => {
        console.log('PLAYLISTINDEX', playlistIndex)
        this.props.actions.updateIsPlaying(false)
        this.updateActivePlaylistIndex(playlistIndex)
    }

    onReorder = (newOrder) => {
        const { audioPlaylist } = this.props
        const newAudioPlaylist = newOrder
            .map(key => audioPlaylist.find(item => `${item.key}` === key))
        const activeItemKey = this.props.audioPlaylist[this.props.activePlaylistIndex].id
        const newActivePlaylistIndex = newAudioPlaylist
            .reduce((answer, item, i) => (activeItemKey === item.id) ? i : answer, 0)

        this.props.actions.updateAudioPlaylist(newAudioPlaylist)
        this.updateActivePlaylistIndex(newActivePlaylistIndex)
    }

    onDelete = curry((playlistItem, e) => {
        if (playlistItem.isDisabled || this.props.isPlaying) return
        e.preventDefault()
        e.stopPropagation()
        const { audioPlaylist, activePlaylistIndex } = this.props
        const i = getPresetItemIndex(audioPlaylist, playlistItem)
        const newAudioPlaylist = remove(i, 1, audioPlaylist)
        this.props.actions.updateAudioPlaylist(newAudioPlaylist)

        if (activePlaylistIndex >= i) {
            const newActivePlaylistIndex = confineToRange(0, newAudioPlaylist.length - 1, activePlaylistIndex + 1)
            this.updateActivePlaylistIndex(newActivePlaylistIndex)
        }
    })

    onDuplicate = curry((playlistItem, e) => {
        if (playlistItem.isDisabled || this.props.isPlaying) return
        e.preventDefault()
        e.stopPropagation()
        const { audioPlaylist, activePlaylistIndex } = this.props
        const newPlaylistItem = createPlaylistItem({
            id: generateDuplicateItemId(audioPlaylist, playlistItem.id),
            audioTemplate: playlistItem.audioTemplate,
            instruments: playlistItem.instruments,
            sequences: playlistItem.sequences,
            title: playlistItem.title,
            bpm: playlistItem.bpm,
            isLocked: playlistItem.isLocked
        })
        const i = getPresetItemIndex(audioPlaylist, playlistItem)
        const newAudioPlaylist = insert(i, newPlaylistItem, audioPlaylist)

        this.props.actions.updateAudioPlaylist(newAudioPlaylist)

        if (activePlaylistIndex > i) {
            this.updateActivePlaylistIndex(confineToRange(0, newAudioPlaylist.length - 1, activePlaylistIndex + 1))
        }
    })

    onLoadSettings = curry((playlistItem, e) => {
        if (playlistItem.isDisabled || this.props.isPlaying) return
        const preset = createPreset(playlistItem)
        this.props.actions.applyPreset(preset)
    })

    onLockTrack = curry((playlistItem, e) => {
        if (this.props.isPlaying) return
        const { audioPlaylist } = this.props
        const newAudioPlaylist = updateItemInPlaylist(audioPlaylist, playlistItem, 'isLocked', !playlistItem.isLocked)
        this.props.actions.updateAudioPlaylist(newAudioPlaylist)
    })

    onTitleChange = curry((playlistItem, e) => {
        const value = e.target.value
        if (!value.length || playlistItem.isDisabled || this.props.isPlaying) return
        const { audioPlaylist } = this.props
        const newAudioPlaylist = updateItemInPlaylist(audioPlaylist, playlistItem, 'title', value)
        this.props.actions.updateAudioPlaylist(newAudioPlaylist)
    })

    onGenerationStart = () => {
        this.setState({ isLoading: true })
        Tracking.sendGenerateEvent('add')
    }

    onGenerate = (playlistItem) => {
        this.setState({ isLoading: false })
        this.props.actions.updateAudioPlaylist([
            ...this.props.audioPlaylist,
            playlistItem
        ])
    }

    render() {
        const { activePlaylistIndex, audioPlaylist, isPlaying } = this.props
        const listItems = audioPlaylist
            .map((item, i) => {
                const isActive = activePlaylistIndex === i
                return {
                    key: item.id,
                    body: (
                        <PlaylistTrack
                            bpm={item.bpm}
                            isActive={isActive}
                            isLocked={item.isLocked}
                            title={item.title}
                            onDelete={this.onDelete(item)}
                            onDuplicate={this.onDuplicate(item)}
                            onLockTrack={this.onLockTrack(item)}
                            onLoadSettings={this.onLoadSettings(item)}
                            onTitleChange={this.onTitleChange(item)}
                        />
                    ),
                    className: `${isActive ? 'is-active' : ''} ${isPlaying || item.isLocked ? 'functionality-is-disabled' : ''}`,
                }
            })

        return (
            <div>
                <div className="u-mb05">
                    <ReorderableList
                        listItems={listItems}
                        onListItemClick={this.onListItemClick}
                        onReorder={this.onReorder}
                    />
                </div>
                {
                    audioPlaylist.length > 0 &&
                    audioPlaylist.length < this.trackLimit &&
                        <Generator
                            audioPlaylist={ this.props.audioPlaylist }
                            bpm={ this.props.bpm }
                            sequences={ this.props.sequences }
                            instruments={ this.props.instruments }
                            onGenerationStart={ this.onGenerationStart }
                            onGenerationEnd={ this.onGenerate }
                            wrapperClass="button-primary button-primary--full button-primary--gamma"
                            wrapperComponent='button'
                        >
                            Add Track
                        </Generator>
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
    activePlaylistIndex : state.sound.activePlaylistIndex,
    audioPlaylist       : state.sound.audioPlaylist,
    isPlaying           : state.sound.isPlaying,
    bpm                 : state.config.bpm,
    sequences           : state.sequences,
    instruments         : state.instruments,
})

const actions = {
    applyPreset,
    updateAudioPlaylist,
    updateActivePlaylistIndex,
    updateIsPlaying,
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEditor)

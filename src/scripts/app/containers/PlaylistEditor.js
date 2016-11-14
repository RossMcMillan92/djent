import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Generator from '../components/Generator';
import ReorderableList from '../components/ReorderableList';
import SVG from '../components/SVG';

import {
    updateAudioPlaylist,
    updateActivePlaylistIndex,
    updateIsPlaying,
} from '../actions/sound';

import {
    applyPreset
} from '../actions/config';

import { createPreset } from '../utils/presets';
import { createPlaylistItem } from '../utils/riffs';
import { confineToRange, splice } from '../utils/tools';

class PlaylistEditor extends Component {
    static defaultProps = {
        audioPlaylist: []
    }

    state = {
        isLoading: false,
    }

    updateActivePlaylistIndex = (playlistIndex) => {
        if (playlistIndex === undefined || this.props.activePlaylistIndex === playlistIndex) return;
        this.props.actions.updateActivePlaylistIndex(playlistIndex);
    }

    onListItemClick = (playlistIndex) => {
        this.props.actions.updateIsPlaying(false);
        this.updateActivePlaylistIndex(playlistIndex);
    }

    onReorder = (newOrder) => {
        const { audioPlaylist } = this.props;
        const newAudioPlaylist = newOrder
            .map(key => audioPlaylist.find(item => `${item.key}` === key));
        const activeItemKey = this.props.audioPlaylist[this.props.activePlaylistIndex].id;
        const newActivePlaylistIndex = newAudioPlaylist
            .reduce((answer, item, i) => (activeItemKey === item.id) ? i : answer, 0);

        this.props.actions.updateAudioPlaylist(newAudioPlaylist);
        this.updateActivePlaylistIndex(newActivePlaylistIndex);
    }

    onDelete = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        const { audioPlaylist, activePlaylistIndex } = this.props;
        const newAudioPlaylist = splice(i, 1, audioPlaylist);
        this.props.actions.updateAudioPlaylist(newAudioPlaylist);

        if (activePlaylistIndex >= i) {
            const newActivePlaylistIndex = confineToRange(0, newAudioPlaylist.length - 1, activePlaylistIndex + 1);
            this.updateActivePlaylistIndex(newActivePlaylistIndex);
        }
    }

    onDuplicate = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        const { audioPlaylist, activePlaylistIndex } = this.props;
        const playlistItem = audioPlaylist[i];
        console.log('PLAYLISTITEM', playlistItem)
        const newAudioPlaylistItem = createPlaylistItem(playlistItem.id, playlistItem.audioTemplate, playlistItem.instruments, playlistItem.sequences, playlistItem.bpm);
        console.log('NEWAUDIOPLAYLISTITEM', newAudioPlaylistItem)

        const newAudioPlaylist = [
            ...audioPlaylist.slice(0, i + 1),
            newAudioPlaylistItem,
            ...audioPlaylist.slice(i + 1, audioPlaylist.length)
        ];

        this.props.actions.updateAudioPlaylist(newAudioPlaylist);

        if (activePlaylistIndex > i) {
            this.updateActivePlaylistIndex(confineToRange(0, newAudioPlaylist.length - 1, activePlaylistIndex + 1));
        }
    }

    onLoadSettings = (e, i) => {
        const { audioPlaylist } = this.props;
        const selectedItem = { ...audioPlaylist[i] };
        const preset = createPreset(selectedItem);
        this.props.actions.applyPreset(preset);
    }

    onGenerationStart = () => {
        this.setState({ isLoading: true });
    }

    onGenerate = (playlistItem) => {
        this.setState({ isLoading: false });
        this.props.actions.updateAudioPlaylist([
            ...this.props.audioPlaylist,
            playlistItem
        ]);
    }

    render() {
        const listItems = this.props.audioPlaylist
            .map((item, i) => ({
                key: item.key,
                body: (
                    <div className="u-flex-row u-flex-justify">
                        Riff {item.id} - {item.bpm}BPM - {item.sequences[0].bars} × {item.sequences[0].beats}
                        <div>
                            <span
                                className="block-list__button u-mr1"
                                onClick={(e) => this.onLoadSettings(e, i)}
                                title="Load Settings"
                            >
                                <SVG className="block-list__button-icon" icon="gear" />
                            </span>
                            <span
                                className="block-list__button u-txt-negative u-mr1"
                                onClick={(e) => this.onDelete(e, i)}
                                title="Delete"
                            >
                                <SVG className="block-list__button-icon" icon="cross" />
                            </span>
                            <span
                                className="block-list__button u-txt-positive"
                                onClick={(e) => this.onDuplicate(e, i)}
                                title="Duplicate"
                            >
                                <SVG className="block-list__button-icon" icon="plus" />
                            </span>
                        </div>
                    </div>
                ),
                className: `${this.props.activePlaylistIndex === i ? 'is-active' : ''}`,
            }));

        return (
            <div>
                <div className="u-mb05">
                    <ReorderableList
                        listItems={listItems}
                        onListItemClick={this.onListItemClick}
                        onReorder={this.onReorder}
                    />
                </div>
                <div className="block-list">
                    <Generator
                        audioPlaylist={ this.props.audioPlaylist }
                        bpm={ this.props.bpm }
                        sequences={ this.props.sequences }
                        instruments={ this.props.instruments }
                        usePredefinedSettings={ this.props.usePredefinedSettings }
                        onGenerationStart={ this.onGenerationStart }
                        onGenerationEnd={ this.onGenerate }
                        wrapperClass="block-list__item u-bg-gamma"
                        wrapperComponent='div'
                    >
                        <div className="block-list__body u-tac">
                            <SVG className={`button-primary__svg-icon u-txt-light u-dib ${this.state.isLoading ? 'u-anim-spin' : ''}`} icon="plus" />
                        </div>
                    </Generator>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activePlaylistIndex : state.sound.activePlaylistIndex,
    audioPlaylist       : state.sound.audioPlaylist,
    isPlaying           : state.sound.isPlaying,
    bpm                 : state.config.bpm,
    sequences           : state.sequences,
    instruments         : state.instruments,
});

const mapDispatchToProps = (dispatch) => {
    const actions = {
        applyPreset,
        updateAudioPlaylist,
        updateActivePlaylistIndex,
        updateIsPlaying,
    };
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEditor);

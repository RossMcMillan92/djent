import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReorderableList from '../components/ReorderableList';

import {
    updateAudioPlaylist,
    updateActivePlaylistIndex
} from '../actions/sound';

class PlaylistEditor extends Component {
    static defaultProps = {
        audioPlaylist: []
    }

    updateActivePlaylistIndex = (playlistIndex) => {
        if (playlistIndex === undefined || this.props.activePlaylistIndex === playlistIndex) return;
        this.props.actions.updateActivePlaylistIndex(playlistIndex);
    }

    onReorder = (newOrder) => {
        const { audioPlaylist } = this.props;
        const newAudioPlaylist = newOrder
            .map(key => audioPlaylist.find(item => item.id === parseInt(key, 10)));
        const activeItemID = this.props.audioPlaylist[this.props.activePlaylistIndex].id;
        const newActivePlaylistIndex = newAudioPlaylist
            .reduce((answer, item, i) => (activeItemID === item.id) ? i : answer, undefined);

        this.updateActivePlaylistIndex(newActivePlaylistIndex);
        this.props.actions.updateAudioPlaylist(newAudioPlaylist);
    }

    render() {
        const listItems = this.props.audioPlaylist
            .map((item, i) => ({
                id: item.id,
                text: `Riff ${item.id} / ${item.bpm}BPM`,
                className: `block-list__item ${this.props.activePlaylistIndex === i ? 'is-active' : ''}`,
            }));

        return (
            <ReorderableList
                listItems={listItems}
                onListItemClick={this.updateActivePlaylistIndex}
                onReorder={this.onReorder}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    activePlaylistIndex: state.sound.activePlaylistIndex,
    audioPlaylist: state.sound.audioPlaylist,
    isPlaying: state.sound.isPlaying,
});

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateAudioPlaylist,
        updateActivePlaylistIndex
    };
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEditor);

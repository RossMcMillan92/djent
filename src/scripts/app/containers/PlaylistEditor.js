import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReorderableList from '../components/ReorderableList';

import {
    updateAudioPlaylist,
    updateActivePlaylistIndex
} from '../actions/sound';

import { confineToRange, splice } from '../utils/tools';

class PlaylistEditor extends Component {
    static defaultProps = {
        audioPlaylist: []
    }

    duplications = {}

    updateActivePlaylistIndex = (playlistIndex) => {
        if (playlistIndex === undefined || this.props.activePlaylistIndex === playlistIndex) return;
        this.props.actions.updateActivePlaylistIndex(playlistIndex);
    }

    onReorder = (newOrder) => {
        const { audioPlaylist } = this.props;
        const newAudioPlaylist = newOrder
            .map(key => audioPlaylist.find(item => item.key === key));
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
        const selectedItem = { ...audioPlaylist[i] };
        const duplicationNumber = this.duplications[selectedItem.id];
        const newDuplicationNumber = duplicationNumber ? duplicationNumber + 1 : 1;
        this.duplications[selectedItem.id] = newDuplicationNumber;

        selectedItem.key = `${selectedItem.id}-${newDuplicationNumber}`;

        const newAudioPlaylist = [
            ...audioPlaylist.slice(0, i + 1),
            selectedItem,
            ...audioPlaylist.slice(i + 1, audioPlaylist.length)
        ];

        this.props.actions.updateAudioPlaylist(newAudioPlaylist);

        if (activePlaylistIndex > i) {
            this.updateActivePlaylistIndex(confineToRange(0, newAudioPlaylist.length - 1, activePlaylistIndex + 1));
        }
    }

    render() {
        const listItems = this.props.audioPlaylist
            .map((item, i) => ({
                key: item.key,
                body: (
                    <div className="u-flex-row u-flex-justify">
                        Riff {item.id} / {item.bpm}BPM
                        <div>
                            <span
                                className="block-list__button u-txt-negative u-mr1"
                                onClick={(e) => this.onDelete(e, i)}
                                title="Delete"
                            >
                                -
                            </span>
                            <span
                                className="block-list__button u-txt-positive"
                                onClick={(e) => this.onDuplicate(e, i)}
                                title="Duplicate"
                            >
                                +
                            </span>
                        </div>
                    </div>
                ),
                className: `${this.props.activePlaylistIndex === i ? 'is-active' : ''}`,
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

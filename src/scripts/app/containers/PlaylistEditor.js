import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    updateAudioPlaylist,
    updateActivePlaylistIndex
} from '../actions/sound';

class PlaylistEditor extends Component {
    static defaultProps = {
        audioPlaylist: []
    }

    shouldComponentUpdate = (nextProps) =>
        nextProps.activePlaylistIndex !== this.props.activePlaylistIndex
        || this.isPlaylistDifferent(nextProps.audioPlaylist, this.props.audioPlaylist)

    isPlaylistDifferent = (pl1, pl2) =>
        (pl1.length !== pl2.length)
        || pl1
            .reduce((answer, item, i) => !!(pl2[i] && item.id !== pl2[i].id), false);

    onPlaylistSelected = (playlistIndex) => {
        if (this.props.activePlaylistIndex === playlistIndex) return;
        this.props.actions.updateActivePlaylistIndex(playlistIndex);
    }

    render() {
        return (
            <ul className="block-list u-mb1">
                {
                    this.props.audioPlaylist.length
                        ? this.props.audioPlaylist
                            .map((item, i) => (
                                <li
                                    key={item.id}
                                    className={ `block-list__item ${this.props.activePlaylistIndex === i ? 'is-active' : ''}` }
                                    onClick={ () => this.onPlaylistSelected(i) }
                                >
                                    <span className="block-list__item-handle"></span>
                                    Riff {item.id} - {item.bpm}BPM
                                </li>
                            ))
                        : <li className="block-list__item">Hit Generate!</li>
                }
            </ul>
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

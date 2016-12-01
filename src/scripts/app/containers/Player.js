import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Player from 'routes/Player';

import * as modalActions from 'actions/modal';
import { updateSequence } from 'actions/sequences';

function mapStateToProps(state) {
    const { config, sequences, sound, instruments } = state;
    return {
        bpm              : config.bpm,
        hasAudioTemplate : !!sound.audioPlaylist[sound.activePlaylistIndex],
        instruments,
        sequences,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...modalActions,
        updateSequence
    };

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

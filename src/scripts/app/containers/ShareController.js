import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ShareController from '../components/ShareController';

import * as modalActions from '../actions/modal';

function mapStateToProps(state) {
    return {
        activePlaylistIndex : state.sound.activePlaylistIndex,
        audioPlaylist       : state.sound.audioPlaylist,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...modalActions
    };

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareController);

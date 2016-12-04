import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Main from 'routes/Main';

import * as configActions from 'actions/config';
import * as instrumentsActions from 'actions/instruments';
import * as modalActions from 'actions/modal';
import { updateSequence } from 'actions/sequences';
import {
    updateAudioPlaylist,
} from 'actions/sound';

function mapStateToProps(state) {
    return {
        activePresetID       : state.config.activePresetID,
        bpm                  : state.config.bpm,
        sequences            : state.sequences,
        instruments          : state.instruments,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        ...modalActions,
        updateSequence,
        updateAudioPlaylist
    };

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

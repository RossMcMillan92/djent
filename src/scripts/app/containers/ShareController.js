import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ShareController from '../components/ShareController';

import * as modalActions from '../actions/modal';

function mapStateToProps(state) {
    return {
        sequences      : state.sequences,
        bpm            : state.config.bpm,
        activePresetID : state.config.activePresetID,
        hitChance      : state.config.hitChance,
        instruments    : state.instruments,
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

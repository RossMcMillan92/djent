import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExportController from '../components/ExportController';

import * as modalActions from '../actions/modal';

function mapStateToProps(state) {
    return {
        audioPlaylist: state.sound.audioPlaylist,
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

export default connect(mapStateToProps, mapDispatchToProps)(ExportController);

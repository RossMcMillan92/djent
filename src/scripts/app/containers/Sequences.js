import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Sequences from '../routes/Sequences';

import { addSequence } from '../actions/sequences';

function mapStateToProps(state) {
    return {
        sequences : state.sequences,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = {
        addSequence
    };

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sequences);

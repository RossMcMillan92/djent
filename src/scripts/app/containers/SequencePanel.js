import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SequencePanel from '../components/SequencePanel';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import * as sequencesActions from '../actions/sequences';
import * as modalActions from '../actions/modal';

function mapDispatchToProps(dispatch) {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        ...sequencesActions,
        ...modalActions,
    };

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(null, mapDispatchToProps)(SequencePanel);

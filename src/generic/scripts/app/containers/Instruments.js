import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Instruments from 'routes/Instruments'

import * as instrumentsActions from 'actions/instruments'

function mapStateToProps(state) {
    return {
        sequences   : state.sequences,
        instruments : state.instruments,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...instrumentsActions,
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Instruments from 'routes/Instruments'

import * as instrumentsActions from 'actions/instruments'

const mapStateToProps = state => ({
    sequences   : state.sequences,
    instruments : state.instruments,
})

const actions = {
    ...instrumentsActions,
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)

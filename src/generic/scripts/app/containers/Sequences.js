import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Sequences from 'routes/Sequences'

import { addSequence } from 'actions/sequences'

const mapStateToProps = state => ({
    sequences : state.sequences,
})

const actions = {
    addSequence
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Sequences)

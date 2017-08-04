import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateBPM } from 'actions/config'
import BPMInput from 'components/BPMInput'

const mapStateToProps = state => ({
    bpm: state.config.bpm,
    id: 'master-bpm',
    label: 'BPM',
})

const actions = {
    onChange: updateBPM,
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BPMInput)
export {
    BPMInput
}

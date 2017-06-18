import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Main from 'routes/Main'

import { applyPreset } from 'actions/config'
import { disableModal, enableModal } from 'actions/modal'
import { updateAudioPlaylist } from 'actions/sound'

const mapStateToProps = state => ({
    activePresetID : state.config.activePresetID,
    instruments    : state.instruments,
    presets        : state.presets,
})

const actions = {
    applyPreset,
    disableModal,
    enableModal,
    updateAudioPlaylist
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

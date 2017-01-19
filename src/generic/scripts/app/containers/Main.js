import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Main from 'routes/Main'

import { applyPreset } from 'actions/config'
import { disableModal, enableModal } from 'actions/modal'
import { updateAudioPlaylist } from 'actions/sound'

function mapStateToProps(state) {
    return {
        activePresetID       : state.config.activePresetID,
        instruments          : state.instruments,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        applyPreset,
        disableModal,
        enableModal,
        updateAudioPlaylist
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

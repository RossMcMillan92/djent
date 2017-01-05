import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Player from 'routes/Player'

import { applyPreset, updateBPM } from 'actions/config'
import { updateSequence } from 'actions/sequences'

function mapStateToProps(state) {
    const { config, sequences, sound } = state
    return {
        activePresetID   : config.activePresetID,
        hasAudioTemplate : !!sound.audioPlaylist[sound.activePlaylistIndex],
        sequences,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        applyPreset,
        updateBPM,
        updateSequence
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)

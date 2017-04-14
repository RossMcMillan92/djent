import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Player from 'routes/Player'

import { applyPreset, updateBPM } from 'actions/config'
import { updateSequence } from 'actions/sequences'

const mapStateToProps = (state) => {
    const { config, sequences, sound } = state
    return {
        activePresetID   : config.activePresetID,
        hasAudioTemplate : !!sound.audioPlaylist[sound.activePlaylistIndex],
        sequences,
    }
}

const actions = {
    applyPreset,
    updateBPM,
    updateSequence
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)

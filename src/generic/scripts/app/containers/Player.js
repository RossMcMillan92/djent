import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Player from 'routes/Player'

import { applyPreset, updateBPM } from 'actions/config'
import { updateSequence } from 'actions/sequences'

const mapStateToProps = (state) => {
    const { sequences, sound } = state
    return {
        hasAudioTemplate : !!sound.audioPlaylist[sound.activePlaylistIndex],
        sequences,
    }
}

const actions = {
    updateBPM,
    updateSequence,
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)

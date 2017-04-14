import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as soundActions from 'actions/sound'
import Visualiser from 'components/Visualiser'
import audioContext from 'utils/audioContext'

const mapStateToProps = (state) => {
    const { sound, sequences } = state
    const currentPlaylistItem = sound.audioPlaylist[sound.activePlaylistIndex]
    const audioStartTime = currentPlaylistItem
        ? currentPlaylistItem.audioStartTime
        : audioContext.currentTime

    return {
        bpm            : currentPlaylistItem ? currentPlaylistItem.bpm : 0,
        isPlaying      : sound.isPlaying,
        sequences      : currentPlaylistItem ? currentPlaylistItem.sequences : sequences,
        audioStartTime,
        currentPlaylistItem,
    }
}

const actions = {
    ...soundActions,
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Visualiser)

import React from 'react'
import { compose, map } from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from 'actions/modal'
import IconButton from 'components/IconButton'
import * as Tracking from 'modules/tracking'
import { renderAudioPlaylistItemToBuffer } from 'utils/audio'
import { buildMidiDataURIFromInstruments } from 'utils/midi'
import { saveAsFile } from 'utils/save'
import { logError } from 'utils/tools'

//    buildAndSaveMidi :: audioPlaylist -> ()
const buildAndSaveMidi = compose(
    map(({ title, url }) => saveAsFile('mid', title, url)),
    map(({ id, instruments, bpm }) => ({
        title: `djen-track-${id}`,
        url: buildMidiDataURIFromInstruments(instruments, bpm)
    })),
)

//    saveAudioPlaylistAsWav :: audioPlaylist -> ()
const saveAudioPlaylistAsWav = audioPlaylist => renderAudioPlaylistItemToBuffer(audioPlaylist)
    .fork(logError, saveAsFile('wav', 'djen'))

const SaveModal = ({ onMIDISave, onWAVSave }) => (
    <div>
        <p className="u-mb1 u-txt-small">Note: Saving as MIDI will download all tracks separately. Saving as WAV will combine all tracks.</p>
        <div className="u-flex-row u-flex-wrap">
            <div className="u-mr05">
                <button
                    className="button-primary button-primary--small button-primary--positive"
                    onClick={ onMIDISave }
                >
                    Save as MIDI
                </button>
            </div>
            <div className="">
                <button
                    className="button-primary button-primary--small button-primary--positive"
                    onClick={ onWAVSave }
                >
                    Save as WAV
                </button>
            </div>
        </div>
    </div>
)

const launchSaveModal = (audioPlaylist, enableModal, disableModal) => {
    const saveMIDI = () => {
        Tracking.sendSaveEvent('midi')
        buildAndSaveMidi(audioPlaylist)
    }
    const saveWAV = () => {
        Tracking.sendSaveEvent('wav')
        saveAudioPlaylistAsWav(audioPlaylist)
    }
    const content = (
        <SaveModal
            onMIDISave={ compose(disableModal, saveMIDI) }
            onWAVSave={ compose(disableModal, saveWAV) }
        />
    )
    enableModal({ className: 'modal--small', content, isCloseable: true, title: 'Save' })
}

const SaveController = (props) => {
    const { audioPlaylist, actions } = props
    const isDisabled = !audioPlaylist.length
    const onClick = () => {
        Tracking.sendSaveEvent('open')
        launchSaveModal(audioPlaylist, actions.enableModal, actions.disableModal)
    }
    return (
        <IconButton
            icon="save"
            isDisabled={isDisabled}
            onClick={onClick}
            theme="alpha-dark"
        >
            Save
        </IconButton>
    )
}

const mapStateToProps = state => ({
    audioPlaylist: state.sound.audioPlaylist
})

const actions = {
    ...modalActions
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveController)

import React from 'react'
import { compose, map } from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as modalActions from 'actions/modal'

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

const ExportModal = ({ onMIDISave, onWAVSave }) => (
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

const launchExportModal = (audioPlaylist, enableModal, disableModal) => {
    const saveMIDI = () => {
        Tracking.sendSaveEvent('midi')
        buildAndSaveMidi(audioPlaylist)
    }
    const saveWAV = () => {
        Tracking.sendSaveEvent('wav')
        saveAudioPlaylistAsWav(audioPlaylist)
    }
    const content = (
        <ExportModal
            onMIDISave={ compose(disableModal, saveMIDI) }
            onWAVSave={ compose(disableModal, saveWAV) }
        />
    )
    enableModal({ content, isCloseable: true, title: 'Export' })
}

const ExportController = (props) => {
    const { audioPlaylist, actions } = props
    const onClick = () => {
        Tracking.sendSaveEvent('open')
        launchExportModal(audioPlaylist, actions.enableModal, actions.disableModal)
    }
    return (
        <button
            className="button-primary button-primary--alpha-dark button-primary--tiny"
            onClick={onClick}
            disabled={false}
        >
            Save
        </button>
    )
}

function mapStateToProps(state) {
    return {
        audioPlaylist: state.sound.audioPlaylist,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...modalActions
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportController)

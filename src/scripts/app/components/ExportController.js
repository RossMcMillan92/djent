import React from 'react';
import { compose } from 'ramda';

import { renderAudioPlaylistItemToBuffer } from '../utils/audio';
import { buildMidiDataURIFromInstruments } from '../utils/midi';
import { saveAsWAVFile, saveAsMIDIFile } from '../utils/save';
import { logError } from '../utils/tools';

const buildAndSaveMidi = compose(
    saveAsMIDIFile,
    buildMidiDataURIFromInstruments,
);

//    saveAudioPlaylistAsWav :: audioPlaylist -> WAV
const saveAudioPlaylistAsWav = audioPlaylist => renderAudioPlaylistItemToBuffer(audioPlaylist)
    .fork(logError, saveAsWAVFile);

const ExportModal = ({ actions }) => (
    <div className="u-flex-row u-flex-wrap">
        <div className="u-mr05">
            <button
                className="button-primary button-primary--small button-primary--positive"
                onClick={ () => { actions.saveMIDI(); actions.disableModal(); } }
            >
                Save as MIDI
            </button>
        </div>
        <div className="">
            <button
                className="button-primary button-primary--small button-primary--positive"
                onClick={ () => { actions.saveWAV(); actions.disableModal(); } }
            >
                Save as WAV
            </button>
        </div>
    </div>
);

const launchExportModal = (audioPlaylist, actions) => {
    const content = (
        <ExportModal actions={{
            disableModal: actions.disableModal,
            // saveMIDI: () => buildAndSaveMidi(instruments, bpm),
            saveWAV: () => saveAudioPlaylistAsWav(audioPlaylist),
        }} />
    );
    actions.enableModal({ content, isCloseable: true, title: 'Export' });
};

const ExportController = props => {
    const { audioPlaylist, actions } = props;
    return (
        <button
            className="button-primary button-primary--alpha-dark button-primary--tiny"
            onClick={() => launchExportModal(audioPlaylist, actions)}
            disabled={false}
        >
            Save
        </button>
    );
};

export default ExportController;

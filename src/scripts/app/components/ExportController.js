import React from 'react';
import { compose, map } from 'ramda';

import { renderAudioPlaylistItemToBuffer } from '../utils/audio';
import { buildMidiDataURIFromInstruments } from '../utils/midi';
import { saveAsFile } from '../utils/save';
import { logError } from '../utils/tools';

//    buildAndSaveMidi :: audioPlaylist -> ()
const buildAndSaveMidi = compose(
    map(({ title, url }) => saveAsFile('mid', title, url)),
    map(({ id, instruments, bpm }) => ({
        title: `djen-track-${id}`,
        url: buildMidiDataURIFromInstruments(instruments, bpm)
    })),
);

//    saveAudioPlaylistAsWav :: audioPlaylist -> ()
const saveAudioPlaylistAsWav = audioPlaylist => renderAudioPlaylistItemToBuffer(audioPlaylist)
    .fork(logError, saveAsFile('wav', 'djen'));

const ExportModal = ({ actions }) => (
    <div>
        <p className="u-mb1 u-txt-small">Note: Saving as MIDI will download all tracks separately. Saving as WAV will download a single combination of all tracks.</p>
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
    </div>
);

const launchExportModal = (audioPlaylist, actions) => {
    const content = (
        <ExportModal actions={{
            disableModal: actions.disableModal,
            saveMIDI: () => buildAndSaveMidi(audioPlaylist),
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

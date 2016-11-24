import React from 'react';
import { compose, map } from 'ramda';

import { renderAudioPlaylistItemToBuffer } from '../utils/audio';
import { buildMidiDataURIFromInstruments } from '../utils/midi';
import { saveAsWAVFile, saveAsMIDIFile } from '../utils/save';
import { logError, trace } from '../utils/tools';

const combineAudioPlaylistInstruments = audioPlaylist => {
    const newAudioPlaylist = audioPlaylist
        .map(({ instruments }) => instruments
            .map(({ id, sounds, hitTypes, sequence }) => ({
                id,
                sounds: [ ...sounds ],
                hitTypes: [ ...hitTypes ],
                sequence: [ ...sequence ]
            })))
        .reduce((result, playlistItemInstruments, index) => {
            if (result.length === 0) return playlistItemInstruments;
            let newResult = result;
            playlistItemInstruments
                .forEach(instrument => {
                    console.log('INSTRUMENT', instrument)
                })
            return newResult;
        }, []);
    console.log('NEWAUDIOPLAYLIST', newAudioPlaylist);
};

const buildAndSaveMidi = compose(
    // saveAsMIDIFile,
    trace('midi'),
    map((playlistItem) => buildMidiDataURIFromInstruments(playlistItem.instruments, playlistItem.bpm)),
    trace('midi'),
    combineAudioPlaylistInstruments,
    trace('whit'),
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

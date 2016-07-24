import React, { Component } from 'react';

import { saveAsWAVFile, saveAsMIDIFile } from '../utils/save';
import { buildMidiDataURIFromInstruments } from '../utils/midi';

const ExportModal = ({ actions }) => (
    <div className="u-flex-row u-flex-wrap">
        <p className="txt-error u-txt-small u-mb05">
            Warning: Exporting MIDI is experimental, you may encounter some&nbsp;innacuracies.
        </p>
        <div className="group-spacing-y-small u-mr05 u-mb0">
            <button className="button-primary button-primary--small button-primary--positive" onClick={ () => { actions.saveMIDI(); actions.disableModal() } } >Save as MIDI</button>
        </div>
        <div className="group-spacing-y-small u-mb0">
            <button className="button-primary button-primary--small button-primary--positive" onClick={ () => { actions.saveWAV(); actions.disableModal() } } >Save as WAV</button>
        </div>
    </div>
);

class ExportController extends Component {
    saveMIDI = () => saveAsMIDIFile(buildMidiDataURIFromInstruments(this.props.instruments, this.props.bpm))
    saveWAV = () => saveAsWAVFile(this.props.currentBuffer);

    launchExportModal = () => {
        const content = <ExportModal actions={{
            disableModal: this.props.actions.disableModal,
            saveMIDI: this.saveMIDI,
            saveWAV: this.saveWAV,
        }} />
        this.props.actions.enableModal({ content, isCloseable: true, title: 'Export' });
    }

    render = () => (
        <button className="button-primary" onClick={this.launchExportModal} disabled={!this.props.currentBuffer}>
            Save
        </button>
    )
}

export default ExportController;

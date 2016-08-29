import React, { Component } from 'react';

import InstrumentList from '../components/InstrumentList';
import Panel from '../components/Panel';

export default class Instruments extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render = () => (
        <Panel>
            <InstrumentList
                actions={{
                    disableModal: this.props.actions.disableModal,
                    enableModal: this.props.actions.enableModal,
                    updateInstrumentSound: this.props.actions.updateInstrumentSound,
                    updateInstrumentPitch: this.props.actions.updateInstrumentPitch,
                    updateInstrumentVolume: this.props.actions.updateInstrumentVolume,
                    updateInstrumentRepeatingHits: this.props.actions.updateInstrumentRepeatingHits,
                    updateInstrumentSequences: this.props.actions.updateInstrumentSequences,
                }}
                sequences={this.props.sequences}
                instruments={this.props.instruments}
            />
        </Panel>
    );
}

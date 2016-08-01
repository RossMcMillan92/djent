import React, { Component } from 'react';

import InstrumentList from '../components/InstrumentList';
import Panel from '../components/Panel';

export default class Instruments extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render = () => (
        <Panel>
            <h2 className="title-primary">Instruments</h2>

            <InstrumentList
                actions={{
                    disableModal: this.props.actions.disableModal,
                    enableModal: this.props.actions.enableModal,
                    updateInstrumentSound: this.props.actions.updateInstrumentSound,
                    updateInstrumentPitch: this.props.actions.updateInstrumentPitch,
                    updateInstrumentSequences: this.props.actions.updateInstrumentSequences,
                }}
                sequences={this.props.sequences}
                instruments={this.props.instruments}
            />
        </Panel>
    );
}

import React, { Component } from 'react'
import InstrumentList from 'components/InstrumentList'

export default class Instruments extends Component {
    render = () => (
        <div className={ this.props.className }>
            <InstrumentList
                onSoundToggle={ this.props.actions.updateInstrumentSound }
                actions={{
                    updateInstrumentPitch: this.props.actions.updateInstrumentPitch,
                    updateInstrumentVolume: this.props.actions.updateInstrumentVolume,
                    updateInstrumentRepeatingHits: this.props.actions.updateInstrumentRepeatingHits,
                    updateInstrumentSequences: this.props.actions.updateInstrumentSequences,
                    updateInstrumentFadeOutDuration: this.props.actions.updateInstrumentFadeOutDuration,
                }}
                sequences={this.props.sequences}
                instruments={this.props.instruments}
            />
        </div>
    )
}

import React, { Component } from 'react';
import { predefinedSequences } from '../utils/sequences';

class SequenceController extends Component {
    onSequenceClick = ({ enabledSequences, sequenceID }) => {
        const index = enabledSequences.indexOf(sequenceID);
        const newInstrumentSequences = index > -1
            ? [ ...enabledSequences.slice(0, index), ...enabledSequences.slice(index + 1, enabledSequences.length) ]
            : [ ...enabledSequences, sequenceID ];
        this.props.actions.updateInstrumentSequences(this.props.instrumentID, newInstrumentSequences);
    }

    renderSequences = (sequences, enabledSequences) =>
        Object.keys(sequences)
            .map((sequenceID, i) => {
                const sequence = sequences[sequenceID];
                const isEnabled = enabledSequences.includes(sequenceID);

                return (
                    <div className={`toggle-input ${isEnabled ? 'is-enabled' : ''}`} onClick={() => this.onSequenceClick({ enabledSequences, sequenceID })} key={i}>
                        { sequence.description ? unescape(sequence.description) : sequence.id }
                    </div>
                );
            });

    render = () => (
        <div>
            <div className="u-mb1">
                <p className="title-secondary u-mb05">Randomised Sequences</p>
                { this.renderSequences(this.props.randomisedSequences, [ ...this.props.instrumentSequences ]) }
            </div>
            <div className="">
                <p className="title-secondary u-mb05">Predefined Sequences</p>
                { this.renderSequences(predefinedSequences, [ ...this.props.instrumentSequences ]) }
            </div>
        </div>
    );
}

export default SequenceController;

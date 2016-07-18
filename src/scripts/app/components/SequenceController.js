import React from 'react';

const SequenceController = (props) => (
    <div>
        <h2 className="input-label">Sequences:</h2>
        <ul className="cleanlist">
            {
                Object.keys(props.sequences)
                    .map((sequenceID, i) => {
                        const sequence = props.sequences[sequenceID];
                        const isEnabled =
                            props.instrumentSequences.includes(sequence.sequence)
                         || props.instrumentSequences.includes(sequence.id);

                        return (
                            <li className={`toggle-input ${ isEnabled ? 'is-enabled' : '' }`} key={i}>{ sequence.description || sequence.id }</li>
                        );
                    })
            }
        </ul>
    </div>
);

export default SequenceController;

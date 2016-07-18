import React from 'react';

const SequenceController = (props) => (
    <div>
        <h2 className="title-primary">Sequences:</h2>
        <ul className="sound-list">
            {
                Object.keys(props.sequences)
                    .map((sequenceID, i) => {
                        const sequence = props.sequences[sequenceID];
                        const isEnabled =
                            props.instrumentSequences.includes(sequence.sequence)
                         || props.instrumentSequences.includes(sequence.description);

                        return (
                            <li className={`sound-list__item ${ isEnabled ? 'is-enabled' : '' }`} key={i}>{sequence.description}</li>
                        );
                    })
            }
        </ul>
    </div>
);

export default SequenceController;

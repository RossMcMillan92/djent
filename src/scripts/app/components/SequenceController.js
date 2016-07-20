import React from 'react';
import { predefinedSequences } from '../utils/sequences';

const SequenceController = (props) => (
    <div>
        <div className="u-mb1">
            <p className="title-secondary u-mb05">Randomised Sequences</p>
            {
                Object.keys(props.randomisedSequences)
                    .map((sequenceID, i) => {
                        const sequence = props.randomisedSequences[sequenceID];
                        const isEnabled = props.instrumentSequences.includes(sequenceID);

                        return (
                            <div className={`toggle-input ${ isEnabled ? 'is-enabled' : '' }`} key={i}>{ sequence.description || sequence.id }</div>
                        );
                    })
            }
        </div>
        <div className="">
            <p className="title-secondary u-mb05">Predefined Sequences</p>
            {
                Object.keys(predefinedSequences)
                    .map((sequenceID, i) => {
                        const sequence = predefinedSequences[sequenceID];
                        const isEnabled = props.instrumentSequences.includes(sequenceID);

                        return (
                            <div className={`toggle-input ${ isEnabled ? 'is-enabled' : '' }`} key={i}>{ sequence.description || sequence.id }</div>
                        );
                    })
            }
        </div>
    </div>
);

export default SequenceController;

import React, { Component } from 'react';
import deepEqual from 'deep-equal';

import NotePanel from './NotePanel';

class AllowedLengthsController extends Component {
    shouldComponentUpdate = (nextProps) => !deepEqual(nextProps.allowedLengths, this.props.allowedLengths);

    render = () => {
        const { allowedLengths, actions } = this.props;
        const totalAmount = allowedLengths.reduce((a,b) => a + b.amount, 0);
        const notePanelProps = {
            actions,
            allowedLengths,
            totalAmount,
        }

        const lengths = allowedLengths
            .map((length, i) => (
                <div className="grid__item one-fifth gamma--one-third beta--one-half palm--one-whole" key={i} >
                    <div className="u-mb1" key={i} >
                        <NotePanel length={length} { ...notePanelProps } />
                    </div>
                </div>
                )
            );

        return (
            <div className="grid grid--center">
                { lengths }
            </div>
        );
    }
}

export default AllowedLengthsController;

import React, { Component } from 'react';

import InputBox from './InputBox';

class BPMController extends Component {
    onBPMChange = (event) => {
        const bpm = parseFloat(event.target.value);
        this.props.actions.updateBPM(bpm);
    }

    render = () => {
        const props = {
            id: 'bpm',
            label: 'BPM',
            type: 'number',
            defaultValue: this.props.bpm,
            onChange: this.onBPMChange,
            step: 5,
            className: 'input-base',
            labelClassName: 'input-label',
        }

        return (
            <InputBox { ...props } />
        );
    }
}

export default BPMController;

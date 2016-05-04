import React, { Component } from 'react';

import InputBox from './InputBox';

class BPMController extends Component {
    onBPMChange = (event) => {
        const bpm = parseFloat(event.target.value);
        this.props.actions.updateBPM(bpm);
    }

    render = () => {
        const props = {
            label: 'BPM',
            type: 'number',
            defaultValue: this.props.bpm,
            onChange: this.onBPMChange
        }
        return (
            <InputBox { ...props } />
        );
    }
}

export default BPMController;

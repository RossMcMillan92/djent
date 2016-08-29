import React, { Component } from 'react';

import InputBox from './InputBox';

class BPMController extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.bpm !== this.props.bpm;

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
            minVal: 50,
            maxVal: 300,
            step: 5,
            className: 'input-base input-base--bare input-base--large input-base--short',
            labelClassName: 'input-label',
        };

        return <InputBox { ...props } />;
    }
}

export default BPMController;

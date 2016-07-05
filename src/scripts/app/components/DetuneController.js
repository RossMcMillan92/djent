import React, { Component } from 'react';

import InputBox from './InputBox';

class HitChanceController extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.detune !== this.props.detune;

    onChange = (event) => {
        const value = Math.round(parseFloat(event.target.value));
        if (value) this.props.actions.updateInstrumentDetune(value);
    }

    render = () => {
        const props = {
            label: 'Detune (-1200 - 1200)',
            id: 'detune',
            type: 'number',
            defaultValue: this.props.detune,
            onChange: this.onChange,
            step: 5,
            className: 'input-base',
            labelClassName: 'input-label',
        }
        return (
            <InputBox { ...props } />
        );
    }
}

export default HitChanceController;

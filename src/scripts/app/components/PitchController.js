import React, { Component } from 'react';

import InputBox from './InputBox';

class HitChanceController extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.pitch !== this.props.pitch;

    onChange = (event) => {
        const value = Math.round(parseFloat(event.target.value) * 100);
        if (value) this.props.actions.updateInstrumentPitch({ instrumentID: this.props.id, value });
    }

    render = () => {
        const props = {
            label: 'Pitch (-12 - 12)',
            id: 'pitch',
            type: 'number',
            defaultValue: this.props.pitch ? this.props.pitch / 100 : 0,
            onChange: this.onChange,
            step: 1,
            className: 'input-base',
            labelClassName: 'input-label',
        }
        return (
            <InputBox { ...props } />
        );
    }
}

export default HitChanceController;

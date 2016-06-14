import React, { Component } from 'react';

import InputBox from './InputBox';

class HitChanceController extends Component {
    onChange = (event) => {
        const value = parseFloat(event.target.value) / 100;
        if (value) this.props.actions.updateHitChance(value);
    }

    render = () => {
        const props = {
            label: 'Hit Chance (%)',
            id: 'hitChance',
            type: 'number',
            defaultValue: this.props.hitChance * 100,
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

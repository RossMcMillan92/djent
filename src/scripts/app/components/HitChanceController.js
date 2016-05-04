import React, { Component } from 'react';

import InputBox from './InputBox';

class HitChanceController extends Component {
    onChange = (event) => {
        const value = parseFloat(event.target.value);
        if (value) this.props.actions.updateHitChance(value);
    }

    render = () => {
        const props = {
            label: 'Hit Chance',
            id: 'hitChance',
            type: 'number',
            defaultValue: this.props.hitChance,
            onChange: this.onChange
        }
        return (
            <InputBox { ...props } />
        );
    }
}

export default HitChanceController;

import React, { Component } from 'react'

import InputBox from 'components/InputBox'

class HitChanceController extends Component {
    shouldComponentUpdate = nextProps => nextProps.hitChance !== this.props.hitChance

    onChange = (event) => {
        const value = Math.round(parseFloat(event.target.value)) / 100
        if (value) this.props.onUpdate(value)
    }

    render = () => {
        const props = {
            label: 'Hit Chance (%)',
            id: 'hitChance',
            type: 'number',
            defaultValue: Math.round(this.props.hitChance * 100),
            onChange: this.onChange,
            minVal: 0,
            maxVal: 100,
            step: 5,
            className: 'input-base input-base--bare input-base--large input-base--short',
            labelClassName: 'input-label',
        }

        return (
            <InputBox { ...props } />
        )
    }
}

export default HitChanceController

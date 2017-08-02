import React, { Component } from 'react'
import InputBox from 'components/InputBox'

class PitchController extends Component {
    shouldComponentUpdate = nextProps => nextProps.pitch !== this.props.pitch

    onChange = (event) => {
        const value = Math.round(parseFloat(event.target.value) * 100)
        this.props.onUpdate(value)
    }

    render = () => {
        const props = {
            label: 'Pitch',
            id: `pitch-${this.props.instrumentID}`,
            type: 'number',
            defaultValue: this.props.pitch ? this.props.pitch / 100 : 0,
            onChange: this.onChange,
            step: 1,
            minVal: -12,
            maxVal: 12,
            className: 'input-container__input input-container__input--bare input-container__input--large input-container__input--short@above-alpha',
            labelClassName: 'input-container__label',
        }
        return (
            <InputBox { ...props } />
        )
    }
}

export default PitchController

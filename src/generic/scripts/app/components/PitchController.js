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
            id: 'pitch',
            type: 'number',
            defaultValue: this.props.pitch ? this.props.pitch / 100 : 0,
            onChange: this.onChange,
            step: 1,
            minVal: -12,
            maxVal: 12,
            className: 'input-base input-base--bare input-base--large input-base--short',
            labelClassName: 'input-label',
        }
        return (
            <InputBox { ...props } />
        )
    }
}

export default PitchController

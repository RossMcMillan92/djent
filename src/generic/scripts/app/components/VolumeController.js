import React, { Component } from 'react'

import InputBox from 'components/InputBox'

class VolumeController extends Component {
    shouldComponentUpdate = nextProps => nextProps.volume !== this.props.volume

    onChange = (event) => {
        const value = parseFloat(event.target.value) / 100
        this.props.onUpdate(value)
    }

    render = () => {
        const props = {
            label: 'Volume %',
            id: `volume-${this.props.instrumentID}`,
            type: 'number',
            defaultValue: typeof this.props.volume !== 'undefined' ? this.props.volume * 100 : 100,
            onChange: this.onChange,
            step: 10,
            minVal: 0,
            maxVal: 100,
            className: 'input-container__input input-container__input--bare input-container__input--large input-container__input--short@above-alpha',
            labelClassName: 'input-container__label',
        }

        return (
            <InputBox { ...props } />
        )
    }
}

export default VolumeController

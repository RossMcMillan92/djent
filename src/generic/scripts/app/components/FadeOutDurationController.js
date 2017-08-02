import React, { Component } from 'react'

import InputBox from 'components/InputBox'
import { roundToXPlaces } from 'utils/tools'

class FadeOutDurationController extends Component {
    shouldComponentUpdate = nextProps => nextProps.fadeOutDuration !== this.props.fadeOutDuration

    onChange = (event) => {
        const value = roundToXPlaces(3, parseFloat(event.target.value)) / 1000
        this.props.onUpdate(value)
    }

    render = () => {
        const props = {
            label: 'Crossfade (ms)',
            labelTitle: 'Samples\' crossfade time in milliseconds',
            id: `fadeOutDuration-${this.props.instrumentID}`,
            type: 'number',
            defaultValue: Math.round(this.props.fadeOutDuration * 1000),
            onChange: this.onChange,
            step: 25,
            minVal: 0,
            maxVal: 2000,
            className: 'input-container__input input-container__input--bare input-container__input--large input-container__input--short@above-alpha',
            labelClassName: 'input-container__label',
        }
        return (
            <InputBox { ...props } />
        )
    }
}

export default FadeOutDurationController

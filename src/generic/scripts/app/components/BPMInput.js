import React from 'react'
import { compose } from 'ramda'
import { getTargetValueFromEvent } from 'modules/events'
import InputBox from 'components/InputBox'

const BPMInput = ({ bpm, className, containerClassName, id, label, labelClassName, onChange }) => {
    const inputProps = {
        id,
        label,
        type: 'number',
        defaultValue: bpm,
        onChange: compose(
            onChange,
            parseFloat,
            getTargetValueFromEvent
        ),
        minVal: 50,
        maxVal: 300,
        step: 5,
        className: className || 'input-container__input input-container__input--bare input-container__input--large input-container__input--short@above-alpha',
        labelClassName: labelClassName || 'input-container__label',
        containerClassName: containerClassName || 'input-container input-container--light',
    }

    return <InputBox { ...inputProps } />
}

export default BPMInput

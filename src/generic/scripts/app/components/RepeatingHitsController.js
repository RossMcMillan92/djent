import React, { Component } from 'react'
import { compose } from 'ramda'
import { getTargetValueFromEvent } from 'modules/events'

import InputBox from 'components/InputBox'
import { roundToXPlaces } from 'utils/tools'

class RepeatingHitsController extends Component {
    shouldComponentUpdate = nextProps => nextProps.repeatHitTypeForXBeat !== this.props.repeatHitTypeForXBeat

    onChange = compose(
        this.props.onUpdate,
        roundToXPlaces(1),
        getTargetValueFromEvent,
    )

    render = () => {
        const props = {
            label: 'Repeating Hits',
            labelTitle: 'Each sample will repeat for x number of beats',
            id: 'repeatHitTypeForXBeat',
            type: 'number',
            defaultValue: this.props.repeatHitTypeForXBeat ? this.props.repeatHitTypeForXBeat : 0,
            onChange: this.onChange,
            step: 0.5,
            minVal: 0,
            maxVal: 200,
            className: 'input-base input-base--bare input-base--large input-base--short\@above-alpha',
            labelClassName: 'input-label',
        }
        return (
            <InputBox { ...props } />
        )
    }
}

export default RepeatingHitsController

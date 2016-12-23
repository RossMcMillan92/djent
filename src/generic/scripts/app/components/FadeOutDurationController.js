import React, { Component } from 'react';
import InputBox from './InputBox';
import { roundToXPlaces } from 'utils/tools';

class FadeOutDurationController extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.fadeOutDuration !== this.props.fadeOutDuration;

    onChange = (event) => {
        const value = roundToXPlaces(parseFloat(event.target.value), 3) / 1000;
        console.log('THIS.PROPS', this.props)
        this.props.actions.updateInstrumentFadeOutDuration({ instrumentID: this.props.id, value });
    }

    render = () => {
        const props = {
            label: 'Crossfade (ms)',
            labelTitle: 'Samples\' crossfade time in milliseconds',
            id: 'fadeOutDuration',
            type: 'number',
            defaultValue: Math.round(this.props.fadeOutDuration * 1000),
            onChange: this.onChange,
            step: 25,
            minVal: 0,
            maxVal: 2000,
            className: 'input-base input-base--bare input-base--large input-base--short',
            labelClassName: 'input-label',
        };
        return (
            <InputBox { ...props } />
        );
    }
}

export default FadeOutDurationController;

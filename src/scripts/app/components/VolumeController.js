import React, { Component } from 'react';

import InputBox from './InputBox';

class VolumeController extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.volume !== this.props.volume;

    onChange = (event) => {
        const value = parseFloat(event.target.value) / 100;
        this.props.actions.updateInstrumentVolume({ instrumentID: this.props.id, value });
    }

    render = () => {
        const props = {
            label: 'Volume %',
            id: 'volume',
            type: 'number',
            defaultValue: typeof this.props.volume !== 'undefined' ? this.props.volume * 100 : 100,
            onChange: this.onChange,
            step: 10,
            minVal: 0,
            maxVal: 100,
            className: 'input-base input-base--bare input-base--large input-base--short',
            labelClassName: 'input-label',
        };

        return (
            <InputBox { ...props } />
        );
    }
}

export default VolumeController;

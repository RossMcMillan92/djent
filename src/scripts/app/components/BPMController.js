import React, { Component } from 'react';
import { compose } from 'ramda';

import { getTargetValueFromEvent } from '../modules/events';
import InputBox from './InputBox';

const BPMController = (props) => {
    const inputProps = {
        id: 'bpm',
        label: 'BPM',
        type: 'number',
        defaultValue: props.bpm,
        onChange: compose(
            props.actions.updateBPM,
            parseFloat,
            getTargetValueFromEvent
        ),
        minVal: 50,
        maxVal: 300,
        step: 5,
        className: 'input-base input-base--bare input-base--large input-base--short',
        labelClassName: 'input-label',
    };

    return <InputBox { ...inputProps } />;
}

export default BPMController;

import React, { Component } from 'react';
import InputBox from '../components/InputBox';

const onLoopChange = (event, callback) => {
    const isLooping = event.target.checked;
    callback(isLooping);
}

const LoopController = (props) => {
    const inputProps = {
        id: 'loop',
        label: 'Loop',
        type: 'checkbox',
        defaultChecked: props.isLooping,
        onChange: event => onLoopChange(event, props.actions.updateIsLooping)
    }

    return (
        <InputBox { ...inputProps } />
    );
}

export default LoopController;

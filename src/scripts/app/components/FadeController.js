import React, { Component } from 'react';
import InputBox from '../components/InputBox';

const onLoopChange = (event, callback) => {
    const fadeIn = event.target.checked;
    console.log('FADEIN', fadeIn)
    callback(fadeIn);
}

const FadeController = (props) => {
    const inputProps = {
        id: 'fadeIn',
        label: 'Fade In',
        type: 'checkbox',
        defaultChecked: props.fadeIn,
        onChange: event => onLoopChange(event, props.actions.updateFadeIn)
    }

    return (
        <InputBox { ...inputProps } />
    );
}

export default FadeController;

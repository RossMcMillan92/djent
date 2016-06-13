import React, { Component } from 'react';
import Switch from '../components/Switch';

const FadeController = (props) => {
    const inputProps = {
        id: 'fadeIn',
        label: 'Fade In',
        isActive: props.fadeIn,
        onChange: () => props.actions.updateFadeIn(!props.fadeIn),
    }

    return (
        <Switch { ...inputProps } />
    );
}

export default FadeController;

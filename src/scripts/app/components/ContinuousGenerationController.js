import React, { Component } from 'react';
import Switch from '../components/Switch';

const ContinuousGenerationController = (props) => {
    const inputProps = {
        id: 'continuousGeneration',
        label: 'Continuous',
        isActive: props.continuousGeneration,
        onChange: () => props.actions.updateContinuousGeneration(!props.continuousGeneration),
    }

    return (
        <Switch { ...inputProps } />
    );
}

export default ContinuousGenerationController;

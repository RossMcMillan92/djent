import React from 'react';
import Switch from '../components/Switch';

const ContinuousGenerationController = (props) => {
    const inputProps = {
        id: 'continuousGeneration',
        label: 'Continuous',
        labelClassName: 'input-label u-txt-light',
        isActive: props.continuousGeneration,
        onChange: () => props.actions.updateContinuousGeneration(!props.continuousGeneration),
    };

    return (
        <Switch { ...inputProps } />
    );
};

export default ContinuousGenerationController;

import React from 'react';
import Switch from '../components/Switch';

const LoopController = (props) => {
    const inputProps = {
        id: 'loop',
        label: 'Loop',
        labelClassName: 'input-label u-txt-light',
        isActive: props.isLooping,
        onChange: () => props.actions.updateIsLooping(!props.isLooping),
    };

    return (
        <Switch { ...inputProps } />
    );
};

export default LoopController;

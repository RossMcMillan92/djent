import React, { Component } from 'react';

const InputBox = ({ defaultValue, defaultChecked, onChange, label, type }) => {
    let inputProps   = {
        id             : label,
        type           : type ? type : 'text',
        defaultValue   : defaultValue ? defaultValue : '',
        defaultChecked : defaultChecked ? defaultChecked : '',
        onChange       : onChange ? onChange : '',
    };

    return (
        <div>
            <label htmlFor={ label }>{ label }:</label>
            <input { ...inputProps } />
        </div>
    )
}

export default InputBox;

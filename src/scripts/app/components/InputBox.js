import React, { Component } from 'react';

const InputBox = ({ defaultValue, defaultChecked, onChange, label, id, type }) => {
    let inputProps   = {
        id             : id,
        type           : type ? type : 'text',
        defaultValue   : defaultValue ? defaultValue : '',
        defaultChecked : defaultChecked ? defaultChecked : '',
        onChange       : onChange ? onChange : '',
    };

    return (
        <div>
            <label htmlFor={ id }>{ label }:</label>
            <input { ...inputProps } />
        </div>
    )
}

export default InputBox;

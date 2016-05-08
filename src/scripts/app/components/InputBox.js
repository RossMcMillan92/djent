import React, { Component } from 'react';

const InputBox = (props) => {
    const inputProps   = {
        id                 : id,
        type               : 'text',
        defaultValue       : '',
        defaultChecked     : '',
        onChange           : '',
        className          : 'input-base',
        containerClassName : 'input-container',
        labelClassName     : 'input-label-base',
        ...props
    };
    const { containerClassName, labelClassName, label, id } = inputProps;

    return (
        <div className={containerClassName}>
            <label className={ labelClassName } htmlFor={ id }>{ label }:</label>
            <input { ...inputProps } />
        </div>
    )
}

export default InputBox;

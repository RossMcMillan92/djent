import React, { Component } from 'react';

class InputBox extends Component {
    componentWillUpdate = (nextProps, nextState) => {
        this.refs.input.value = nextProps.defaultValue
    }

    render = () => {
        const inputProps   = {
            id                 : '',
            type               : 'text',
            defaultValue       : '',
            defaultChecked     : '',
            onChange           : '',
            className          : 'input-base',
            containerClassName : 'input-container',
            labelClassName     : 'input-label-base',
            ...this.props
        };
        const { containerClassName, labelClassName, label, id } = inputProps;

        return (
            <div className={containerClassName}>
                <label className={ labelClassName } htmlFor={ id }>{ label }:</label>
                <input ref="input" { ...inputProps } />
            </div>
        )
    }
}

export default InputBox;

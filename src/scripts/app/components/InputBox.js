import React, { Component } from 'react';
import { filterOutKeys, throttle } from '../utils/tools';

class InputBox extends Component {
    isFocused = false;

    componentWillUpdate = (nextProps) => {
        if (!this.isFocused) this.updateValue(nextProps.defaultValue);
    }

    updateValue = (val) => {
        this.refs.input.value = val;
    }

    onFocus = () => {
        this.isFocused = true;
    }

    onBlur = () => {
        this.isFocused = false;
        this.updateValue(this.props.defaultValue);
    }

    onChange = (e) => {
        e.persist();
        if (this.throttledOnChange) this.throttledOnChange(e);
    }

    throttledOnChange = this.props.onChange ? throttle(this.props.onChange, 100) : undefined;

    render = () => {
        const defaultProps   = {
            id                 : '',
            type               : 'text',
            defaultValue       : '',
            defaultChecked     : '',
            onChange           : '',
            className          : 'input-base',
            containerClassName : 'input-container',
            labelClassName     : 'input-label-base',
            ...this.props,
        };
        const { containerClassName, labelClassName, label, id } = defaultProps;
        const inputProps = filterOutKeys(['containerClassName', 'labelClassName'], defaultProps);

        return (
            <div className={containerClassName}>
                <label className={ labelClassName } htmlFor={ id }>{ label }:</label>
                <input ref="input" { ...inputProps } onChange={ this.onChange } onBlur={this.onBlur} onFocus={this.onFocus} />
            </div>
        );
    }
}

export default InputBox;

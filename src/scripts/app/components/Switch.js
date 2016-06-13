import React, { Component } from 'react';

class Switch extends Component {
    render = () => {
        const inputProps   = {
            id                 : '',
            type               : 'checkbox',
            defaultChecked     : '',
            onChange           : '',
            className          : 'switch-input__input',
            containerClassName : 'switch-input',
            labelClassName     : 'input-label',
            ...this.props
        };
        const { containerClassName, labelClassName, label, id } = inputProps;

        return (
            <div className='switch-input' onClick={this.props.onChange}>
                <label className={ labelClassName } htmlFor={ id }>{ label }:</label>
                <div className={`switch-input__toggle ${this.props.isActive ? 'is-active' : ''}`}></div>
            </div>
        )
    }
}

export default Switch;

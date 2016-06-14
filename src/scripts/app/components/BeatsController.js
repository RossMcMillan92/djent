import React, { Component } from 'react';

import { capitalize } from '../utils/tools';
import InputBox from './InputBox';

class BeatsController extends Component {
    onChange = (event, type) => {
        const [ prop, value ] = [event.target.getAttribute('id'), parseFloat(event.target.value)];
        this.props.actions.updateBeats(this.props.beat.id, prop, value);
    }

    render = () => {
        const getProps = (type) => {
            return {
                type: 'number',
                id: type,
                label: capitalize(type),
                defaultValue : this.props.beat[type],
                onChange: (event) => this.onChange(event, type),
                className: 'input-base',
                labelClassName: 'input-label',
            }
        }

        return (
            <div>
                <div className="u-dib">
                    <InputBox { ...getProps('bars') } />
                </div>
                <span className="group-spacing-x-small">&times;</span>
                <div className="u-dib">
                    <InputBox { ...getProps('beats') } />
                </div>
            </div>
        );
    }
}

export default BeatsController;

import React, { Component } from 'react';
import deepEqual from 'deep-equal';

import { capitalize } from '../utils/tools';
import InputBox from './InputBox';

class BeatsController extends Component {
    shouldComponentUpdate = (nextProps) => !deepEqual(nextProps.beat, this.props.beat);

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
            <div className="u-flex-row u-flex-center">
                <div className="u-flex-grow-1">
                    <InputBox { ...getProps('bars') } />
                </div>
                <span className="group-spacing-x-small u-mt1">&times;</span>
                <div className="u-flex-grow-1">
                    <InputBox { ...getProps('beats') } />
                </div>
            </div>
        );
    }
}

export default BeatsController;

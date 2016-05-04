import React, { Component } from 'react';

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
                label: type,
                defaultValue : this.props.beat[type],
                onChange: (event) => this.onChange(event, type)
            }
        }

        return (
            <div>
                <InputBox { ...getProps('bars') } />
                 x
                <InputBox { ...getProps('beats') } />
            </div>
        );
    }
}

export default BeatsController;

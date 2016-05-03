import React, { Component } from 'react';

import InputBox from './InputBox';

class BeatsController extends Component {
    componentWillMount = () => {

    }

    onChange = (event, type) => {
        const id = this.props.id;
        const [ prop, value ] = [event.target.getAttribute('id'), parseFloat(event.target.value)];
        this.props.actions.updateBeats(this.props.id, prop, value);
    }

    render = () => {
        console.log('this.props', this.props)
        const getProps = (type) => {
            return {
                type: 'number',
                id: type,
                label: type,
                defaultValue : this.props.beats.find(beat => beat.id === this.props.id)[type],
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

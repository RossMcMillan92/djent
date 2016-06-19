import React, { Component } from 'react';

import InputBox from './InputBox';
import NotePanel from './NotePanel';
import SVG from './SVG';
import { repeatArray } from '../utils/tools';

class Expandable extends Component {
    isPristine = true;

    constructor (props) {
        super();

        const lsValue = props.enableStateSave && window.localStorage ? window.localStorage.getItem(`expandable-${escape(props.title)}`) === 'true' : false;

        this.state = {
            isExpanded: props.isExpanded || lsValue
        }
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.isExpanded !== this.state.isExpanded && nextProps.isExpanded !== undefined && this.isPristine) {
            this.setState({ isExpanded: nextProps.isExpanded });
        }
    }

    onClick = () => {
        const newValue = !this.state.isExpanded;
        this.setState({ isExpanded: newValue });
        this.isPristine = false

        if (this.props.enableStateSave && window.localStorage) {
            window.localStorage.setItem(`expandable-${escape(this.props.title)}`, newValue)
        }
    }

    render = () => {
        return (
            <div className={`expandable ${ this.state.isExpanded ? 'is-expanded' : '' } ${ this.props.className ? this.props.className : '' }`}>
                <div className={`expandable__title ${this.props.titleClassName ? this.props.titleClassName : ''}`} onClick={this.onClick}>
                    { this.props.title }
                </div>
                <div className={`expandable__body ${this.props.bodyClassName ? this.props.bodyClassName : ''}`} onClick={() => this.isPristine = false}>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default Expandable;

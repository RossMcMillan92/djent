import React, { Component } from 'react';

import InputBox from './InputBox';
import NotePanel from './NotePanel';
import SVG from './SVG';
import { repeatArray } from '../utils/tools';

class Expandable extends Component {
    isPristine = true;

    constructor (props) {
        super();

        this.state = {
            isExpanded: props.isExpanded || false
        }
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.isExpanded !== this.state.isExpanded && this.isPristine) {
            this.setState({ isExpanded: nextProps.isExpanded });
        }
    }

    onClick = () => {
        this.setState({ isExpanded: !this.state.isExpanded });
        this.isPristine = false
    }

    render = () => {
        return (
            <div className={`expandable ${ this.state.isExpanded ? 'is-expanded' : '' } ${ this.props.className ? this.props.className : '' }`}>
                <div className={`expandable__title ${this.props.titleClassName}`} onClick={this.onClick}>
                    { this.props.title }
                </div>
                <div className={`expandable__body ${this.props.bodyClassName}`} onClick={() => this.isPristine = false}>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default Expandable;

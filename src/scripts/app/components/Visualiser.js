import React, { Component } from 'react';

import Waveform      from './Waveform';

class Visualiser extends Component {
    containerWidth = 0;

    componentDidUpdate = (nextProps) => {
        this.containerWidth = this.refs.container.offsetWidth;

        console.log(nextProps)
    }

    render = () => {
        return (
            <div ref="container">
                <Waveform buffer={this.props.currentBuffer} width={this.containerWidth} height={100} color="#1b8a94" amplified={true} />
                <Waveform buffer={this.props.currentBuffer} width={this.containerWidth} height={100} color="#1b8a94" />
            </div>
        );
    }
}

export default Visualiser;

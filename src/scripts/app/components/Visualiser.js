import React, { Component } from 'react';

import Waveform      from './Waveform';

class Visualiser extends Component {
    containerWidth = 0;

    componentDidUpdate = (nextProps) => {
        this.containerWidth = this.refs.container.offsetWidth;
    }

    render = () => {
        return (
            <div ref="container">
                <Waveform
                    isPlaying={this.props.isPlaying}
                    buffer={this.props.currentBuffer}
                    currentSrc={this.props.currentSrc}
                    width={this.containerWidth}
                    height={100}
                    color="#1b8a94"
                    amplified={true}
                />
            </div>
        );
    }
}

export default Visualiser;

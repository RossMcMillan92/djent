import React, { Component } from 'react';
import deepEqual from 'deep-equal';

import Waveform from './Waveform';
import audioContext from '../utils/audioContext';
import { getBufferFromAudioTemplate } from '../utils/instruments';

import {
    getTotalTimeLength,
} from '../utils/sequences';

class Visualiser extends Component {
    containerWidth = 0;

    state = {
        buffer: undefined,
    }

    shouldComponentUpdate = (nextProps) => !deepEqual(nextProps.currentAudioTemplate, this.props.currentAudioTemplate);

    componentWillMount = () => {
        this.renderBuffer(this.props.beats, this.props.bpm, this.props.currentAudioTemplate.audioTemplate);
    }

    componentWillUpdate = (nextProps) => {
        this.renderBuffer(nextProps.beats, nextProps.bpm, nextProps.currentAudioTemplate.audioTemplate);
    }

    renderBuffer = (beats, bpm, audioTemplate) => {
        this.timeLength = getTotalTimeLength(beats, bpm);
        getBufferFromAudioTemplate(audioTemplate, this.timeLength)
            .then(buffer => this.setState({ buffer }));
    }

    componentDidUpdate = () => {
        this.containerWidth = this.refs.container.offsetWidth;
    }

    render = () => (
        <div ref="container" className={`visualiser ${!this.state.buffer ? 'is-inactive' : ''}`}>
            <Waveform
                className="visualiser__canvas"
                isPlaying={this.props.isPlaying}
                buffer={this.state.buffer}
                audioContext={audioContext}
                timeLength={this.timeLength}
                width={this.containerWidth}
                height={40}
                color="#1b8a94"
                amplified={true}
            />
            <span className='visualiser__msg'>{ this.props.pretext }</span>
        </div>
    );
}

export default Visualiser;

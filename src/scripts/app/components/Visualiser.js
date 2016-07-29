import React, { Component } from 'react';

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

    shouldComponentUpdate = (nextProps, nextState) =>
        nextProps.currentAudioTemplate.id !== this.props.currentAudioTemplate.id
        || nextState.buffer !== this.state.buffer
        || nextProps.isPlaying !== this.props.isPlaying;

    componentWillMount = () => {
        this.renderBuffer(this.props.beats, this.props.bpm, this.props.currentAudioTemplate.audioTemplate);
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.currentAudioTemplate.id !== this.props.currentAudioTemplate.id) {
            this.renderBuffer(nextProps.beats, nextProps.bpm, nextProps.currentAudioTemplate.audioTemplate);
        }
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
                audioStartTime={this.props.currentAudioTemplate.audioStartTime}
                timeLength={this.timeLength}
                width={this.containerWidth}
                height={40}
                amplified={true}
            />
            <span className='visualiser__msg'>{ this.props.pretext }</span>
        </div>
    );
}

export default Visualiser;

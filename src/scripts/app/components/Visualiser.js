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
        audioStartTime: undefined
    }

    shouldComponentUpdate = (nextProps, nextState) =>
        nextProps.currentAudioTemplate.id !== this.props.currentAudioTemplate.id
        || nextProps.currentAudioTemplate.audioStartTime !== this.props.currentAudioTemplate.audioStartTime
        || nextState.buffer !== this.state.buffer
        || nextProps.isPlaying !== this.props.isPlaying;

    componentWillMount = () => {
        this.renderBuffer(this.props.sequences, this.props.bpm, this.props.currentAudioTemplate.audioTemplate, this.props.currentAudioTemplate.audioStartTime);
    }

    componentWillUpdate = (nextProps) => {
        console.log('NEXTPROPS.CURRENTAUDIOTEMPLATE.ID', nextProps.currentAudioTemplate.id)
        if (nextProps.currentAudioTemplate.id !== this.props.currentAudioTemplate.id) {
            const timeoutLength = (nextProps.currentAudioTemplate.audioStartTime - audioContext.currentTime) * 1000;
            this.renderBuffer(nextProps.sequences, nextProps.bpm, nextProps.currentAudioTemplate.audioTemplate, nextProps.currentAudioTemplate.audioStartTime, timeoutLength);
        }
    }

    renderBuffer = (sequences, bpm, audioTemplate, audioStartTime, timeoutLength = 0) => {
        this.timeLength = getTotalTimeLength(sequences, bpm);
        getBufferFromAudioTemplate(audioTemplate, this.timeLength)
            .then(buffer => {
                setTimeout(() => this.setState({ buffer, audioStartTime }), timeoutLength);
            });
    }

    componentDidUpdate = () => {
        const { container } = this.refs;
        const padding = 10;
        this.containerWidth = container.offsetWidth - padding;
    }

    render = () => (
        <div ref="container" className={`visualiser ${!this.state.buffer || !this.props.isPlaying ? 'is-inactive' : ''}`}>
            <Waveform
                className="visualiser__canvas"
                isPlaying={this.props.isPlaying}
                buffer={this.state.buffer}
                audioContext={audioContext}
                audioStartTime={this.state.audioStartTime}
                timeLength={this.timeLength}
                width={this.containerWidth}
                height={50}
                amplified={true}
            />
            <span className='visualiser__msg'>{ this.props.pretext }</span>
        </div>
    );
}

export default Visualiser;

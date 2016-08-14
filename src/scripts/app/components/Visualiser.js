import React, { Component } from 'react';

import Waveform from './Waveform';

import ShareController from '../containers/ShareController';
import ExportController from '../containers/ExportController';

import audioContext from '../utils/audioContext';
import { getBufferFromAudioTemplate } from '../utils/instruments';

import {
    getTotalTimeLength,
} from '../utils/sequences';

class Visualiser extends Component {
    containerWidth = 0;

    state = {
        buffer: undefined,
        audioStartTime: undefined,
        isRenderingBuffer: false,
    }

    componentWillMount = () => {
        if (this.props.currentAudioTemplate) {
            this.setState({ isRenderingBuffer: true });
            this.renderBuffer(this.props.sequences, this.props.bpm, this.props.currentAudioTemplate.audioTemplate, this.props.currentAudioTemplate.audioStartTime);
        }
    }

    componentWillUpdate = (nextProps) => {
        if (!this.props.isPlaying && nextProps.isPlaying) {
            this.setState({ audioStartTime: audioContext.currentTime });
        }
        const firstAudioTemplate = nextProps.currentAudioTemplate && !this.props.currentAudioTemplate;
        const differentAudioTemplate = !firstAudioTemplate && nextProps.currentAudioTemplate && nextProps.currentAudioTemplate.id !== this.props.currentAudioTemplate.id;
        if (firstAudioTemplate || differentAudioTemplate) {
            const timeoutLength = (nextProps.currentAudioTemplate.audioStartTime - audioContext.currentTime) * 1000;
            this.setState({ isRenderingBuffer: true });
            this.renderBuffer(nextProps.sequences, nextProps.bpm, nextProps.currentAudioTemplate.audioTemplate, nextProps.currentAudioTemplate.audioStartTime, timeoutLength);
        }
    }

    componentWillUnmount = () => {
        if (this.updateBufferTimeout) clearTimeout(this.updateBufferTimeout);
    }

    renderBuffer = (sequences, bpm, audioTemplate, audioStartTime, timeoutLength = 0) => {
        if (typeof audioTemplate === 'undefined') return;
        if (this.updateBufferTimeout) clearTimeout(this.updateBufferTimeout);

        this.timeLength = getTotalTimeLength(sequences, bpm);
        getBufferFromAudioTemplate(audioTemplate, this.timeLength)
            .then(buffer => {
                this.updateBufferTimeout = setTimeout(() => this.setState({ buffer, audioStartTime, isRenderingBuffer: false }), timeoutLength);
            });
    }

    componentDidUpdate = () => {
        const { container } = this.refs;
        this.containerWidth = container.offsetWidth;
    }

    render = () => (
        <div ref="container" className={`visualiser ${typeof this.state.buffer !== 'undefined' ? 'is-active' : ''}`}>
            <div className="u-flex-row u-flex-wrap u-flex-start">
                <Waveform
                    className="visualiser__canvas"
                    isPlaying={this.props.isPlaying}
                    isLoading={this.state.isRenderingBuffer}
                    buffer={this.state.buffer}
                    audioContext={audioContext}
                    audioStartTime={this.state.audioStartTime}
                    timeLength={this.timeLength}
                    width={this.containerWidth}
                    height={50}
                    amplified={true}
                />

                <div className="visualiser__button-container">
                    <div className="u-mr05">
                        <ExportController buffer={ this.state.buffer } />
                    </div>

                    <ShareController googleAPIHasLoaded={this.props.googleAPIHasLoaded} />
                </div>
            </div>

            <div className="visualiser__placeholder"></div>
        </div>
    );
}

export default Visualiser;

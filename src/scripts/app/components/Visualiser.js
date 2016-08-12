import React, { Component } from 'react';

import ExportController from './ExportController';
import Waveform from './Waveform';

import ShareController from '../containers/ShareController';

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

    componentWillMount = () => {
        if (this.props.currentAudioTemplate) {
            this.renderBuffer(this.props.sequences, this.props.bpm, this.props.currentAudioTemplate.audioTemplate, this.props.currentAudioTemplate.audioStartTime);
        }
    }

    componentWillUpdate = (nextProps) => {
        if (!this.props.isPlaying && nextProps.isPlaying) {
            console.log('restart here')
            this.setState({ audioStartTime: audioContext.currentTime });
        }
        const firstAudioTemplate = nextProps.currentAudioTemplate && !this.props.currentAudioTemplate;
        const differentAudioTemplate = !firstAudioTemplate && nextProps.currentAudioTemplate.id !== this.props.currentAudioTemplate.id;
        if (firstAudioTemplate || differentAudioTemplate) {
            const timeoutLength = (nextProps.currentAudioTemplate.audioStartTime - audioContext.currentTime) * 1000;
            this.renderBuffer(nextProps.sequences, nextProps.bpm, nextProps.currentAudioTemplate.audioTemplate, nextProps.currentAudioTemplate.audioStartTime, timeoutLength);
        }
    }

    renderBuffer = (sequences, bpm, audioTemplate, audioStartTime, timeoutLength = 0) => {
        if (typeof audioTemplate === 'undefined') return;

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
        <div ref="container" className={`visualiser ${typeof this.state.buffer !== 'undefined' ? 'is-active' : ''}`}>
            <div className="u-flex-row u-flex-wrap u-flex-start">
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

                <div className="group-spacing-y-small u-mr05 u-mb0">
                    <ExportController
                        instruments={ this.props.instruments }
                        bpm={ this.props.bpm }
                        buffer={ this.state.buffer }
                        actions={{
                            disableModal: this.props.actions.disableModal,
                            enableModal: this.props.actions.enableModal,
                        }}
                    />
                </div>

                <div className="group-spacing-y-small">
                    <ShareController googleAPIHasLoaded={this.props.googleAPIHasLoaded} />
                </div>
            </div>

            <div className="visualiser__placeholder"></div>
        </div>
    );
}

export default Visualiser;

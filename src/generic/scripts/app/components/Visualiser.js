import React, { Component } from 'react'

import Waveform from 'components/Waveform'

import audioContext from 'utils/audioContext'
import { renderBuffer } from 'utils/audio'
import { logError } from 'utils/tools'

class Visualiser extends Component {
    containerWidth = 0

    state = {
        buffer: undefined,
        isRenderingBuffer: false,
    }

    componentWillMount = () => {
        if (this.props.currentPlaylistItem) {
            const props = this.props
            this.setState({ isRenderingBuffer: true })
            this.updateBuffer(props.audioStartTime, props.currentPlaylistItem, props.sequences, props.bpm)
        }
    }

    componentWillUpdate = (nextProps) => {
        const firstAudioTemplate = nextProps.currentPlaylistItem && !this.props.currentPlaylistItem
        const differentAudioTemplate = !firstAudioTemplate && nextProps.currentPlaylistItem && nextProps.currentPlaylistItem.id !== this.props.currentPlaylistItem.id
        if (firstAudioTemplate || differentAudioTemplate) {
            this.updateBuffer(nextProps.audioStartTime, nextProps.currentPlaylistItem, nextProps.sequences, nextProps.bpm)
        }
    }

    componentWillUnmount = () => {
        if (this.updateBufferTimeout) clearTimeout(this.updateBufferTimeout)
    }

    componentDidUpdate = () => {
        const { container } = this.refs
        this.containerWidth = container.offsetWidth
    }

    updateBuffer = (audioStartTime, currentPlaylistItem, sequences, bpm) => {
        const timeoutLength = (audioStartTime - audioContext.currentTime) * 1000
        this.setState({ isRenderingBuffer: true })
        const audioTemplate = currentPlaylistItem.audioTemplate
        if (typeof audioTemplate === 'undefined') return
        if (this.updateBufferTimeout) clearTimeout(this.updateBufferTimeout)
        renderBuffer({ sequences, bpm, audioTemplate })
            .fork(logError, (buffer) => {
                this.updateBufferTimeout = setTimeout(() => this.setState({ buffer, isRenderingBuffer: false }), timeoutLength)
            })
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
                    audioStartTime={this.props.audioStartTime}
                    timeLength={this.state.buffer ? this.state.buffer.duration : 0}
                    width={this.containerWidth}
                    height={75}
                    amplified={true}
                />
            </div>
        </div>
    )
}

export default Visualiser

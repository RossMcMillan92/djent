import React, { Component } from 'react'

import Waveform from 'components/Waveform'

import audioContext from 'utils/audioContext'
import { renderBuffer } from 'utils/audio'
import { logError } from 'utils/tools'

class Visualiser extends Component {
    state = {
        buffer: undefined,
        containerWidth: 0,
        isEmpty: true,
        isRenderingBuffer: false,
    }

    componentWillMount = () => {
        if (this.props.currentPlaylistItem) {
            const props = this.props
            this.updateBuffer(props.audioStartTime, props.currentPlaylistItem, props.sequences, props.bpm)
        }
    }

    componentDidMount = () => {
        this.setContainerWidth()
    }

    componentWillUpdate = (nextProps) => {
        if (!nextProps.currentPlaylistItem && !this.state.isEmpty) {
            this.setState({ isEmpty: true })
        }
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
        this.setContainerWidth()
    }

    setContainerWidth = () => {
        const { container } = this.refs
        if (container.offsetWidth !== this.state.containerWidth) {
            this.setState({ containerWidth: container.offsetWidth })
        }
    }

    updateBuffer = (audioStartTime, currentPlaylistItem, sequences, bpm) => {
        const timeoutLength = (audioStartTime - audioContext.currentTime) * 1000
        this.setState({ isEmpty: false, isRenderingBuffer: true })
        const audioTemplate = currentPlaylistItem.audioTemplate
        if (typeof audioTemplate === 'undefined') return
        if (this.updateBufferTimeout) clearTimeout(this.updateBufferTimeout)
        renderBuffer({ sequences, bpm, audioTemplate })
            .fork(logError, (buffer) => {
                this.updateBufferTimeout = setTimeout(() => this.setState({ buffer, isRenderingBuffer: false }), timeoutLength)
            })
    }

    render = () => {
        return (
            <div ref="container" className="visualiser">
                <Waveform
                    className="visualiser__canvas"
                    isIdle={this.state.isEmpty}
                    isPlaying={this.props.isPlaying}
                    isLoading={this.state.isRenderingBuffer}
                    buffer={this.state.buffer}
                    audioContext={audioContext}
                    audioStartTime={this.props.audioStartTime}
                    timeLength={this.state.buffer ? this.state.buffer.duration : 0}
                    width={this.state.containerWidth}
                    height={75}
                    amplified={true}
                />
                <div className={`visualiser__idle-msg-bg ${this.state.isEmpty ? 'is-active' : ''} u-flex-row u-flex-center u-flex-justify-center`}>
                    <div className="visualiser__idle-msg">
                        Hit the Generate button to begin!
                    </div>
                </div>
            </div>
        )
    }
}

export default Visualiser

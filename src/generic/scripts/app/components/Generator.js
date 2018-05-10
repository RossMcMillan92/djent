import React, { Component } from 'react'

import { getGenerationID, generatePlaylistItem } from 'utils/riffs'

import { logError } from 'utils/tools'

class Generator extends Component {
  state = {
    isLoading: false
  }
  generationCount = 0

  generateEvent = () => {
    if (this.props.disabled) return
    if (this.props.onGenerationStart) this.props.onGenerationStart()
    if (!this.state.isLoading) {
      this.setState({ isLoading: true })
      return this.generateFromProps().fork(logError, (playlistItem) => {
        this.setState({ isLoading: false })
        this.props.onGenerationEnd(playlistItem)
        return playlistItem
      })
    }
  }

  generateFromProps = () => {
    const {
      audioPlaylist, bpm, sequences, instruments
    } = this.props
    this.generationCount = getGenerationID(
      this.generationCount + 1,
      audioPlaylist
    )
    return generatePlaylistItem(
      this.generationCount,
      bpm,
      sequences,
      instruments
    )
  }

  render = () => {
    const Wrapper = this.props.wrapperComponent
      ? this.props.wrapperComponent
      : 'button'

    const wrapperProps = {
      onClick: () => this.generateEvent(),
      disabled: this.props.disabled,
      title: this.props.disabled
        ? "Can't generate while the track is locked"
        : 'Generate',
      className: this.props.wrapperClass
        ? this.props.wrapperClass
        : `button-primary button-primary--gamma button-primary--small-icon ${
          this.props.buttonClassAppended ? this.props.buttonClassAppended : ''
        } ${this.state.isLoading ? '' : 'icon-is-hidden'}`
    }

    const children = this.props.children ? (
      this.props.children
    ) : (
      <span>
        <span className="button-primary__inner">
          {this.props.innerText || 'Generate'}
        </span>
        <span className="button-primary__icon">
          <span className="spinner spinner--light" />
        </span>
      </span>
    )

    return <Wrapper {...wrapperProps}>{children}</Wrapper>
  }
}

export default Generator

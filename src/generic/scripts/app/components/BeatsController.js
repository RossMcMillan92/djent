import React, { Component } from 'react'
import deepEqual from 'deep-equal'

import { capitalize } from 'utils/tools'
import InputBox from 'components/InputBox'

class BeatsController extends Component {
  shouldComponentUpdate = nextProps =>
    !deepEqual(nextProps.sequence, this.props.sequence)

  onChange = (event, type) => {
    const value = parseFloat(event.target.value)
    this.props.onUpdate(this.props.sequence.id, type, value)
  }

  render = () => {
    const { labelPrefix, sequence, theme } = this.props
    const getProps = type => ({
      type: 'number',
      id: `${sequence.id}-${type}`,
      label: capitalize((labelPrefix || '') + type),
      defaultValue: sequence[type],
      onChange: event => this.onChange(event, type),
      minVal: 1,
      maxVal: 16,
      containerClassName: `input-container ${theme
        ? `input-container--${theme}`
        : ''}`,
      labelClassName: 'input-container__label',
      className:
        'input-container__input input-container__input--bare input-container__input--large input-container__input--short@above-alpha',
    })

    return (
      <div className="u-flex-row u-flex-center">
        <div>
          <InputBox {...getProps('bars')} />
        </div>
        <span
          className={`group-spacing-x-small u-mt1 ${theme === 'light'
            ? 'u-txt-light'
            : ''}`}
        >
          &times;
        </span>
        <div>
          <InputBox {...getProps('beats')} />
        </div>
      </div>
    )
  }
}

export default BeatsController

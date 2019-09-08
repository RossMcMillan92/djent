import React, { Component } from 'react'

import getAbsolutePath from 'modules/getAbsolutePath'
import getPercentage from 'modules/getPercentage'
import { capitalize } from 'utils/tools'

const getNewAllowedLength = (allowedLength, prop, value) => {
  const newObj = { ...allowedLength }
  newObj[prop] = value
  return newObj
}

const absolutePath = getAbsolutePath()

class NotePanel extends Component {
  onLengthAmountChange = (event, value) => {
    const { length } = this.props
    const { amount } = length
    const newAmount = amount + value

    if (newAmount < 0) return

    this.updateAllowedLength(length, 'amount', newAmount)
  }

  onModifierClick = (m1, m2) => {
    const { length } = this.props
    const newValue = !length[m1]
    let newAllowedLength = getNewAllowedLength(length, m1, newValue)
    if (newValue && length[m2]) {
      newAllowedLength = getNewAllowedLength(newAllowedLength, m2, false)
    }
    this.props.onUpdate(newAllowedLength)
  }

  updateAllowedLength = (length, prop, value) => {
    const newAllowedLength = getNewAllowedLength(length, prop, value)
    this.props.onUpdate(newAllowedLength)
  }

  render = () => {
    const { length, totalAmount } = this.props
    const noteName = `${capitalize(length.name)} note`
    const percentage = totalAmount
      ? getPercentage(totalAmount, length.amount)
      : 0
    const isOn = length.amount > 0

    return (
      <div className={`note-panel ${isOn ? '' : 'note-panel--disabled'}`}>
        <div className="u-flex-row u-flex-justify-center">
          <div className="note-panel__icon-container">
            <img
              className="note-panel__icon"
              src={`${absolutePath}assets/images/notes/${length.name}.svg`}
              alt={noteName}
              title={noteName}
            />
          </div>
        </div>
        <div className="note-panel__amount-container">
          <span className="note-panel__amount" title="Chance">
            {percentage}%
          </span>
          <div className="note-panel__btn-container">
            <button
              className={`note-panel__btn note-panel__btn--${length.name} note-panel__btn--up`}
              title="Increase chance"
              onClick={e => this.onLengthAmountChange(e, 1)}
            ></button>
            <button
              className={`note-panel__btn note-panel__btn--${length.name} note-panel__btn--down`}
              title="Decrease chance"
              onClick={e => this.onLengthAmountChange(e, -1)}
            ></button>
          </div>
        </div>
        <div className="note-panel__checkbox-container u-flex-row u-flex-justify-center">
          <div>
            <div
              className={`toggle-input toggle-input--triplet u-txt-small u-txt-light ${
                length.isTriplet ? 'is-enabled' : ''
              }`}
              onClick={() => this.onModifierClick('isTriplet', 'isDotted')}
            >
              Triplet
            </div>
            <div
              className={`toggle-input toggle-input--dotted u-txt-small u-txt-light ${
                length.isDotted ? 'is-enabled' : ''
              }`}
              onClick={() => this.onModifierClick('isDotted', 'isTriplet')}
            >
              Dotted
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotePanel

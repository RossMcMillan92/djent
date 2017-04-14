import React, { Component } from 'react'

import getAbsolutePath from 'modules/getAbsolutePath'
import getPercentage from 'modules/getPercentage'
import { capitalize } from 'utils/tools'

const getNewAllowedLengths = (allowedLengths, id, prop, value) =>
    allowedLengths.map((obj) => {
        if (obj.id !== id) return obj
        const newObj = { ...obj }
        newObj[prop] = value
        return newObj
    })

const absolutePath = getAbsolutePath()

class NotePanel extends Component {
    onLengthAmountChange = (event, value) => {
        const { id, amount } = this.props.length
        const newAmount = amount + value

        if (newAmount < 0) return

        this.updateAllowedLengthsByID(id, 'amount', newAmount)
    }

    onModifierClick = (m1, m2) => {
        const { length } = this.props
        const newValue = !length[m1]
        let newAllowedLengths = getNewAllowedLengths(this.props.allowedLengths, length.id, m1, newValue)
        if (newValue && length[m2]) {
            newAllowedLengths = getNewAllowedLengths(newAllowedLengths, length.id, m2, false)
        }
        this.props.onUpdate(newAllowedLengths)
    }

    updateAllowedLengthsByID = (id, prop, value) => {
        const newAllowedLengths = getNewAllowedLengths(this.props.allowedLengths, id, prop, value)
        this.props.onUpdate(newAllowedLengths)
    }

    render = () => {
        const { length, totalAmount } = this.props
        const noteName = `${capitalize(length.name)} note`
        const percentage = totalAmount ? getPercentage(totalAmount, length.amount) : 0
        const isOn = length.amount > 0

        return (
            <div className={`note-panel ${isOn ? '' : 'note-panel--disabled'}`}>
                <img className="note-panel__svg" src={`${absolutePath}assets/images/notes/${length.name}.svg`} alt={noteName} title={noteName} />
                <div className="note-panel__amount-container">
                    <span className="note-panel__amount" title="Chance">{percentage}%</span>
                    <div className="note-panel__btn-container">
                        <button className="note-panel__btn note-panel__btn--up" title="Increase chance" onClick={e => this.onLengthAmountChange(e, 1)}></button>
                        <button className="note-panel__btn note-panel__btn--down" title="Decrease chance" onClick={e => this.onLengthAmountChange(e, -1)}></button>
                    </div>
                </div>
                <div className="note-panel__checkbox-container u-flex-row u-flex-justify-center">
                    <div>
                        <div className={`toggle-input u-txt-small u-txt-light ${length.isTriplet ? 'is-enabled' : ''}`} onClick={() => this.onModifierClick('isTriplet', 'isDotted')} >Triplet</div>
                        <div className={`toggle-input u-txt-small u-txt-light ${length.isDotted ? 'is-enabled' : ''}`} onClick={() => this.onModifierClick('isDotted', 'isTriplet')} >Dotted</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default NotePanel

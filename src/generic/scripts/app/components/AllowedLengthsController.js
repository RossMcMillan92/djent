import React, { Component } from 'react'
import deepEqual from 'deep-equal'
import { update } from 'ramda'

import NotePanel from 'components/NotePanel'

class AllowedLengthsController extends Component {
    shouldComponentUpdate = nextProps => !deepEqual(nextProps.allowedLengths, this.props.allowedLengths)

    onLengthUpdate = (newLength) => {
        const { allowedLengths, onUpdate } = this.props
        const newLengthIndex = allowedLengths.indexOf(allowedLengths.find(l => newLength.id === l.id))
        const newAllowedLengths = update(newLengthIndex, newLength, allowedLengths)
        onUpdate(newAllowedLengths)
    }

    render = () => {
        const { allowedLengths } = this.props
        const totalAmount = allowedLengths
            .reduce((acc, next) => acc + next.amount, 0)
        const notePanelProps = {
            onUpdate: this.onLengthUpdate,
            totalAmount,
        }
        const lengths = allowedLengths
            .map((length, i) => (
                    <div className="grid__item one-fifth alpha--one-third" key={i} >
                        <div className="u-mb1" key={i} >
                            <NotePanel length={length} { ...notePanelProps } />
                        </div>
                    </div>
                )
            )

        return (
            <div className="grid grid--center">
                { lengths }
            </div>
        )
    }
}

export default AllowedLengthsController

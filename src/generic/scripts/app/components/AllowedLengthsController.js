import React, { Component } from 'react'
import deepEqual from 'deep-equal'

import NotePanel from 'components/NotePanel'

class AllowedLengthsController extends Component {
    shouldComponentUpdate = nextProps => !deepEqual(nextProps.allowedLengths, this.props.allowedLengths)

    render = () => {
        const { allowedLengths, onUpdate } = this.props
        const totalAmount = allowedLengths.reduce((a, b) => a + b.amount, 0)
        const notePanelProps = {
            onUpdate,
            allowedLengths,
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

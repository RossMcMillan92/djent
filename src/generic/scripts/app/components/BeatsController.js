import React, { Component } from 'react'
import deepEqual from 'deep-equal'

import { capitalize } from 'utils/tools'
import InputBox from './InputBox'

class BeatsController extends Component {
    shouldComponentUpdate = (nextProps) => !deepEqual(nextProps.sequence, this.props.sequence)

    onChange = (event, type) => {
        const prop = type
        const value = parseFloat(event.target.value)
        this.props.actions.updateSequence(this.props.sequence.id, prop, value)
    }

    render = () => {
        const getProps = (type) => ({
            type: 'number',
            id: `${this.props.sequence.id}-${type}`,
            label: capitalize((this.props.labelPrefix ? this.props.labelPrefix : '') + type),
            defaultValue : this.props.sequence[type],
            onChange: (event) => this.onChange(event, type),
            className: 'input-base input-base--bare input-base--large input-base--short',
            minVal: 1,
            maxVal: 16,
            labelClassName: 'input-label',
        })

        return (
            <div className="u-flex-row u-flex-center">
                <div className="">
                    <InputBox { ...getProps('bars') } />
                </div>
                <span className="group-spacing-x-small u-mt1">&times;</span>
                <div className="">
                    <InputBox { ...getProps('beats') } />
                </div>
            </div>
        )
    }
}

export default BeatsController

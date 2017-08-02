import React from 'react'
import { bindActionCreators } from 'redux'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { updateBPM } from 'actions/config'
import { getTargetValueFromEvent } from 'modules/events'
import InputBox from 'components/InputBox'

const BPMController = (props) => {
    const inputProps = {
        id: 'bpm',
        label: 'BPM',
        type: 'number',
        defaultValue: props.bpm,
        onChange: compose(
            props.actions.updateBPM,
            parseFloat,
            getTargetValueFromEvent
        ),
        minVal: 50,
        maxVal: 300,
        step: 5,
        className: 'input-container__input input-container__input--bare input-container__input--large input-container__input--short@above-alpha',
        labelClassName: 'input-container__label',
        containerClassName: 'input-container input-container--light',
    }

    return <InputBox { ...inputProps } />
}

const mapStateToProps = state => ({
    bpm: state.config.bpm,
})

const actions = {
    updateBPM,
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BPMController)
export {
    BPMController
}

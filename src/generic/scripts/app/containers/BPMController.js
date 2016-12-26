import React from 'react'
import { bindActionCreators } from 'redux'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { updateBPM } from 'actions/config'
import presets from 'utils/presets'

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
        className: 'input-base input-base--bare input-base--large input-base--short',
        labelClassName: 'input-label',
    }

    return <InputBox { ...inputProps } />
}

const mapStateToProps = state => ({
    bpm: state.config.bpm,
    preset: presets.find(preset => preset.id === state.config.activePresetID),
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateBPM,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BPMController)

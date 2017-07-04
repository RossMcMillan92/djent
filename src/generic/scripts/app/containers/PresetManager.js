import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { applyPreset } from 'actions/config'
import * as modalActions from 'actions/modal'
import PresetController from 'containers/PresetController'
import PresetSaver from 'containers/PresetSaver'

class PresetManager extends Component {
    render = () => (
        <PresetController>
            <PresetSaver />
        </PresetController>
    )
}

const mapStateToProps = (state) => {
    const { config, presets } = state
    return {
        activePresetID   : config.activePresetID,
        presets,
    }
}

const actions = {
    ...modalActions,
    applyPreset,
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PresetManager)
export {
    PresetManager
}

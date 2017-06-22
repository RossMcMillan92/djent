import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { applyPreset } from 'actions/config'
import * as modalActions from 'actions/modal'
import PresetController from 'components/PresetController'
import Spinner from 'components/Spinner'
import PresetSaver from 'containers/PresetSaver'
import { logError } from 'utils/tools'

class PresetManager extends Component {
    loadAndApplyPreset = (preset) => {
        const { actions } = this.props

        actions.enableModal({
            content: (<Spinner subtext={`Loading preset: ${preset.description}`} />),
            isCloseable: false,
            className: 'modal--auto-width',
        })

        preset.load
            .fork(logError, ({ default: fullPreset }) => {
                actions.applyPreset(fullPreset)
                actions.disableModal()
            })
    }
    render = () => {
        const { activePresetID, presets } = this.props

        return (
            <PresetController
                activePresetID={ activePresetID }
                onUpdate={ this.loadAndApplyPreset }
                presets={ presets }
            >
                <PresetSaver />
            </PresetController>
        )
    }
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

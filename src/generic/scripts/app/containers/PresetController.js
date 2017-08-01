import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, curry, map, reduce, update } from 'ramda'
import { applyPreset } from 'actions/config'
import * as modalActions from 'actions/modal'
import Spinner from 'components/Spinner'
import { logError } from 'utils/tools'

//    getPresetFromID :: [preset] -> String -> preset
const getPresetFromID = curry((presets, presetID) => presets.find(preset => preset.id === presetID))

//    getPresetJSX :: preset -> JSX
const getPresetJSX = curry((onClick, preset) => (
    <button
        value={preset.id}
        key={preset.id}
        data-group={preset.group}
        className="grouped-list__item"
        onClick={() => onClick(preset.id)}
    >
        { preset.description || preset.id }
    </button>
))

//    getPresetGroupJSX :: presetGroup -> index -> JSX
const getPresetGroupJSX = (presetGroup, i) => (
    <div key={i} data-group={presetGroup[0].props['data-group']} className="grouped-list">
        <div className="grouped-list__group-header">
            { presetGroup[0].props['data-group'] }
        </div>
        <div className="grouped-list__items">
            { presetGroup }
        </div>
    </div>
)

//    groupPresets :: [preset] -> [[preset]]
const groupPresets = reduce((groups, preset) => {
    const firstPresetInGroup = groups
        .find(group =>
            group
                .find(p => preset.group === p.group))
    if (!firstPresetInGroup) {
        return [
            ...groups,
            [ preset ]
        ]
    }
    const groupIndex = groups.indexOf(firstPresetInGroup)
    const group = groups[groupIndex]
    const newGroup = [
        ...group,
        preset
    ]
    const newGroups = update(groupIndex, newGroup, groups)
    return newGroups
}, [])

class PresetController extends Component {
    shouldComponentUpdate = nextProps => nextProps.activePresetID !== this.props.activePresetID

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

    onChange = event => compose(
        this.loadAndApplyPreset,
        getPresetFromID(this.props.presets),
    )(event)

    launchModal = () => {
    const { actions, presets } = this.props
    const presetItems = groupPresets(presets)
        .map(map(getPresetJSX(this.onChange)))
        .map(getPresetGroupJSX)

        actions.enableModal({
            isCloseable: true,
            title: 'Preset Manager',
            content: (
                <div>
                    { presetItems }
                </div>
            )
        })
    }

    render = () => {
        const { children, presets } = this.props
        const activePreset = presets.find(preset => preset.id === this.props.activePresetID)

        return (
            <div className="u-flex-row">
                <div className="u-mr1" onClick={this.launchModal}>
                    Active Preset: &nbsp;
                    { activePreset.group } > { activePreset.description }
                </div>
                { children }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PresetController)

export {
    groupPresets,
    PresetController
}

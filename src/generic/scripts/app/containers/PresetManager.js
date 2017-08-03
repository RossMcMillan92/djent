import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, curry, map, reduce, update } from 'ramda'
import { applyPreset } from 'actions/config'
import * as modalActions from 'actions/modal'
import PresetSaver from 'containers/PresetSaver'
import Spinner from 'components/Spinner'
import { capitalize, logError } from 'utils/tools'

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
        { unescape(preset.description) || preset.id }
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

const PresetModal = ({ onChange, presets }) => {
    const presetItems = groupPresets(presets)
        .map(map(getPresetJSX(onChange)))
        .map(getPresetGroupJSX)

    return (
        <div>
            <div className="u-mb1">
                { presetItems }
            </div>
            <PresetSaver />
        </div>
    )
}

class PresetManager extends Component {
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

        actions.enableModal({
            isCloseable: true,
            title: 'Preset Manager',
            content: <PresetModal presets={presets} onChange={this.onChange} />
        })
    }

    render = () => {
        const { activePresetID, presets, audioPlaylist } = this.props
        const activePreset = presets.find(preset => preset.id === activePresetID)
        const activePlaylistItem = audioPlaylist.find(preset => preset.id === activePresetID)
        const arrow = <span className="u-txt-small">{'>'}</span>

        return (
            <div className="input-container input-container--light u-curp" onClick={this.launchModal}>
                <label
                    className="input-container__label"
                >
                    Active Preset:
                </label>
                <div className="input-container__input input-container__input--dropdown input-container__input--bare input-container__input--large">
                {
                    activePreset
                        ? <span>{activePreset.group} {arrow} {unescape(activePreset.description)}</span>
                        : activePlaylistItem
                            ? activePlaylistItem.title
                            : `Track ${activePresetID} settings`
                }
                    <div className="input-container__dropdown-icon" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { config, presets, sound } = state
    return {
        activePresetID: config.activePresetID,
        audioPlaylist: sound.audioPlaylist,
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
    groupPresets,
    PresetManager,
    PresetModal
}

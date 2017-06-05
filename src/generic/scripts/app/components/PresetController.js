import React, { Component } from 'react'
import { compose, curry, map, reduce, update } from 'ramda'
import { getTargetValueFromEvent } from 'modules/events'
import { trace } from 'utils/tools'

//    getPresetFromID :: [preset] -> String -> preset
const getPresetFromID = curry((presets, presetID) => presets.find(preset => preset.id === presetID))

//    presetToOption :: preset -> JSX
const presetToOption = (preset) => (
    <option value={preset.id} key={preset.id} data-group={preset.group}>{ preset.description || preset.id }</option>
)

//    presetGroupToOptgroup :: presetGroup -> index -> JSX
const presetGroupToOptgroup = (presetGroup, i) => (
    <optgroup label={presetGroup[0].props['data-group']} key={i}>{ presetGroup }</optgroup>
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
    } else {
        const groupIndex = groups.indexOf(firstPresetInGroup)
        const group = groups[groupIndex]
        const newGroup = [
            ...group,
            preset
        ]
        const newGroups = update(groupIndex, newGroup, groups)
        return newGroups
    }
}, [])

class PresetController extends Component {
    shouldComponentUpdate = nextProps => nextProps.activePresetID !== this.props.activePresetID

    onChange = event => compose(
        this.props.onUpdate,
        getPresetFromID(this.props.presets),
        getTargetValueFromEvent,
    )(event)

    render = () => {
        const { presets } = this.props
        const activePreset = presets.find(preset => preset.id === this.props.activePresetID)
        const presetItems = groupPresets(presets)
            .map(map(presetToOption))
            .map(presetGroupToOptgroup)

        if (!activePreset) presetItems.push(<option value='custom' key={presetItems.length}>Custom</option>)

        return (
            <div>
                <label htmlFor="preset-dropdown" className="input-label">
                    Preset:
                </label>
                <div className="input-container">
                    <select className="input-base input-base--dropdown input-base--bare input-base--large" id="preset-dropdown" onChange={this.onChange} value={activePreset ? this.props.activePresetID : 'custom'}>
                        { presetItems }
                    </select>
                    <div className="input-dropdown-icon"></div>
                </div>
            </div>
        )
    }
}

export default PresetController
export {
    groupPresets
}

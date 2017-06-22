import React, { Component } from 'react'
import { compose, curry, map, reduce, update } from 'ramda'
import { getTargetValueFromEvent } from 'modules/events'

//    getPresetFromID :: [preset] -> String -> preset
const getPresetFromID = curry((presets, presetID) => presets.find(preset => preset.id === presetID))

//    presetToOption :: preset -> JSX
const presetToOption = onClick => preset => (
    <button
        value={preset.id}
        key={preset.id}
        data-group={preset.group}
        className="grouped-list__item"
        onClick={() => onClick(preset.id)}
    >
        { preset.description || preset.id }
    </button>
)

//    presetGroupToOptgroup :: presetGroup -> index -> JSX
const presetGroupToOptgroup = (presetGroup, i) => (
    <div key={i} className="grouped-list">
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

    onChange = event => compose(
        this.props.onUpdate,
        getPresetFromID(this.props.presets),
    )(event)

    render = () => {
        const { children, presets } = this.props
        const activePreset = presets.find(preset => preset.id === this.props.activePresetID)
        const presetItems = groupPresets(presets)
            .map(map(presetToOption(this.onChange)))
            .map(presetGroupToOptgroup)

        if (!activePreset) presetItems.push(<option value='custom' key={presetItems.length}>Custom</option>)

        return (
            <div>
                <div>
                    Active Preset: &nbsp;
                    { activePreset.group } > { activePreset.description }
                </div>
                { presetItems }
                { children }
            </div>
        )
    }
}

export default PresetController
export {
    groupPresets
}

import React, { Component } from 'react'
import { compose, curry } from 'ramda'
import { getTargetValueFromEvent } from 'modules/events'

//    getPresetFromID :: [preset] -> String -> preset
const getPresetFromID = curry((presets, presetID) => presets.find(preset => preset.id === presetID))

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
        const presetItems = presets
            .map((preset, i) => (
                <option value={preset.id} key={i}>{ preset.description || preset.id }</option>
            ))

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

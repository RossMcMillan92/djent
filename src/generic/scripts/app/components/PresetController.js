import React, { Component } from 'react'
import presets from 'utils/presets'

class PresetController extends Component {
    shouldComponentUpdate = nextProps => nextProps.activePresetID !== this.props.activePresetID

    onChange = (event) => {
        const presetID = event.target.value
        this.props.actions.applyPreset(presets.find(preset => preset.id === presetID))
    }

    render = () => {
        const activePreset = presets.find(preset => preset.id === this.props.activePresetID)
        const presetItems = presets
            .map((preset, i) => (
                <option value={preset.id} key={i}>{ preset.description || preset.id }</option>
            ))

        if (!activePreset) presetItems.push(<option value='custom' key={presetItems.length}>Custom</option>)

        return (
            <div className="input-container">
                <label htmlFor="preset-dropdown" className="u-visually-hidden">
                    Preset picker
                </label>
                <select className="input-base input-base--dropdown" id="preset-dropdown" onChange={e => this.onChange(e)} value={activePreset ? this.props.activePresetID : 'custom'}>
                    { presetItems }
                </select>
                <div className="input-dropdown-icon"></div>
            </div>
        )
    }
}

export default PresetController

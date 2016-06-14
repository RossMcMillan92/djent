import React, { Component } from 'react';

import InputBox from './InputBox';
import presets from '../utils/presets';

class PresetController extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.activePresetID !== this.props.activePresetID;

    onChange = (event) => {
        const id = event.target.value;
        this.props.actions.applyPreset(id);
    }

    render = () => {
        const presetItems = presets
            .map((preset, i) => (
                <option value={preset.id} key={i}>{ preset.description || preset.id }</option>
            ))

        return (
            <div>
                <select onChange={(e) => this.onChange(e)} defaultValue={this.props.activePresetID}>
                    { presetItems }
                </select>
            </div>
        );
    }
}

export default PresetController;

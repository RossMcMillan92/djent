import React, { Component } from 'react';

import InputBox from './InputBox';
import presets from '../utils/presets';

class PresetController extends Component {
    onChange = (id) => {
        this.props.actions.applyPreset(id);
    }

    render = () => {
        const presetItems = presets
            .map((preset, i) => (
                <li key={i} onClick={(e) => this.onChange(preset.id)}>{ preset.id }</li>
            ))

        return (
            <div>
                preset { this.props.activePresetID }
                <ul>
                    { presetItems }
                </ul>
            </div>
        );
    }
}

export default PresetController;

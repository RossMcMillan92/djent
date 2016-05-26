import React, { Component } from 'react';

import InputBox from './InputBox';

class PresetController extends Component {
    onChange = (event, type) => {

    }

    render = () => {
        return (
            <div>
                preset { this.props.activePresetID }
            </div>
        );
    }
}

export default PresetController;

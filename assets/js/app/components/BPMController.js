import React, { Component } from 'react';

import { repeatArray } from '../utils/tools';

class BPMController extends Component {
    onBPMChange = (event) => {
        const bpm = parseInt(event.target.value);
        this.props.actions.updateBPM(bpm);
    }

    render = () => {
        return (
            <div>
                <label htmlFor={length.id}>BPM:</label>
                <input id={length.id} type="number" defaultValue={this.props.bpm} onChange={this.onBPMChange} />
            </div>
        )
    }
}

export {
    BPMController,
};

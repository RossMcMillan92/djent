import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updateBPM } from '../actions/config';
import BPMTapper from '../components/BPMTapper';
import presets from '../utils/presets';

const mapStateToProps = (state) => ({
    bpm: state.config.get('bpm'),
    preset: presets.find(preset => preset.id === state.config.get('activePresetID')),
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateBPM,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BPMTapper);

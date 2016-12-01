import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updateBPM } from 'actions/config';
import BPMController from 'components/BPMController';
import presets from 'utils/presets';

const mapStateToProps = (state) => ({
    bpm: state.config.bpm,
    preset: presets.find(preset => preset.id === state.config.activePresetID),
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

export default connect(mapStateToProps, mapDispatchToProps)(BPMController);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { applyPreset } from '../actions/config';
import PresetController from '../components/PresetController';

const mapStateToProps = (state) => ({
    activePresetID: state.config.activePresetID,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        applyPreset,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresetController);

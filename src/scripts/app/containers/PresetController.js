import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { applyPresetByID } from '../actions/config';
import PresetController from '../components/PresetController';

const mapStateToProps = (state) => ({
    activePresetID: state.config.activePresetID,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        applyPresetByID,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresetController);

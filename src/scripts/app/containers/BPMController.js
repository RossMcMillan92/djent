import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updateBPM } from '../actions/config';
import BPMController from '../components/BPMController';

const mapStateToProps = (state) => ({
    bpm: state.config.bpm,
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

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import ShareController from '../components/ShareController';

import * as modalActions from '../actions/modal';

function mapStateToProps(state) {
    return {
        beats: state.beats,
        bpm: state.config.bpm,
        activePresetID: state.config.activePresetID,
        hitChance: state.config.hitChance,
        instruments: state.instruments,
        currentBuffer: state.sound.currentBuffer,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...modalActions
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareController);

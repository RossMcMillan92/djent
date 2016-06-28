import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import * as modalActions from '../actions/modal';
import * as soundActions from '../actions/sound';
import SoundController from '../components/SoundController';

const mapStateToProps = (state) => ({
    ...state.sound,
    fadeIn: state.config.fadeIn,
    continuousGeneration: state.config.continuousGeneration,
    bpm: state.config.bpm,
    beats: state.beats,
    allowedLengths: state.config.allowedLengths,
    hitChance: state.config.hitChance,
    instruments: state.instruments,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        ...modalActions,
        ...soundActions,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundController);

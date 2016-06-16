import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import SoundController from '../components/SoundController';

const mapStateToProps = (state) => ({
    fadeIn: state.config.fadeIn,
    isLooping: state.config.isLooping,
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
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundController);

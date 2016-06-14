import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as configActions from '../actions/config';
import SoundController from '../components/SoundController';

const mapStateToProps = (state) => ({
    fadeIn: state.config.get('fadeIn'),
    isLooping: state.config.get('isLooping'),
    continuousGeneration: state.config.get('continuousGeneration'),
    bpm: state.config.get('bpm'),
    beats: state.beats,
    allowedLengths: state.config.get('allowedLengths'),
    hitChance: state.config.get('hitChance'),
    instruments: state.instruments
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...configActions,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundController);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as soundActions from '../actions/sound';
import Visualiser from '../components/Visualiser';

const mapStateToProps = (state) => ({
    isPlaying: state.sound.isPlaying,
    currentBuffer: state.sound.currentBuffer,
    currentSrc: state.sound.currentSrc,
    bpm: state.config.bpm,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...soundActions,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualiser);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as soundActions from '../actions/sound';
import Visualiser from '../components/Visualiser';

const mapStateToProps = (state) => ({
    ...state.sound,
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

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updateBeats } from '../actions/config';
import BeatsController from '../components/BeatsController';

const mapStateToProps = (state) => ({
    beats: state.beats,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateBeats,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BeatsController);

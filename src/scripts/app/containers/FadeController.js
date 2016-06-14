import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { updateFadeIn } from '../actions/config';
import FadeController from '../components/FadeController';

const mapStateToProps = (state) => ({
    fadeIn: state.config.get('fadeIn'),
})


const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateFadeIn,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FadeController);

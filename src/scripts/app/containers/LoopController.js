import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { updateIsLooping } from '../actions/config';
import LoopController from '../components/LoopController';

const mapStateToProps = (state) => ({
    isLooping: state.config.get('isLooping'),
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateIsLooping,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoopController);

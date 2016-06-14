import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { updateContinuousGeneration } from '../actions/config';
import ContinuousGenerationController from '../components/ContinuousGenerationController';

const mapStateToProps = (state) => ({
    continuousGeneration: state.config.get('continuousGeneration'),
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateContinuousGeneration,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContinuousGenerationController);

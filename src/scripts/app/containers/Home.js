import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Home from '../routes/Home';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import { updateBeats } from '../actions/beats';

function mapStateToProps(state) {
    return {
        instruments      : state.instruments,
        activePresetID   : state.config.get('activePresetID'),
        beats            : state.beats,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        updateBeats
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

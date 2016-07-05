import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Main from '../routes/Main';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import * as modalActions from '../actions/modal';
import { updateBeats } from '../actions/beats';

function mapStateToProps(state) {
    return {
        instruments      : state.instruments,
        activePresetID   : state.config.activePresetID,
        allowedLengths   : state.config.allowedLengths,
        beats            : state.beats,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        ...modalActions,
        updateBeats
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

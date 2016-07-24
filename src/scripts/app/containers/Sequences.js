import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Sequences from '../routes/Sequences';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import * as modalActions from '../actions/modal';
import { updateBeats } from '../actions/beats';

function mapStateToProps(state) {
    return {
        beats          : state.beats,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sequences);

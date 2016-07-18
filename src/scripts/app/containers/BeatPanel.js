import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import BeatPanel from '../components/BeatPanel';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import * as beatsActions from '../actions/beats';

function mapDispatchToProps(dispatch) {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        ...beatsActions,
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(null, mapDispatchToProps)(BeatPanel);

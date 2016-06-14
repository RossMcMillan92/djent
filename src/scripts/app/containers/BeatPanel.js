import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';

import BeatPanel from '../components/BeatPanel';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import * as beatsActions from '../actions/beats';

function mapStateToProps(state) {
    return {
        allowedLengths : state.config.get('allowedLengths'),
        hitChance      : state.config.get('hitChance'),
        beats          : state.beats,
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(BeatPanel);

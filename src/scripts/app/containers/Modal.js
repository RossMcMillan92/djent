import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as modalActions from '../actions/modal';
import Modal from '../components/Modal';
import presets from '../utils/presets';

const mapStateToProps = (state) => ({
    isActive: state.modal.isActive,
    content: state.modal.content,
    isCloseable: state.modal.isCloseable,
    className: state.modal.className,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...modalActions,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

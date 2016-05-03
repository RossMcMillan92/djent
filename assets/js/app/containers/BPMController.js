import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updateBPM } from '../actions/config';
import InputBox from '../components/InputBox';

class BPMControllerContainer extends Component {
    onBPMChange = (event) => {
        const bpm = parseInt(event.target.value);
        this.props.actions.updateBPM(bpm);
    }

    render = () => {
        const props = {
            label: 'BPM',
            type: 'number',
            defaultValue: this.props.bpm,
            onChange: this.onBPMChange
        }
        return (
            <InputBox { ...props } />
        );
    }
}

const mapStateToProps = (state) => ({
    bpm: state.config.bpm,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateBPM,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BPMControllerContainer);

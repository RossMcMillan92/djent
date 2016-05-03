import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updateIsLooping } from '../actions/config';
import InputBox from '../components/InputBox';

class LoopControllerContainer extends Component {
    onLoopChange = (event) => {
        const isLooping = event.target.checked;
        this.props.actions.updateIsLooping(isLooping);
    }

    render = () => {
        const props = {
            label: 'Loop',
            type: 'checkbox',
            defaultChecked: this.props.isLooping,
            onChange: this.onLoopChange
        }
        return (
            <InputBox { ...props } />
        );
    }
}

const mapStateToProps = (state) => ({
    isLooping: state.config.isLooping,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoopControllerContainer);

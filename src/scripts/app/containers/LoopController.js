import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateloopMode } from '../actions/sound';
import SVG from '../components/SVG';

const LoopController = (props) => {
    const onClick = () => {
        const newloopMode = props.loopMode + 1 <= 2 ? props.loopMode + 1 : 0;
        props.actions.updateloopMode(newloopMode);
    };

    const inputProps = {
        id: 'loop',
        className: 'button-primary button-primary--alpha-dark',
        onClick,
    };

    const loopModeIcon = props.loopMode < 2
        ? 'loop'
        : 'loop_single';
    const iconClassName = `button-primary__svg-icon button-primary__svg-icon--large ${props.loopMode !== 0 ? 'u-txt-positive' : ''}`;
    return (
        <button { ...inputProps }>
            <SVG icon={loopModeIcon} className={iconClassName} />
        </button>
    );
};

function mapStateToProps(state) {
    return {
        loopMode: state.sound.loopMode,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = {
        updateloopMode
    };

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoopController);

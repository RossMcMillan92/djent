import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, map } from 'ramda'

import { updateloopMode } from 'actions/sound'
import { setLocalStorageIO } from 'modules/localStorageIO'
import SVG from 'components/SVG'

//    toggleLoopMode :: loopMode -> loopMode
const toggleLoopMode = loopMode => loopMode + 1 <= 2 ? loopMode + 1 : 0

//    getLoopModeIconType :: loopMode -> String
const getLoopModeIconType = loopMode =>
    loopMode < 2
        ? 'loop'
        : 'loop_single'

//    getLoopModeLabel :: loopMode -> String
const getLoopModeLabel = loopMode =>
    loopMode === 0
        ? 'Loop mode disabled'
        : loopMode === 1
            ? 'Loop mode enabled'
            : 'Loop mode single track enabled'

const LoopController = (props) => {
    const { actions, loopMode } = props

    const onClick = compose(
        map(actions.updateloopMode),
        setLocalStorageIO('loopMode'),
        toggleLoopMode,
    )

    const inputProps = {
        id: 'loop',
        title: getLoopModeLabel(loopMode),
        className: 'button-primary button-primary--alpha-dark',
        onClick: () => onClick(loopMode).runIO(),
    }

    const loopModeIcon = getLoopModeIconType(loopMode)
    const iconClassName = `button-primary__svg-icon button-primary__svg-icon--large ${loopMode !== 0 ? 'u-txt-positive' : ''}`
    return (
        <button { ...inputProps }>
            <SVG icon={loopModeIcon} className={`${loopMode !== 0 ? 'lmao' : ''} ${iconClassName}`} />
        </button>
    )
}

function mapStateToProps(state) {
    return {
        loopMode: state.sound.loopMode,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        updateloopMode
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoopController)

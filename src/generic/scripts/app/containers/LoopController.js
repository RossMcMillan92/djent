import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, map } from 'ramda'

import { updateloopMode } from 'actions/sound'
import IconButton from 'components/IconButton'
import { setLocalStorageIO } from 'modules/localStorageIO'

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
    const loopModeIcon = getLoopModeIconType(loopMode)
    const iconClassName = `button-primary__svg-icon--large ${loopMode !== 0 ? 'u-txt-positive' : ''}`
    return (
        <IconButton
            className="button-primary button-primary--alpha-dark"
            id="loop"
            icon={ loopModeIcon }
            iconClassName={ iconClassName }
            onClick={ () => onClick(loopMode).runIO() }
            theme="alpha-dark"
            title={ getLoopModeLabel(loopMode) }
        />
    )
}

const mapStateToProps = state => ({
    loopMode: state.sound.loopMode,
})

const actions = {
    updateloopMode
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoopController)

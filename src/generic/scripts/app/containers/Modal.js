import { connect } from 'react-redux'

import * as modalActions from 'actions/modal'
import Modal from 'components/Modal'

const mapStateToProps = state => ({
    isActive: state.modal.isActive,
    title: state.modal.title,
    content: state.modal.content,
    isCloseable: state.modal.isCloseable,
    className: state.modal.className,
})

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(modalActions.disableModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

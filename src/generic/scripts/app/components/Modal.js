import React, { Component } from 'react'

class Modal extends Component {
    closeModal = () => {
        if (this.props.isCloseable) this.props.onClose()
    }

    render = () => {
        const closeButton = this.props.isCloseable &&
            <div className="modal__close-button" onClick={this.closeModal}>
                &times;
            </div>

        const title = this.props.title &&
            <div className="panel panel--dark">
                <div className="group-padding-x group-padding-y-med u-flex-row u-flex-justify">
                    { this.props.title }
                    { closeButton }
                </div>
            </div>

        return (
            <div className={`modal ${this.props.isActive ? 'is-active' : ''} ${this.props.className ? this.props.className : ''}`}>
                <div className="modal__bg" onClick={this.closeModal}></div>
                <div className="modal__box-container">
                    { title }
                    <div className="panel">
                        <div className="group-padding-x-med group-padding-y-med">
                            { this.props.content }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal

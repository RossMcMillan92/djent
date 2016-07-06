import React, { Component } from 'react';

class Modal extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.isActive !== this.props.isActive;

    closeModal = () => {
        this.props.isCloseable && this.props.actions.disableModal();
    }

    render = () => {
        const title = this.props.title
        ? (
            <div className="panel panel--dark">
                <div className="group-padding-x group-padding-y">
                    { this.props.title }
                </div>
            </div>
        )
        : null

        const closeButton = this.props.isCloseable
        ? (
            <div className="modal__close-button" onClick={this.closeModal}>
                &times;
            </div>
        )
        : null

        return (
            <div className={`modal ${ this.props.isActive ? 'is-active' : '' } ${ this.props.className ? this.props.className : '' }`}>
                <div className="modal__bg" onClick={this.closeModal}></div>
                <div className="modal__box-container">
                    { title }
                    <div className="panel">
                        { closeButton }
                        <div className="group-padding-x group-padding-y">
                            { this.props.content }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;

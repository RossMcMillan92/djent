import React, { Component } from 'react';

class Modal extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.isActive !== this.props.isActive;

    componentWillUpdate = (nextProps) => {

    }

    closeModal = () => {
        this.props.isCloseable && this.props.actions.disableModal();
    }

    render = () => {
        return (
            <div className={`modal ${this.props.isActive ? 'is-active' : ''}`}>
                <div className="modal__bg" onClick={this.closeModal}></div>
                <div className="modal__box-container">
                    <div className="modal__box">
                        { this.props.content }
                    </div>
                    {
                        this.props.isCloseable
                        ? (
                            <div className="modal__close-button" onClick={this.closeModal}>
                                &times;
                            </div>
                        )
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default Modal;

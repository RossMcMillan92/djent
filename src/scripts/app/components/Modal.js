import React, { Component } from 'react';

class Modal extends Component {
    shouldComponentUpdate = (nextProps) => nextProps.modal.isActive !== this.props.modal.isActive;

    render = () => {
        console.log('THIS.PROPS', this.props)
        return (
            <div className={`modal ${this.props.modal.isActive ? 'is-active' : ''}`}>
                <div className="modal__box">
                    { this.props.modal.content }
                </div>
            </div>
        );
    }
}

export default Modal;

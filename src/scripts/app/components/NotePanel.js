import React, { Component } from 'react';
import { capitalize } from '../utils/tools';

class NotePanel extends Component {

    onLengthAmountChange = (event, value) => {
        const { id, amount } = this.props.length;
        const newAmount = amount + value;

        if (newAmount < 0) return;

        this.updateAllowedLengthsByID(id, 'amount', newAmount);
    }

    onIsTripletChange = (event) => {
        const [ id, value ] = [event.target.getAttribute('data-id'), event.target.checked];
        this.updateAllowedLengthsByID(id, 'isTriplet', value);
    }

    updateAllowedLengthsByID = (id, prop, value) => {
        const newAllowedLengths = this.props.allowedLengths.map(obj => {
            const newObj = { ...obj };
            if (newObj.id === id) newObj[prop] = value;
            return newObj;
        });

        this.props.actions.updateAllowedLengths(newAllowedLengths);
    }

    render = () => {
        const { length, totalAmount } = this.props;
        const noteName = `${capitalize(length.name)} note`;
        const percentage = totalAmount ? Math.round(length.amount / totalAmount * 100) : 0;
        const isOn = length.amount > 0;

        return (
            <div className={`note-panel ${ isOn ? '' : 'note-panel--disabled' }`}>
                <img className="note-panel__svg" src={`assets/images/notes/${length.name}.svg`} alt={noteName} title={noteName} />
                <div className="note-panel__amount-container">
                    <span className="note-panel__amount" title="Chance">{percentage}%</span>
                    <div className="note-panel__btn-container">
                        <button className="note-panel__btn note-panel__btn--up" title="Increase chance" onClick={(e) => this.onLengthAmountChange(e, 1)}></button>
                        <button className="note-panel__btn note-panel__btn--down" title="Decrease chance" onClick={(e) => this.onLengthAmountChange(e, -1)}></button>
                    </div>
                </div>
                <div className="note-panel__checkbox-container">
                    <label className="note-panel__label" htmlFor={`${length.id}-triplet`}>Triplet: </label>
                    <input className="note-panel__checkbox" id={`${length.id}-triplet`} data-id={length.id} type="checkbox" checked={length.isTriplet} onChange={this.onIsTripletChange} />
                </div>

            </div>
        );
    }
}

export default NotePanel;

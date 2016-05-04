import React, { Component } from 'react';

import { repeatArray } from '../utils/tools';

class AllowedLengthsController extends Component {

    onLengthAmountChange = (event) => {
        const [ id, value ] = [event.target.getAttribute('id'), parseFloat(event.target.value)];
        this.updateAllowedLengthsByID(id, 'amount', value);
    }

    onIsTripletChange = (event) => {
        const [ id, value ] = [event.target.getAttribute('id'), event.target.checked];
        this.updateAllowedLengthsByID(id, 'isTriplet', value);
    }

    updateAllowedLengthsByID = (id, prop, value) => {
        const newAllowedLengths = this.props.allowedLengths.map(obj => {
            if (obj.id === id) obj[prop] = value;
            return obj;
        });

        this.props.actions.updateAllowedLengths(newAllowedLengths);
    }

    render = () => {
        const { allowedLengths } = this.props;
        const totalAmount = allowedLengths.reduce((a,b) => a + b.amount, 0);

        const lengths = allowedLengths
            .map((length, i) => {
                const percentage = Math.round(length.amount / totalAmount * 100);
                return (
                    <div key={i}>
                        <span>{length.name}: </span>
                        <input type="number" id={length.id} defaultValue={length.amount} onChange={this.onLengthAmountChange} />
                        <span> - {percentage}% </span>
                        <label htmlFor={length.id}>Triplet:</label>
                        <input id={length.id} type="checkbox" defaultChecked={length.isTriplet} onChange={this.onIsTripletChange} />
                    </div>
                );
            });

        return (
            <div>
                { lengths }
            </div>
        )
    }
}

export default AllowedLengthsController;

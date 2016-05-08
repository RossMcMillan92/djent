import React, { Component } from 'react';

import InputBox from './InputBox';
import { repeatArray } from '../utils/tools';

class AllowedLengthsController extends Component {

    onLengthAmountChange = (event) => {
        const [ id, value ] = [event.target.getAttribute('id'), parseFloat(event.target.value)];
        this.updateAllowedLengthsByID(id, 'amount', value);
    }

    onIsTripletChange = (event) => {
        const [ id, value ] = [event.target.getAttribute('data-id'), event.target.checked];
        this.updateAllowedLengthsByID(id, 'isTriplet', value);
    }

    updateAllowedLengthsByID = (id, prop, value) => {
        console.log('ID, PROP, VALUE', id, prop, value)
        const newAllowedLengths = this.props.allowedLengths.map(obj => {
            if (obj.id === id) obj[prop] = value;
            console.log('prop', obj.id , id)
            return obj;
        });
        console.log('NEWALLOWEDLENGTHS', newAllowedLengths)

        this.props.actions.updateAllowedLengths(newAllowedLengths);
    }

    render = () => {
        const { allowedLengths } = this.props;
        console.log('ALLOWEDLENGTHS', allowedLengths)
        const totalAmount = allowedLengths.reduce((a,b) => a + b.amount, 0);

        const lengths = allowedLengths
            .map((length, i) => {
                const percentage = Math.round(length.amount / totalAmount * 100);
                return (
                    <div key={i} className="grid">
                        <div className="grid__item one-half">
                            <InputBox
                                id={length.id}
                                label={length.name}
                                defaultValue={length.amount}
                                containerClassName="u-tar"
                                type="number"
                                onChange={this.onLengthAmountChange}
                            />
                        </div>
                        <div className="grid__item one-half">
                            <span> - {percentage}% </span>
                            <label htmlFor={`${length.id}-triplet`}>Triplet:</label>
                            <input id={`${length.id}-triplet`} data-id={length.id} type="checkbox" defaultChecked={length.isTriplet} onChange={this.onIsTripletChange} />
                        </div>
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

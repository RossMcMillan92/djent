import React, { Component } from 'react';

import InputBox from './InputBox';
import NotePanel from './NotePanel';
import SVG from './SVG';
import { repeatArray } from '../utils/tools';

class AllowedLengthsController extends Component {

    render = () => {
        const { allowedLengths, actions } = this.props;
        const totalAmount = allowedLengths.reduce((a,b) => a + b.amount, 0);
        const notePanelProps = {
            actions,
            allowedLengths,
            totalAmount,
        }

        const lengths = allowedLengths
            .map((length, i) => <NotePanel length={length} { ...notePanelProps } key={i} />);

        return (
            <div className="grid">
                { lengths }
            </div>
        );
    }
}
// <InputBox
//     id={length.id}
//     label={length.name}
//     defaultValue={length.amount}
//     containerClassName="u-tar"
//     type="number"
//     onChange={this.onLengthAmountChange}
// />
export default AllowedLengthsController;

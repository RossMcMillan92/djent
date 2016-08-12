import React, { Component } from 'react';

import AllowedLengthsController from './AllowedLengthsController';
import BeatsController          from './BeatsController';
import HitChanceController      from './HitChanceController';
import InputBox                 from './InputBox';
import Tabgroup, { Tabpane } from './Tabgroup';

class SequencePanel extends Component {
    getDescription = (sequence) => sequence.description ? unescape(sequence.description) : sequence.id;

    onHitChanceChange = (hitChance) => {
        this.props.actions.updateSequence(this.props.sequence.id, 'hitChance', hitChance);
    }

    onAllowedLengthsChange = (allowedLengths) => {
        this.props.actions.updateSequence(this.props.sequence.id, 'allowedLengths', allowedLengths);
    }

    launchDeleteModal = () => {
        const { actions, sequence } = this.props;
        const onDeleteClick = () => {
            actions.deleteSequence(sequence.id);
            actions.disableModal();
        };
        const content = (
            <div>
                <button className="button-primary button-primary--small button-primary--negative u-mr05" onClick={ onDeleteClick } >Delete</button>
                <button className="button-primary button-primary--small" onClick={ actions.disableModal } >Cancel</button>
            </div>
        );
        const modalTitle = `Are you sure you want to delete '${this.getDescription(sequence)}?'`;
        actions.enableModal({ content, isCloseable: true, title: modalTitle });
    }

    render = () => (
        <div>
            <h3 className="title-secondary u-mb05">
                { this.getDescription(this.props.sequence) }
            </h3>
            <Tabgroup>
                <Tabpane title="Notes">
                    <AllowedLengthsController
                        actions={{ updateAllowedLengths: this.onAllowedLengthsChange }}
                        allowedLengths={this.props.sequence.allowedLengths}
                    />

                    <div className="u-flex-row u-flex-justify">
                        <BeatsController
                            sequence={ this.props.sequence }
                            actions={{ updateSequence: this.props.actions.updateSequence }}
                        />
                        <HitChanceController
                            hitChance={ this.props.sequence.hitChance }
                            actions={{ updateHitChance: this.onHitChanceChange }}
                        />
                    </div>
                </Tabpane>
                <Tabpane title="Settings">
                    <div className={`${this.props.isDeletable ? 'u-mb1' : ''}`}>
                        <InputBox
                            id={`sequence-name-${this.props.sequence.id}`}
                            label='Sequence Name'
                            type='text'
                            maxLength="25"
                            defaultValue={this.getDescription(this.props.sequence)}
                            onChange={e => this.props.actions.updateSequenceDescription(this.props.sequence.id, escape(e.target.value))}
                            className='input-base'
                            labelClassName='input-label'
                        />
                    </div>
                    {
                        this.props.isDeletable
                        ? <button className="button-primary button-primary--small button-primary--negative" onClick={ this.launchDeleteModal } >Delete Sequence</button>
                        : null
                    }
                </Tabpane>
            </Tabgroup>
        </div>
    );
}

export default SequencePanel;

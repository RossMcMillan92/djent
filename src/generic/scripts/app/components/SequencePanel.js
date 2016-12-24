import React, { Component } from 'react'

import AllowedLengthsController from './AllowedLengthsController'
import BeatsController          from './BeatsController'
import HitChanceController      from './HitChanceController'
import InputBox                 from './InputBox'
import Tabgroup, { Tabpane }    from './Tabgroup'

class SequencePanel extends Component {
    onHitChanceChange = (hitChance) => {
        this.props.actions.updateSequence(this.props.sequence.id, 'hitChance', hitChance)
    }

    onAllowedLengthsChange = (allowedLengths) => {
        this.props.actions.updateSequence(this.props.sequence.id, 'allowedLengths', allowedLengths)
    }

    launchDeleteModal = () => {
        const { actions, sequence } = this.props
        const onDeleteClick = () => {
            actions.deleteSequence(sequence.id)
            actions.disableModal()
        }
        const content = (
            <div>
                <button className="button-primary button-primary--small button-primary--negative u-mr05" onClick={ onDeleteClick } >Delete</button>
                <button className="button-primary button-primary--small" onClick={ actions.disableModal } >Cancel</button>
            </div>
        )
        const modalTitle = `Are you sure you want to delete '${this.props.description}?'`
        actions.enableModal({ content, isCloseable: true, title: modalTitle })
    }

    render = () => (
        <div>
            <div className="u-flex-row u-flex-justify u-flex-end u-mb05">
                <div className="u-mr05">
                    <label htmlFor={`sequence-name-${this.props.sequence.id}`} className="u-visually-hidden">
                        Sequence Title
                    </label>
                    <InputBox
                        id={`sequence-name-${this.props.sequence.id}`}
                        type='text'
                        maxLength="25"
                        defaultValue={this.props.description}
                        onChange={e => this.props.actions.updateSequenceDescription(this.props.sequence.id, escape(e.target.value))}
                        className='input-base input-base--bare input-base--large'
                        labelClassName='input-label'
                    />
                </div>
                {
                    this.props.isDeletable
                    ? <button className="button-primary button-primary--tiny button-primary--negative" onClick={ this.launchDeleteModal } >Delete</button>
                    : null
                }
            </div>
            <Tabgroup>
                <Tabpane title="Notes">
                    <AllowedLengthsController
                        actions={{ updateAllowedLengths: this.onAllowedLengthsChange }}
                        allowedLengths={this.props.sequence.allowedLengths}
                    />

                    <div className="u-flex-row u-flex-row u-flex-wrap u-flex-justify">
                        <div className="u-mr1 u-mb05">
                            <BeatsController
                                sequence={ this.props.sequence }
                                actions={{ updateSequence: this.props.actions.updateSequence }}
                            />
                        </div>
                        <HitChanceController
                            hitChance={ this.props.sequence.hitChance }
                            actions={{ updateHitChance: this.onHitChanceChange }}
                        />
                    </div>
                </Tabpane>
            </Tabgroup>
        </div>
    )
}

export default SequencePanel

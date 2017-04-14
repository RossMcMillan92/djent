import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as sequencesActions from 'actions/sequences'
import * as modalActions from 'actions/modal'

import AllowedLengthsController from 'components/AllowedLengthsController'
import BeatsController          from 'components/BeatsController'
import HitChanceController      from 'components/HitChanceController'
import InputBox                 from 'components/InputBox'
import Tabgroup, { Tabpane }    from 'components/Tabgroup'

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

    renderHeader = () => (
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
                this.props.isDeletable &&
                    <button className="button-primary button-primary--tiny button-primary--negative" onClick={ this.launchDeleteModal } >Delete</button>
            }
        </div>
    )

    render = () => (
        <div>
            { this.renderHeader() }

            <Tabgroup>
                <Tabpane title="Notes">
                    <AllowedLengthsController
                        onUpdate={ this.onAllowedLengthsChange }
                        allowedLengths={this.props.sequence.allowedLengths}
                    />

                    <div className="u-flex-row u-flex-row u-flex-wrap">
                        <div className="u-mr2@above-alpha u-mb05">
                            <BeatsController
                                onUpdate={ this.props.actions.updateSequence }
                                sequence={ this.props.sequence }
                            />
                        </div>
                        <HitChanceController
                            hitChance={ this.props.sequence.hitChance }
                            onUpdate={ this.onHitChanceChange }
                        />
                    </div>
                </Tabpane>
            </Tabgroup>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...sequencesActions,
        ...modalActions,
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(null, mapDispatchToProps)(SequencePanel)

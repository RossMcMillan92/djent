import React, { Component } from 'react'
import { compose, identity } from 'ramda'
import { Future as Task } from 'ramda-fantasy'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { applyPreset } from 'actions/config'
import { addPreset } from 'actions/presets'
import * as modalActions from 'actions/modal'
import { getTargetValueFromEvent } from 'modules/events'
import { toKebabCase } from 'modules/toCase'
import InputBox from 'components/InputBox'
import { createPreset } from 'utils/presets'


class SaveModal extends Component {
    state = {
        currentDescription: ''
    }

    onChange = event => compose(
        d => this.setState(d),
        currentDescription => ({ currentDescription }),
        getTargetValueFromEvent,
    )(event)

    render = () => (
        <div>
            <label htmlFor="preset-description" className="input-label">
                Preset Name:
            </label>
            <div className="u-flex-row">
                <div className="input-container u-mr1">
                    <InputBox
                        className="input-base input-base--bare input-base--large"
                        id="preset-description"
                        onChange={this.onChange}
                        defaultValue={this.state.currentDescription}
                    />
                </div>
                <button
                    className="button-primary button-primary--small u-mr05"
                    onClick={() => this.props.onSave(this.state.currentDescription)}
                >
                    Done
                </button>
                <button
                    className="button-primary button-primary--small"
                    onClick={this.props.onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

//    launchSaveModal :: (->) -> (->) -> Task Cancel Save
const launchSaveModal = (enableModal, disableModal) =>
    Task((rej, res) => {
        const onCancel = () => {
            disableModal()
            rej()
        }
        const onSave = (description) => {
            disableModal()
            res(description)
        }
        const content = (
            <SaveModal
                onCancel={ onCancel }
                onSave={ onSave }
            />
        )
        enableModal({ content, isCloseable: true, title: 'Save Preset' })
    })

const PresetSaver = (props) => {
    const { bpm, instruments, sequences, actions } = props
    const onClick = () => {
        // Tracking.sendSaveEvent('open')
        launchSaveModal(actions.enableModal, actions.disableModal)
            .map(description => createPreset({
                bpm,
                description,
                id: toKebabCase(description),
                instruments,
                sequences
            }))
            .fork(identity, (newPreset) => {
                actions.addPreset(newPreset)
                actions.applyPreset(newPreset)
            })
    }

    return (
        <button
            className="button-primary button-primary--small"
            onClick={onClick}
        >
            Save New
        </button>
    )
}

const mapStateToProps = ({ config, sequences, instruments }) => ({
    bpm: config.bpm,
    instruments,
    sequences,
})

const actions = {
    ...modalActions,
    addPreset,
    applyPreset,
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PresetSaver)

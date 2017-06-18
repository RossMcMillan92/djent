import React, { Component } from 'react'
import { compose, identity, map, update } from 'ramda'
import { Identity, Maybe, Future as Task } from 'ramda-fantasy'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from 'actions/modal'
import { getTargetValueFromEvent } from 'modules/events'
import { safeGetLocalStorageIO, setLocalStorageIO } from 'modules/localStorageIO'
import { toKebabCase } from 'modules/toCase'
import InputBox from 'components/InputBox'
import * as Tracking from 'modules/tracking'
import { createPreset } from 'utils/presets'
import { logError } from 'utils/tools'


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
        .fork(() => {}, (description) => {
            const storedPresets = safeGetLocalStorageIO('presets')
                .map(Maybe.maybe([], JSON.parse))
                .runIO()
            const newId = toKebabCase(description)
            const newPreset = createPreset({ bpm, description, id: newId, instruments, sequences })
            const newPresets = Identity.of(Maybe(storedPresets.find(p => p.id === newId)))
                .map(map(x => storedPresets.indexOf(x)))
                .map(Maybe.maybe(
                    storedPresets.concat(newPreset),
                    index => update(index, newPreset, storedPresets)
                ))
                .map(JSON.stringify)
                .map(setLocalStorageIO('presets'))
                .map(p => p.runIO())
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
    ...modalActions
}

const mapDispatchToProps = dispatch => ({
    actions: {
        ...bindActionCreators(actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PresetSaver)

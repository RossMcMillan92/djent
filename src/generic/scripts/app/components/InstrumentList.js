import React, { Component } from 'react'
import { capitalize } from 'utils/tools'

import Expandable from 'components/Expandable'
import FadeOutDurationController from 'components/FadeOutDurationController'
import PitchController from 'components/PitchController'
import RepeatingHitsController from 'components/RepeatingHitsController'
import SequenceController from 'components/SequenceController'
import Tabgroup, { Tabpane } from 'components/Tabgroup'
import VolumeController from 'components/VolumeController'

const renderSoundsPane = (instrument, onSoundToggle) => {
    const categories = instrument.sounds
        .reduce((cats, sound) => {
            if (!cats.includes(sound.category)) {
                return [
                    ...cats,
                    sound.category
                ]
            }
            return cats
        }, [])
        .map((id, catIndex, arr) => {
            const sounds = instrument.sounds
                .filter(sound => sound.category === id)
            const isExpanded = !!sounds.find(sound => sound.enabled)
            const title = id
                || `${(instrument.description
                || capitalize(instrument.id))}`

            return (
                <Expandable
                    title={ title }
                    className={`
                        expandable-list
                        ${catIndex !== arr.length - 1 ? 'u-mb05' : ''}
                    `}
                    titleClassName="expandable-list__title"
                    bodyClassName="expandable-list__body"
                    isExpanded={isExpanded}
                    key={catIndex}
                >
                    <ul className="cleanlist">
                        {sounds.map((sound, i) => (
                            <li
                                onClick={() => onSoundToggle(sound.id, instrument.id)}
                                className={`
                                    toggle-input
                                    ${sound.enabled ? 'is-enabled' : ''}`
                                }
                                key={i}
                            >{sound.description || sound.id}</li>
                        ))}
                    </ul>
                </Expandable>
            )
        })

    return categories
}

const renderSequencesPane = (instrument, sequences, updateInstrumentSequences) => {
    const randomisedSequences = sequences
        .filter(b => b.id !== 'total')
        .reduce((newObj, b) => ({
            ...newObj,
            [b.id]: { description: b.description, id: b.id }
        }), {})

    return (
        <SequenceController
            instrumentSequences={ instrument.sequences }
            randomisedSequences={ randomisedSequences }
            onChange={ val => updateInstrumentSequences(instrument.id, val) }
        />
    )
}

const renderSettingsPane = (instrument, actions) => {
    const onFadeOutDurationUpdate = value =>
        actions.updateInstrumentFadeOutDuration({ instrumentID: instrument.id, value })

    const onPitchUpdate = value =>
        actions.updateInstrumentPitch({ instrumentID: instrument.id, value })

    const onRepeatingHitsUpdate = value =>
        actions.updateInstrumentRepeatingHits({ instrumentID: instrument.id, value })

    const onInstrumentVolumeUpdate = value =>
        actions.updateInstrumentVolume({ instrumentID: instrument.id, value })

    return (
        <div className="u-flex-row u-flex-wrap">
            <div className="u-mr1 u-mb05">
                <VolumeController
                    volume={instrument.volume}
                    onUpdate={onInstrumentVolumeUpdate}
                />
            </div>
            <div className="u-mr1 u-mb05">
                <PitchController
                    pitch={instrument.pitch}
                    onUpdate={onPitchUpdate}
                />
            </div>
            <div className="u-mr1 u-mb05">
                <RepeatingHitsController
                    repeatHitTypeForXBeat={instrument.repeatHitTypeForXBeat}
                    onUpdate={onRepeatingHitsUpdate}
                />
            </div>
            <FadeOutDurationController
                fadeOutDuration={ instrument.fadeOutDuration }
                onUpdate={ onFadeOutDurationUpdate }
            />
        </div>
    )
}

export default class InstrumentList extends Component {
    onSoundToggle = (soundID, parentID) => {
        const currentValue = this.props.instruments
            .find(i => i.id === parentID).sounds
            .find(s => s.id === soundID).enabled
        const prop = 'enabled'
        const value = !currentValue

        this.props.actions.updateInstrumentSound({ soundID, parentID, prop, value })
    }

    render = () => {
        const instrumentViews = this.props.instruments
            .map((instrument, index, instArr) => (
                <div className={`${index < instArr.length - 1 ? 'u-mb2' : ''}`} key={index}>
                    <h3 className="title-secondary u-mb05">
                        {instrument.description || instrument.id}
                    </h3>
                    <Tabgroup>
                        <Tabpane title="Sounds">
                            { renderSoundsPane(instrument, this.onSoundToggle) }
                        </Tabpane>
                        <Tabpane title="Sequences">
                            { renderSequencesPane(instrument, this.props.sequences, this.props.actions.updateInstrumentSequences) }
                        </Tabpane>
                        <Tabpane title="Settings">
                            { renderSettingsPane(instrument, this.props.actions) }
                        </Tabpane>
                    </Tabgroup>
                </div>
            ))

        return (
            <div>
               {instrumentViews}
            </div>
        )
    }
}

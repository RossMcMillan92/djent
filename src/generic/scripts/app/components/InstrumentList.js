import React, { Component } from 'react'
import { curry } from 'ramda'

import Expandable from 'components/Expandable'
import FadeOutDurationController from 'components/FadeOutDurationController'
import PitchController from 'components/PitchController'
import RepeatingHitsController from 'components/RepeatingHitsController'
import SequenceController from 'components/SequenceController'
import Tabgroup, { Tabpane } from 'components/Tabgroup'
import VolumeController from 'components/VolumeController'

import { capitalize } from 'utils/tools'

//    getCategoriesFromSounds :: [cat] -> sound -> [sound]
const getCategoriesFromSounds = (cats, sound) => {
    if (!cats.includes(sound.category)) {
        return [
            ...cats,
            sound.category
        ]
    }
    return cats
}

const renderSound = (instrument, onSoundToggle) => sound => (
    <div
        onClick={() => onSoundToggle(sound.id, instrument.id)}
        className="block-list__item"
        key={sound.id}
    >
        <div className="block-list__body">
            <div className={`toggle-input ${sound.amount ? 'is-enabled' : ''}`}>{sound.description || sound.id}</div>
        </div>
    </div>
)

const renderSoundsInCategories = curry((instrument, onSoundToggle, id, catIndex, arr) => {
    const sounds = instrument.sounds
        .filter(sound => sound.category === id)
    const isExpanded = !!sounds.find(sound => sound.amount)
    const title = id
        || `${(instrument.description
        || capitalize(instrument.id))}`

    const renderInsturmentSound = renderSound(instrument, onSoundToggle)

    return (
        <Expandable
            title={ title }
            className={`
                expandable-panel
                ${catIndex !== arr.length - 1 ? 'u-mb05' : ''}
            `}
            titleClassName="expandable-panel__title"
            bodyClassName="expandable-panel__body"
            isExpanded={isExpanded}
            key={catIndex}
        >
            <div className="block-list block-list--compact">
                { sounds.map(renderInsturmentSound) }
            </div>
        </Expandable>
    )
})

const renderSoundsPane = (instrument, onSoundToggle) => {
    const categories = instrument.sounds
        .reduce(getCategoriesFromSounds, [])
        .map(renderSoundsInCategories(instrument, onSoundToggle))

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
                    instrumentID={instrument.id}
                    volume={instrument.volume}
                    onUpdate={onInstrumentVolumeUpdate}
                />
            </div>
            <div className="u-mr1 u-mb05">
                <PitchController
                    instrumentID={instrument.id}
                    pitch={instrument.pitch}
                    onUpdate={onPitchUpdate}
                />
            </div>
            <div className="u-mr1 u-mb05">
                <RepeatingHitsController
                    instrumentID={instrument.id}
                    repeatHitTypeForXBeat={instrument.repeatHitTypeForXBeat}
                    onUpdate={onRepeatingHitsUpdate}
                />
            </div>
            <FadeOutDurationController
                instrumentID={instrument.id}
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
            .find(s => s.id === soundID).amount
        const prop = 'amount'
        const value = currentValue === 0
            ? 1
            : 0

        this.props.onSoundToggle({ soundID, parentID, prop, value })
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

import React, { Component } from 'react';
import { capitalize } from '../utils/tools';

import Expandable from './Expandable';
import PitchController from './PitchController';
import SequenceController from './SequenceController';
import Tabgroup, { Tabpane } from './Tabgroup';
import SVG from './SVG';

export default class InstrumentList extends Component {
    onSoundToggle = (event) => {
        const soundID = event.target.getAttribute('id');
        const parentID = event.target.getAttribute('data-parent-id');
        const currentValue = this.props.instruments.find(i => i.id === parentID).sounds.find(s => s.id === soundID).enabled;
        const prop = 'enabled';
        const value = !currentValue;

        this.props.actions.updateInstrumentSound({ soundID, parentID, prop, value });
    }

    renderSequences = instrument => {
        const randomisedSequences = this.props.beats
            .filter(b => b.id !== 'total')
            .reduce((newObj, b) => ({
                ...newObj,
                [b.id]: { description: b.description, id: b.id }
            }), {});
        const content = (
            <SequenceController
                instrumentID={ instrument.id }
                instrumentSequences={ instrument.sequences }
                randomisedSequences={ randomisedSequences }
                actions={{ updateInstrumentSequences: this.props.actions.updateInstrumentSequences }}
            />
        );

        return content;
    }

    render = () => {
        const instrumentViews = this.props.instruments
            .map((instrument, index) => {
                let categories = instrument.sounds
                    .reduce((cats, sound) => {
                        if (!cats.includes(sound.category)) {
                            return [
                                ...cats,
                                sound.category
                            ]
                        }
                        return cats;
                    }, [])
                    .map((id, index, arr) => {
                        const sounds = instrument.sounds
                            .filter(sound => sound.category === id);
                        const isExpanded = !!sounds.find(sound => sound.enabled);

                        return (
                            <Expandable
                                title={ id || `${(instrument.description || capitalize(instrument.id))}` }
                                className={`expandable-list ${ index !== arr.length-1 ? 'u-mb05' : '' }`}
                                titleClassName="expandable-list__title"
                                bodyClassName="expandable-list__body"
                                isExpanded={isExpanded}
                                key={index}
                            >
                                <ul className="cleanlist">
                                    {sounds.map((sound, i) => (
                                        <li id={sound.id} data-parent-id={instrument.id} onClick={this.onSoundToggle} className={`toggle-input ${sound.enabled ? 'is-enabled' : ''}`} key={i} >{sound.description || sound.id}</li>
                                    ))}
                                </ul>
                            </Expandable>
                        );
                    });

                return (
                    <div className="u-mb2" key={index}>
                        <h3 className="title-secondary u-mb05">{instrument.description || instrument.id}</h3>
                        <Tabgroup>
                            <Tabpane title="Sounds">
                                { categories }
                            </Tabpane>
                            <Tabpane title="Sequences">
                                { this.renderSequences(instrument) }
                            </Tabpane>
                            <Tabpane title="Pitch">
                                <PitchController pitch={instrument.pitch} id={instrument.id} actions={{ updateInstrumentPitch: this.props.actions.updateInstrumentPitch }} />
                            </Tabpane>
                        </Tabgroup>

                    </div>
                );
            });

        return (
            <div>
               {instrumentViews}
            </div>
        );
    }
}

const InstrumentSettingsPane = ({ instrument, actions, sequences }) => (
    <div>
        <div className="u-mb1">
        </div>
        <div className="u-mb1">
            <PitchController pitch={instrument.pitch} id={instrument.id} actions={{ updateInstrumentPitch: actions.updateInstrumentPitch }} />
        </div>
    </div>
);

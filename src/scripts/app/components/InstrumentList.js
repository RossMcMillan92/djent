import React, { Component } from 'react';
import { capitalize } from '../utils/tools';

import Expandable from './Expandable';
import PitchController from './PitchController';
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

    launchSettings = instrument => {
        const content = <InstrumentSettingsPane instrument={instrument} actions={{
            disableModal: this.props.actions.disableModal,
            updateInstrumentPitch: this.props.actions.updateInstrumentPitch,
        }} />
        this.props.actions.enableModal({ content, isCloseable: true });
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
                    .map((id, index) => {
                        const sounds = instrument.sounds
                            .filter(sound => sound.category === id);
                        const isExpanded = !!sounds.find(sound => sound.enabled);

                        return (
                            <Expandable
                                title={ id || `${(instrument.description || capitalize(instrument.id))}` }
                                className="expandable-list u-mb05"
                                titleClassName="expandable-list__title"
                                bodyClassName="expandable-list__body"
                                isExpanded={isExpanded}
                                key={index}
                            >
                                <ul className="sound-list">
                                    {sounds.map((sound, i) => (
                                        <li id={sound.id} data-parent-id={instrument.id} onClick={this.onSoundToggle} className={`sound-list__item ${sound.enabled ? 'is-enabled' : ''}`} key={i} >{sound.description || sound.id}</li>
                                    ))}
                                </ul>
                            </Expandable>
                        );
                    });

                return (
                    <div className="u-mb2" key={index}>
                        <div className="u-flex-row" key={index}>
                            <span onClick={e => this.launchSettings(instrument)}><SVG icon="gear" className="icon-inline u-mr025 u-curp u-txt-dark" /></span>
                            <h3 className="title-secondary u-mb05">{instrument.description || instrument.id}</h3>
                        </div>
                        {categories}
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

class InstrumentSettingsPane extends Component {
    render = () => {
        const { instrument } = this.props;
        return (
            <div>
                <h2 className="title-primary">{ instrument.description || instrument.id } Settings</h2>
                <div className="u-mb1">
                    <PitchController pitch={instrument.pitch} id={instrument.id} actions={{ updateInstrumentPitch: this.props.actions.updateInstrumentPitch }} />
                </div>
                <button className="button-primary button-primary--small button-primary--positive" onClick={this.props.actions.disableModal} >Continue</button>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { capitalize } from '../utils/tools';

import Expandable from './Expandable';

class InstrumentList extends Component {

    onSoundToggle = (event) => {
        const soundID = event.target.getAttribute('id');
        const parentID = event.target.getAttribute('data-parent-id');
        const currentValue = this.props.instruments.find(i => i.id === parentID).sounds.find(s => s.id === soundID).enabled;
        const prop = 'enabled';
        const value = !currentValue;

        this.props.actions.updateInstrumentSound({ soundID, parentID, prop, value });
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
                                title={ id || `${(instrument.description || capitalize(instrument.id))} (ungrouped)` }
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
                        <h3 className="title-secondary">{instrument.description || instrument.id}</h3>
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

export {
    InstrumentList,
};

var sort_by = function(field, reverse, primer){

   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
}

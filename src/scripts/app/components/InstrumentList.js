import React, { Component } from 'react';

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
                const sounds = instrument.sounds.map((sound, i) => {
                    return (
                        <li id={sound.id} data-parent-id={instrument.id} onClick={this.onSoundToggle} className={`u-curp ${sound.enabled ? '' : 'text-strikeout'}`} key={i} >{sound.description || sound.id}</li>
                    );
                });

                return (
                    <div className="u-mb2" key={index}>
                        <h3 className="title-secondary">{instrument.description || instrument.id}</h3>
                        <ul className="cleanlist u-ml1">
                            {sounds}
                        </ul>
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

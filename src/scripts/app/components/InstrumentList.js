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
                        <li id={sound.id} data-parent-id={instrument.id} onClick={this.onSoundToggle} className={sound.enabled ? '' : 'strikeout'} key={i} >{sound.id}</li>
                    );
                } );

                return (
                    <div key={index}>
                        <h3>{instrument.id}</h3>
                        <ul>
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

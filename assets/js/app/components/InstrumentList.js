import React, { Component } from 'react';

class InstrumentList extends React.Component {
    render () {
        const instrumentViews = this.props.instruments
            .map((instrument, index) => {
                const sounds = instrument.sounds.map((sound, i) => <li key={i}>{sound.id}</li>);
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

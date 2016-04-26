import React, { Component } from 'react';

class InstrumentList extends React.Component {
    render () {
        console.log(this.props)
        const instrumentViews = this.props.instruments.map(instrument => {
                const sounds = instrument.sounds.map(sound => <li>{sound.id}</li>);
                return (
                    <div>
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

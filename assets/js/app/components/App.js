import React, { Component } from 'react';
import { InstrumentList } from './InstrumentList';

class App extends React.Component {
    render () {
        return (
            <InstrumentList instruments={this.props.instruments} />
        );
    }
}

export {
    App,
};

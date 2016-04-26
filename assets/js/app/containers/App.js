import React, { Component } from 'react';

export class App extends Component {

    test = 4;

    componentWillMount () {

    }

    render() {
        return (
            <section>
                {this.props.children}
            </section>
        );
    }
}

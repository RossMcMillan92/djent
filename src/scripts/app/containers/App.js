import React, { Component } from 'react';

export class App extends Component {
    render() {
        return (
            <section>
                {this.props.children}
            </section>
        );
    }
}

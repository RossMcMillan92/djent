import React, { Component } from 'react'

export default class App extends Component {
    componentDidMount = () => {
        const splashScreen = document.querySelector('[splash-screen]')
        splashScreen
            .classList
            .add('is-disabled')
    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    hasLoaded = false

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

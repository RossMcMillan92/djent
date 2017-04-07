import React, { Component } from 'react'
import listenForKonami from 'modules/listenForKonami'
import { logError, log } from 'utils/tools'

export default class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    hasLoaded = false

    componentWillMount = () => {
        this.checkForHash()
    }

    componentWillUpdate = () => {
        this.checkForHash()
    }

    componentDidMount = () => {
        const splashScreen = document.querySelector('[splash-screen]')
        splashScreen
            .classList
            .add('is-disabled')

        listenForKonami()
            .fork(logError, () => log('konamiiiiii'))
    }

    // lol
    checkForHash = () => {
        // I started with hash urls instead of normal urls, and now I need to support both.
        if (!this.hasLoaded && document.location.hash.includes('share/')) {
            this.context.router.push(document.location.hash.slice(1))
        } else {
            this.hasLoaded = true
        }
    }

    render() {
        return (
            <div>
                { this.hasLoaded ? this.props.children : null }
            </div>
        )
    }
}

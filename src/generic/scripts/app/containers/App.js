import React, { Component } from 'react'

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

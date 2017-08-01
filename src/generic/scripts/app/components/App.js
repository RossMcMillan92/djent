import React, { Component } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from 'routes'

class App extends Component {
    render = () => (
        <Provider store={this.props.store}>
            <Router key={Math.random()} history={this.props.history} routes={routes} />
        </Provider>
    )
}

export default App

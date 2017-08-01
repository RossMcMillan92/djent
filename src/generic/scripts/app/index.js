import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import configureStore from 'store/configureStore'
import RootContainer from './components/App'

const store = configureStore()
const App = (
    <AppContainer>
        <Component store={store} history={browserHistory} />
    </AppContainer>
)
const render = (Component) => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

render(RootContainer)

if (module.hot) {
  module.hot.accept('./components/App', () => { render(RootContainer) })
}

export default App

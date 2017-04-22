import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import Main from './containers/Main'

export default (
    <Route path="/">
        <IndexRoute component={Main} />
        <Redirect from='/**/share/:shareID' to='share/:shareID' />
        <Route path="share/:shareID" component={Main} id="share" />
        <Route path="preset/:presetID" component={Main} id="preset" />
        <Route path="sequences" component={Main} id="sequences" />
        <Route path="instruments" component={Main} id="instruments" />
        <Route status={404} path="*" component={Main} />
    </Route>
)

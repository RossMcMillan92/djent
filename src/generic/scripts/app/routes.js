import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import Main from './containers/Main'

export default (
    <Route path="/" component={Main}>
        <Redirect from='/**/share/:shareID' to='share/:shareID' />
        <Route path="share/:shareID" id="share" />
        <Route path="preset/:presetID" id="preset" />
        <Route path="sequences" id="sequences" />
        <Route path="instruments" id="instruments" />
        <Route status={404} path="*" />
    </Route>
)

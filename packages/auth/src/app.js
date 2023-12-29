import React from 'react'
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Signin from './components/Signin'
import Signup from './components/Signup'

export default ({ history }) => {
    const generateClassName = createGenerateClassName({
        productionPrefix: 'au'
    })
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route path='/auth/signin' component={Signin} />
                    <Route path='/auth/signup' exact component={Signup} />
                </Switch>
            </Router>
        </StylesProvider>
    </div>
}
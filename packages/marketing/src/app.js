import React from 'react'
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'
// import Til from '../../../markdown/Til'

export default ({ history }) => {
const generateClassName = createGenerateClassName({
    productionPrefix: 'ma'
})
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    {/* <Route path='/til' exact component={Til} /> */}
                    <Route path='/pricing' exact component={Pricing} />
                    <Route path='/' component={Landing} />
                </Switch>
            </Router>
        </StylesProvider>
    </div>
}

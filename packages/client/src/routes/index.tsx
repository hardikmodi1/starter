import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateTeam from '../modules/team/CreateTeamConnector'
import Login from '../modules/user/login/LoginConnector'
import Register from '../modules/user/register/RegisterConnector'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={Register} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/create-team" component={CreateTeam} />
    </Switch>
  </BrowserRouter>
)

export default Routes

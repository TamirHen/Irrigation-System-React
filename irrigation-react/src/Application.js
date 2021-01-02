import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

import { UserContext } from './providers/UserProvider';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function Application() {
  const user = useContext(UserContext);

  return user ? (
    <MainPage key="main-page" />
  ) : (
    <>
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Application;

/* eslint consistent-return: off */
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';

import { UserContext } from './providers/UserProvider';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

function Application() {
  const user = useContext(UserContext);

  function renderSwitch() {
    switch (user) {
      case 'initial':
        break;
      case undefined:
        return (
          <>
            <Router>
              <Switch>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/reset-password">
                  <ForgotPassword />
                </Route>
                <Route path="/">
                  <SignIn />
                </Route>
              </Switch>
            </Router>
          </>
        );
      default:
        return <MainPage key="main-page" />;
    }
  }

  return <div>{renderSwitch()}</div>;
}

export default Application;

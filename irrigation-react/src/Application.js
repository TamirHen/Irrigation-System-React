import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';

import { UserContext } from './providers/UserProvider';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// const MainPage = lazy(() => import('./pages/MainPage'));

function Application() {
  const user = useContext(UserContext);

  return user ? (
    <Suspense fallback={<div>loading...</div>}>
      <MainPage key="main-page" />
    </Suspense>
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

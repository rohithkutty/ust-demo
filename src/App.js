import React, { lazy, Suspense, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Loader from './components/Loader';
import ErrorBoundary from './views/ErrorBoundary';

import userReducer from './reducers/userReducer';
import { StateContext, DispatchContext } from './context/userContext';

export const SignIn = lazy(() => import('./views/SignIn'));
export const SignUp = lazy(() => import('./views/SignUp'));
export const Homepage = lazy(() => import('./views/Homepage'));

const initialState = {
  isAuthenticated: false,
  userDetails: {},
  error: null,
};

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <div className='App'>
      <Router>
        <ErrorBoundary>
          <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
              <Header />
              <div style={{ marginTop: '50px' }}>
                <Suspense fallback={<Loader />}>
                  <Switch>
                    <Route exact path='/sign-in' component={SignIn} />
                    <Route exact path='/sign-up' component={SignUp} />
                    <Route exact path='/' component={Homepage} />
                  </Switch>
                </Suspense>
              </div>
            </StateContext.Provider>
          </DispatchContext.Provider>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;

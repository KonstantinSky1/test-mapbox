import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Posts from '../Posts/Posts.jsx';
import Mapbox from '../Mapbox/Mapbox.jsx';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Posts />
        </Route>

        <Route path="/mapbox">
          <Mapbox />
        </Route>
      </Switch>
    </>
  );
}

export default App;
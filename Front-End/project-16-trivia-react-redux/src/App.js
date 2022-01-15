import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './store';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/ranking" component={ Ranking } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/game" component={ Game } />
          <Route path="/" component={ Login } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

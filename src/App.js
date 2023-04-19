import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeInitialMessage from './pages/HomeInitialMessage';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ HomeInitialMessage } />
        <Route path="/ShoppingCart" component={ ShoppingCart } />
      </Switch>

    </div>

  );
}

export default App;

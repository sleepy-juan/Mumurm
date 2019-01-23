import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from './pages/About';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/about" component={About}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/signin" component={SignIn} />
        <Route path="/" component={NotFound}/>
      </Switch>
    );
  }
}

export default App;

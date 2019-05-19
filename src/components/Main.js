import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Responsive from 'react-responsive';
import Nav from './Nav';
import Home from './Home';
import Search from './Search';

const Main = () => {
  
  const onLoad = () => {
    const savedData = JSON.parse(localStorage.getItem('itunes'));
    console.log(savedData);
    
  };
  
  const mobile = {
      height: 'auto',
      width: 'auto',
      marginTop: 55,
      display: 'flex',
      flexDirection: 'column'
    },
    desktop = {
      height: 'auto',
      width: 'auto',
      marginTop: 64,
      marginLeft: 180,
      display: 'flex',
      flexDirection: 'column'
    };
  
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path='/' render={() => (
          <Responsive maxWidth={599}>
            {matches => (
              matches ? <Home view={mobile}/> : <Home view={desktop}/>
            )}
          </Responsive>
        )}/>
        <Route path='/search' render={() => (
          <Responsive maxWidth={599}>
            {matches => (
              matches ? <Search view={mobile}/> : <Search view={desktop}/>
            )}
          </Responsive>
        )}/>
        <Redirect from='*' to='/'/>
      </Switch>
    </Router>
  );
};

export default hot(Main);

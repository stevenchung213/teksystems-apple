import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Responsive from 'react-responsive';
import Loadable from 'react-loadable';
import Nav from './Nav';
import Home from './Home';
import Loading from './Loading';

const Search = Loadable({
  loader: () => import('./Search'),
  loading: Loading
});

class Main extends React.Component {
  
  state = {
    data: null,
    kinds: null
  };
  
  clearLocal = () => {
    localStorage.removeItem('itunes');
    this.setState({ data: null });
  };
  
  saveToLocal = (media, kind) => {
    let data = this.state.data;
    media.hearted = true;
    if (data == null) {
      data = { [kind]: [media] };
    } else {
      if (!data.hasOwnProperty(kind)) {
        data[kind] = [media];
      } else {
        data[kind].push(media);
      }
    }
    localStorage.setItem('itunes', JSON.stringify(data));
    this.setState({ data: {...data} });
  };
  
  deleteLocal = (media, kind) => {
    let data = this.state.data;
    let kinds = this.state.kinds;
    media.hearted = false;
    if (data[kind].length === 1 && data[kind][0].url === media.url) {
      delete data[kind];
      localStorage.setItem('itunes', JSON.stringify(data));
      kinds.splice(kinds.indexOf(kind), 1);
      this.setState({ data: data, kinds: kinds });
    } else {
      for (let i = 0; i < data[kind].length; i++) {
        if (data[kind][i].url === media.url) {
          data[kind].splice(i, 1);
        }
      }
    }
    if (Object.keys(data).length === 0) {
      localStorage.clear();
      this.setState({ data: null })
    }
    localStorage.setItem('itunes', JSON.stringify(data));
    this.setState({ data: data });
  };
  
  componentDidMount() {
    if (localStorage.getItem('itunes') !== null && localStorage.getItem('itunes') !== '{}') {
      const getLocalData = JSON.parse(localStorage.getItem('itunes'));
      const kinds = Object.keys(getLocalData);
      this.setState({ data: getLocalData, kinds: kinds });
    } else {
      this.setState({ data: null, kinds: null })
    }
  }
  
  render() {
    const mobile = {
        height: 'auto',
        width: 'auto',
        marginTop: 48,
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
        <Nav clearAll={this.clearLocal}/>
        <Switch>
          <Route exact path='/' render={() => (
            <Responsive maxWidth={599}>
              {matches => (
                matches ?
                  <Home view={mobile} kinds={this.state.kinds} data={this.state.data}
                        addData={this.saveToLocal} removeData={this.deleteLocal}/>
                  :
                  <Home view={desktop} kinds={this.state.kinds} data={this.state.data}
                        addData={this.saveToLocal} removeData={this.deleteLocal}/>
              )}
            </Responsive>
          )}/>
          <Route path='/search' render={() => (
            <Responsive maxWidth={599}>
              {
                matches => matches ?
                  <Search view={mobile} addData={this.saveToLocal}
                          removeData={this.deleteLocal}/>
                  :
                  <Search view={desktop} addData={this.saveToLocal}
                          removeData={this.deleteLocal}/>
              }
            </Responsive>
          )}/>
          <Redirect from='*' to='/'/>
        </Switch>
      </Router>
    );
  }
}

export default hot(Main);

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
  
  constructor() {
    super();
    this.state = {
      data: null,
      kinds: null
    };
  }
  
  clearLocal = () => {
    localStorage.clear();
    this.setState({ data: null });
  };
  
  saveToLocal = (media, kind) => {
    let data = this.state.data;
    if (!data) {
      data = { [kind]: [media] };
    } else {
      if (!data.hasOwnProperty(kind)) {
        data[kind] = [media];
      } else {
        data[kind].push(media);
      }
    }
    localStorage.setItem('itunes', JSON.stringify(data));
    this.setState({ data: data });
    
    // if (!localStorage.getItem('itunes')) {
    //   const newStorage = { [kind]: [] };
    //   newStorage[kind].push(media);
    //   localStorage.setItem('itunes', JSON.stringify(newStorage));
    // } else {
    //   const existingStorage = localStorage.getItem('itunes');
    //   if (!existingStorage.includes(media.url)) {
    //     const parsedStorage = JSON.parse(existingStorage);
    //     if (parsedStorage[kind]) {
    //       parsedStorage[kind].push(media);
    //       localStorage.setItem('itunes', JSON.stringify(parsedStorage));
    //     } else {
    //       parsedStorage[kind] = [];
    //       parsedStorage[kind].push(media);
    //       localStorage.setItem('itunes', JSON.stringify(parsedStorage));
    //     }
    //   }
    // }
    // this.componentDidMount();
  };
  
  deleteLocal = (media, kind) => {
    const data = this.state.data;
    if (data[kind].length === 1 && data[kind][0].url === media.url) {
      delete data[kind];
      localStorage.setItem('itunes', JSON.stringify(data));
      this.setState({ data: data });
      return;
    }
    for (let i = 0; i < data[kind].length; i++) {
      if (data[kind][i].url === media.url) {
        data[kind].splice(i, 1);
      }
    }
    localStorage.setItem('itunes', JSON.stringify(data));
    this.setState({ data: data });
    
    // const filtered = this.state.data[kind].filter(item => item.url !== media.url);
    // const localData = localStorage.getItem('itunes');
    // const parsedData = JSON.parse(localData);
    // const filtered = parsedData[kind].filter(localMedia => localMedia.url !== media.url);
    // parsedData[kind] = filtered;
    // for (let key in parsedData) {
    //   if (!parsedData[key].length) {
    //     delete parsedData[key]
    //   }
    // }
    // if (Object.keys(parsedData).length === 0) {
    //   localStorage.clear();
    // }
    // localStorage.setItem('itunes', JSON.stringify(parsedData));
    // this.componentDidMount();
  };
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(nextState.data) === JSON.stringify(this.state.data);
  }
  
  componentDidMount() {
    if (localStorage.getItem('itunes') !== null && localStorage.getItem('itunes') !== '{}') {
      console.log('try1')
      console.log(JSON.parse(localStorage.getItem('itunes')));
      const getLocalData = JSON.parse(localStorage.getItem('itunes'));
      const kinds = Object.keys(getLocalData);
      this.setState({ data: getLocalData, kinds: kinds });
    } else {
      console.log('try2')
      this.setState({ data: null, kinds: null })
    }
  }
  
  render() {
    console.log(this.state.data)
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

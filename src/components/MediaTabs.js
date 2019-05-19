import React from 'react';
import Responsive from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Media from './Media';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class MediaTabs extends React.Component {
  state = {
    value: 0,
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes, kinds, data, home } = this.props;
  
    const SearchNav = style => (
      <AppBar position="static" color="default" style={style}>
        <Tabs value={value} onChange={this.handleChange}
              indicatorColor="primary" textColor="primary"
              variant="scrollable" scrollButtons="auto">
          {
            kinds && kinds.map(kind => <Tab label={`${kind}s`} key={`${kind}`}/>)
          }
        </Tabs>
      </AppBar>
    );
    
    const { value } = this.state;
    const homeDesktopTabs = {
        position: 'sticky',
        top: 64,
        marginBottom: 5,
        zIndex: 10,
      },
      homeMobileTabs = {
        position: 'sticky',
        top: 48,
        marginBottom: 5,
        zIndex: 10
      },
      desktopTabs = {
        position: 'sticky',
        top: 136,
        marginBottom: 5,
        zIndex: 10
      },
      mobileTabs = {
        position: 'sticky',
        top: 120,
        marginBottom: 5,
        zIndex: 10
      },
      kindsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      };
    
    const Header = (bool) => bool ?
      <Responsive maxWidth={599}>
        {matches => matches ?
          SearchNav(homeMobileTabs)
          :
          SearchNav(homeDesktopTabs)
        }
      </Responsive>
      :
      <Responsive maxWidth={599}>
        {
          matches => matches ?
          SearchNav(mobileTabs)
          :
          SearchNav(desktopTabs)
        }
      </Responsive>;
    
    return (
      <div className={classes.root}>
        {Header(home)}
        <div id={`tab-container`} style={kindsContainer}>
          {
            data && data[kinds[value]].map((media, i) =>
              <Media media={media} key={`${media}-${i}`} kind={kinds[value]} saved={home}/>)
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaTabs);

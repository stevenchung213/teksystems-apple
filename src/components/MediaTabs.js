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
    const SearchNav = style => (
      <AppBar position="static" color="default" style={style}>
        <Tabs value={value} onChange={this.handleChange}
              indicatorColor="primary" textColor="primary"
              variant="scrollable" scrollButtons="auto">
          {
            kinds.map(kind => <Tab label={`${kind}s`} key={`${kind}`}/>)
          }
        </Tabs>
      </AppBar>
    );
    
    const { classes, kinds, data } = this.props;
    const { value } = this.state;
    const desktopTabs = {
        position: 'sticky',
        top: 136,
        marginBottom: 5
      },
      mobileTabs = {
        position: 'sticky',
        top: 55,
        marginBottom: 5
      },
      kindsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      };
    
    return (
      <div className={classes.root}>
        <Responsive maxWidth={599}>
          {matches => (
            matches ? (
              SearchNav(mobileTabs)
            ) : (
              SearchNav(desktopTabs)
            ))
          }
        </Responsive>
        <div id={`tab-container`} style={kindsContainer}>
          {
            data[kinds[value]].map((media, i) =>
              <Media media={media} key={`${media}-${i}`}/>)
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaTabs);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Media from './Media';

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

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
    const { classes, kinds, data } = this.props;
    const { value } = this.state;
    console.log(data);
    const kindsContainer = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange}
                indicatorColor="primary" textColor="primary"
                variant="scrollable" scrollButtons="auto">
            {
              kinds.map(kind => <Tab label={`${kind}s`} key={`${kind}`}/>)
            }
          </Tabs>
        </AppBar>
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

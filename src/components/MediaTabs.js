import React from 'react';
import Responsive from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Media from './Media';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class MediaTabs extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: 0,
      data: null,
      kinds: null
    };
  }
  
  componentDidMount() {
    this.setState({data: this.props.data, kinds: this.props.kinds});
  }
  
  heartStatus = (id, kind) => {
    let modified = this.state.data;
    for (let i = 0; i < modified[kind].length; i++) {
      if (Object.values(modified[kind][i]).includes(id)) {
        if (!modified[kind][i].hasOwnProperty('hearted')) {
          modified[kind][i].hearted = true;
        } else {
          modified[kind][i].hearted = !modified[kind][i].hearted;
        }
      }
    }
    this.setState({ data: modified })
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
    
    const { classes, home, addData, removeData } = this.props;
    const { value, data, kinds } = this.state;
    
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
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'rgba(250,250,250)'
      };
    
    const Header = (bool) => bool ?
      <Responsive maxWidth={599}>
        {
          matches => matches ?
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
      Array.isArray(kinds) && kinds.length > 0 ?
        <div className={classes.root}>
          {
            Header(home)
          }
          <div id={`tab-container`} style={kindsContainer}>
            {
              data[kinds[value]] ?
                data[kinds[value]].map((media, i) =>
                  <Media media={media} key={i}
                         kind={kinds[value]} saved={home}
                         addData={addData} removeData={removeData}
                         heartStatus={this.heartStatus}/>)
                :
                <Typography variant="h5" align="center" color="textSecondary"
                            style={{ marginTop: 30 }}>
                  You have no media of this kind...
                </Typography>
            }
          </div>
        </div>
        :
        <div/>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaTabs);

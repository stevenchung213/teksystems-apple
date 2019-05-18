import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import SearchIcon from '@material-ui/icons/SearchTwoTone';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

const ResponsiveDrawer = (props) => {
  
  const [mobileOpen, handleDrawerToggle] = useState(false);
  
  const { classes } = props;
  
  const drawer = (
    <div>
      <div className={classes.toolbar}/>
      <Divider/>
      <List>
        <ListItem button key={'nav-home'}>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary={'Home'}/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button key={'nav-search'}>
          <ListItemIcon>
            <SearchIcon/>
          </ListItemIcon>
          <ListItemText primary={'Search'}/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button key={'nav-trash'}>
          <ListItemIcon>
            <DeleteIcon/>
          </ListItemIcon>
          <ListItemText primary={'Delete'}/>
        </ListItem>
      </List>
      <Divider/>
    </div>
  );
  
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => handleDrawerToggle(!mobileOpen)}
            className={classes.menuButton}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            iTunes Catalog
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={props.container}
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClose={() => handleDrawerToggle(!mobileOpen)}
            classes={{
              paper: classes.drawerPaper,
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);

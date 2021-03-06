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
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom'

const drawerWidth = 180;

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

const Nav = (props) => {
  
  const [mobileOpen, handleDrawerToggle] = useState(false);
  
  const { classes, clearAll } = props;
  
  const drawer = (
    <div>
      <div className={classes.toolbar}/>
      <Divider/>
      <List>
        <Link component={RouterLink} to="/">
          <ListItem button key={'nav-home'}>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={'My Media'}/>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link component={RouterLink} to="/search">
          <ListItem button key={'nav-search'}>
            <ListItemIcon>
              <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary={'Search'}/>
          </ListItem>
        </Link>
      </List>
      <Divider/>
      <List>
        <ListItem button key={'empty-local'} onClick={clearAll}>
          <ListItemIcon>
            <DeleteIcon/>
          </ListItemIcon>
          <ListItemText primary={'Delete All'}/>
        </ListItem>
      </List>
    </div>
  );
  
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="fixed" color="default"
              className={classes.appBar} style={{ boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => handleDrawerToggle(!mobileOpen)}
            className={classes.menuButton}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h4" color="secondary"
                      align="center" noWrap>
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

export default withStyles(styles, { withTheme: true })(Nav);

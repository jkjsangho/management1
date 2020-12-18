import React, { useState, Fragment } from 'react';
/* import clsx from 'clsx'; */
import {
  Link
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
//import CustomerAdd from './components/CustomerAdd';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import CheckIcon from '@material-ui/icons/Check';

import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const styles = theme => ({
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  Tab:{
    flexGrow: 1
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});


const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick, value, handleChange }) => (
    <Fragment>
      <AppBar className={classes.aboveDrawer}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
          >
            {title}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.Tab}>
           <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="HOME Tab1" component={Link} to="/" />
              <Tab label="Menu1 Tab2" component={Link} to="/about"/>
              <Tab label="Menu2 Tab3" component={Link} to="/menu2"/>
           </Tabs>
          </div>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
{/*       {value === 0 && (
        <Typography component="div" className={classes.tabContent}>
          Item One
        </Typography>
      )}
      {value === 1 && (
        <Typography component="div" className={classes.tabContent}>
          Item Two
        </Typography>
      )}
      {value === 2 && (
        <Typography component="div" className={classes.tabContent}>
          Item Three
        </Typography>
      )}
      <div className={classes.toolbarMargin} /> */}
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ open, onClose, onItemClick }) => (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem button component={Link} to="/" replace onClick={onItemClick('Home')}>
        <TurnedInIcon color="primary"/>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/about" replace onClick={onItemClick('Menu 1')}>
        <TurnedInIcon color="primary"/>
          <ListItemText>Menu 1</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/menu2" replace onClick={onItemClick('Menu 2')}>
          {/* <ListItem button containerElement={<Link to="/menu1" replace />} onClick={onItemClick('Page 3')}> */}
          <TurnedInIcon color="primary"/>
          <ListItemText>Menu 2</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/deviceinfo" replace onClick={onItemClick('DeviceInfo')}>
        <ListItemIcon>
            <CheckIcon color="primary"/>
          </ListItemIcon>
          <ListItemText>DeviceInfo</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/countinfo" replace onClick={onItemClick('CountInfo')}>
          <ListItemIcon>
          <CheckIcon/>
          </ListItemIcon>
          <ListItemText>CountInfo</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/serialnum" replace onClick={onItemClick('SerialNum')}>
          <ListItemIcon>
            <CheckIcon/>
          </ListItemIcon>
          <ListItemText>SerialNum</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/blacklist" replace onClick={onItemClick('BlackList')}>
          <ListItemText>BlackList</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/racog" replace onClick={onItemClick('Racog')}>
          <ListItemText>Racog</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/settings" replace onClick={onItemClick('Settings')}>
          <ListItemText>Settings</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/upgrade" replace onClick={onItemClick('upgrade')}>
          <ListItemText>Upgrade</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/user" replace onClick={onItemClick('User')}>
          <ListItemText>User</ListItemText>
          </ListItem>
      </List>
    </Drawer>
  )
);

function Header({ classes }) {

  /* 메뉴 목록 */
  let [drawer, setDrawer] = useState(false);
  
  /* 타이틀 수정 */
  let [title, setTitle] = useState('Home');

  /* 탭 */
  let [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  };

  console.log(title);
  console.log(value);
  console.log(title);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} value={value} handleChange={handleChange}/>

      {/*Navigation으로 빼서 분활?*/}
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
      />
    </div>
  )
}

export default withStyles(styles)(Header);
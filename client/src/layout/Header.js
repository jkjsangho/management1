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
import WebIcon from '@material-ui/icons/Web';
import CheckIcon from '@material-ui/icons/Check';

import { green } from '@material-ui/core/colors';

import Divider from '@material-ui/core/Divider';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';

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

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closestIndexTo } from 'date-fns';

import upgrade from '../routes/upgrade';

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
  Tab: {
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
            {/* 탭 설정 위치 */}
            {/* <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="HOME Tab1" component={Link} to="/" />
              <Tab label="Menu1 Tab2" component={Link} to="/about" />
              <Tab label="Menu2 Tab3" component={Link} to="/menu2" />
            </Tabs> */}
          </div>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {/* <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            /> */}
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


/* const [modalStyle] = useState(getModalStyle); */

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

/* const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const classes = useStyles();

const body = (
  <div style={getModalStyle} className={classes.paper}>
    <h2 id="simple-modal-title">Text in a modal</h2>
    <p id="simple-modal-description">
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </p>
  </div>
); */

function Header({ classes }) {

  /* 메뉴 목록 */
  const [drawer, setDrawer] = useState(false);

  /* 타이틀 수정 */
  let [title, setTitle] = useState('');

  /* 탭 */
  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
    console.log("handlechange 진입 = ", value);
  };

  const titlechange = (e, title) => {
    setTitle(title);
    console.log("titlechange 진입 = ", title);
  };


  console.log("title 초기값 = ", title);

  console.log("value 초기값 = ", value);

  const toggleDrawer = () => {
    setDrawer(!drawer);
    setOpen(false);
  };

  const onItemClick = title => () => {
    console.log("item 클릭");
    console.log("title1 =", title);
    setTitle(title);
    console.log("title2 =", title);
  };

  const [open2, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("handleopen 들어옴");
  };

  const handleClose = () => {
    setOpen(false);
    console.log("handleclose 들어옴")
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classess = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classess.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onchange={titlechange} onMenuClick={toggleDrawer} value={value} handleChange={handleChange} />

      {/*Navigation으로 빼서 분활?*/}
      <Drawer open={drawer} onClose={toggleDrawer}>
        <List>

          <Divider />

          <ListItem button component={Link} to="/" replace onClick={onItemClick('Home')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Home</ListItemText>
          </ListItem>

          <Divider />

          {/*         <ListItem button component={Link} to="/about" replace onClick={onItemClick('Menu 1')}>
        <TurnedInIcon color="primary"/>
          <ListItemText>Menu 1</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/menu2" replace onClick={onItemClick('Menu 2')}> */}
          {/* <ListItem button containerElement={<Link to="/menu1" replace />} onClick={onItemClick('Page 3')}> */}
          {/*           <TurnedInIcon color="primary"/>
          <ListItemText>Menu 2</ListItemText>
        </ListItem> */}
          <ListItem button component={Link} to="/deviceinfo" replace onClick={onItemClick('DeviceInfo')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Device</ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/countinfo" replace onClick={onItemClick('CountInfo')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Count</ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/serialnum" replace onClick={onItemClick('SerialNum')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;S/N</ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/blacklist" replace onClick={onItemClick('BlackList')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;BlackList</ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/recog" replace onClick={onItemClick('Recog')}>
            <WebIcon color="primary" />
            {/* <WebIcon style={{ color: green[500] }} /> */}
            <ListItemText>&nbsp;&nbsp;<del>Recog</del></ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/settings" replace onClick={onItemClick('Settings')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;<del>Settings</del></ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/upgrade" replace onClick={onItemClick('upgrade')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;F/W Upgrade</ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/user" replace onClick={onItemClick('User')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;User</ListItemText>
          </ListItem>

          <Divider />

          {/* <ListItem button component={Link} to="/user2" replace onClick={onItemClick('User2')}>
            <WebIcon color="primary" />
            <ListItemText>User2</ListItemText>
          </ListItem>

          <Divider /> */}

          <div>
          <ListItem button onClick={handleOpen}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Modal</ListItemText>
          </ListItem>
            <Modal
              open={open2}
              onClose={toggleDrawer}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>

        </List>
      </Drawer >
    </div>
  )
}

export default withStyles(styles)(Header);
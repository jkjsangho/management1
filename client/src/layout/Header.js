import React, { useState, Fragment } from 'react';
/* import clsx from 'clsx'; */
import {
  Link
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
//import CustomerAdd from './components/CustomerAdd';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
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
    margin: theme.spacing.unit * 2
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
    width: theme.spacing.unit * 9,
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
    paddingLeft: theme.spacing.unit * 10,
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
          <div classname={classes.Tab}>
           <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="HOME Tab1" component={Link} to="/" />
              <Tab label="Menu1 Tab2" component={Link} to="/about"/>
              <Tab label="Menu2 Tab3" component={Link} to="/menu1"/>
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
      {value === 0 && (
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
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ open, onClose, onItemClick }) => (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem button component={Link} to="/" replace onClick={onItemClick('Home')}>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/about" replace onClick={onItemClick('Menu 1')}>
          <ListItemText>Menu 1</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/menu1" replace onClick={onItemClick('Menu 2')}>
          {/* <ListItem button containerElement={<Link to="/menu1" replace />} onClick={onItemClick('Page 3')}> */}
          <ListItemText>Menu 2</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
);

function Header({ classes }) {


  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState('Home');

  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  };

  console.log(title);
  console.log(value);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = M_Name => () => {
    setTitle(M_Name);
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
/* 
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      title:""
    };
  }

  handleDrawerToggle = () => this.setState({ toggle: !this.state.toggle })

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar >
            <IconButton
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              정보
              </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
          <Drawer open={this.state.toggle} onClose={this.handleDrawerToggle}>
            <MenuItem button component={Link} to="/" onClick={this.handleDrawerToggle}>Home</MenuItem>
            <List>
              <ListItem button component={Link} to="/about" onClick={this.handleDrawerToggle}>
                <ListItemText>메뉴1</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/menu1" onClick={this.handleDrawerToggle}>
                <ListItemText>메뉴2</ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleDrawerToggle}>
                <ListItemText>메뉴3</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </AppBar>
      </div>
    );
  }
} */

export default withStyles(styles)(Header);
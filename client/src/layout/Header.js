import React, { useState, useEffect, Fragment } from 'react';
/* import clsx from 'clsx'; */
import {
  Link
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
//import CustomerAdd from './components/CustomerAdd';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WebIcon from '@material-ui/icons/Web';

import Divider from '@material-ui/core/Divider';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

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

import upgrade from '../routes/upgrade';

import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DevicesIcon from '@material-ui/icons/Devices';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

//달력
import CustomDateComponent from '../components/customDateComponent';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import axios from "axios";
import { result } from 'lodash';
import { post } from 'request';

let flag;
let jsonFileList = new Array();
let inputlistArray = new Array();

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
      marginLeft: theme.spacing(1),
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
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
    zIndex: theme.zIndex.drawer + 1,
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
          11111
          <div className={classes.Tab}>
            {/* 탭 설정 위치 */}
            {/* <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="HOME Tab1" component={Link} to="/" />
              <Tab label="Menu1 Tab2" component={Link} to="/about" />
              <Tab label="Menu2 Tab3" component={Link} to="/menu2" />
            </Tabs> */}
            22222
          </div>
          33333
          <div className={classes.grow} />
          4444
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

  console.log("1", top);
  console.log("2", left);

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: '30%', width: '30%',
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
    setOpen2(false);
    setTitle(title);

    //Modal Close 시 초기화
    setValues();
    setSN();
    setinputlist();
  };

  const onItemClick = title => () => {
    console.log("item 클릭");
    console.log("title1 =", title);
    setTitle(title);
    console.log("title2 =", title);
  };

  const [open2, setOpen] = useState(false);
  const [open3, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("handleopen 들어옴");
  };

  const handleClose = () => {
    setOpen(false);
    console.log("handleclose 들어옴")
  };

  const handleOpen2 = () => {
    setOpen2(true);
    console.log("handleopen2 들어옴");
  };

  const handleClose2 = () => {
    setOpen2(false);
    console.log("handleclose2 들어옴")
  };

  const [count, setCount] = useState();
  console.log("count start", count)

  //Left Click Start(json에 selected 추가해서 true false로 체크박스 확인)
  const UPonClick = index => () => {
    console.log("index = ", index)
    console.log("post.data.length = ", posts.data.length)
    console.log("post.data[index].MACHINEID : ", posts.data[index].MACHINEID);

    //flag로 selected 선택

    if (posts.data[index].selected == null) {
      posts.data[index].selected = true;
      console.log("index flag = ", posts.data[index].selected);
      /* flag = true; */
    } else if (posts.data[index].selected == true) {
      posts.data[index].selected = false;
      console.log("index flag = ", posts.data[index].selected);
      /* flag = false; */
    } else if (posts.data[index].selected == false) {
      /* flag = true; */
      posts.data[index].selected = true;
      console.log("index flag = ", posts.data[index].selected);
    }

    const item = posts.data[index];

    /* let item; */

    console.log("=================");
    console.log("item = ", item);
    console.log("=================");

    console.log("flag2 = ", flag);
    const newItems = [...items];
    console.log("newItems = ", newItems);

    newItems[index] = { ...item, selected: !item.selected };
    setItems(newItems);

    console.log("item : ", item);
    console.log("items[index] : ", posts.data[index]);
    console.log("index : ", index);
    console.log("selected : ", posts.data.selected);
    console.log("count.itemEND : ", count);

  };
  //Left Click End

  console.log("jsonFileList check length", jsonFileList.length);

  /* const jsonFileList = new Array(); */

  const handleChangeFile = (event) => {
    /* let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    } */

    jsonFileList = new Array();
    console.log("jsonFileList 초기화");

    const curFiles = event.target.files;
    var i = 0;
    //list.MACHINESN으로 수정 필요
    //전송완료 후 새로고침 필요할듯
    posts.data.map((list, index) => {
      if (list.selected == true) {
        console.log("index = ", index);
        console.log("MAC1 = ", list.MACHINESN);

        while (i < curFiles.length) {
          console.log("MAC2 = ", list.MACHINESN);

          var files = curFiles[i];

          jsonFileList.push({
            MAC: list.MACHINESN,
            img: files
          })
          i++;
        }
        i = 0;
        console.log("jsonFileList.map0 = ", jsonFileList);
      }
      console.log("jsonFileList.map1 = ", jsonFileList);
    })
    console.log("jsonFileList.map00 = ", jsonFileList[0]);
    console.log("jsonFileList.map11 = ", jsonFileList[1]);

    console.log("jsonFileList = ", jsonFileList);
    console.log("event.target.files = ", event.target.files);
    console.log("jsonFileList[0] = ", jsonFileList[0]);
    console.log("event.target.files[0] = ", event.target.files[0]);
    console.log("jsonFileList.length", jsonFileList.length);

    console.log("setTotalsetTotalsetTotalsetTotalsetTotal")
    setTotal((currentTotal) => currentTotal + 1);

    //초기화 수정
    inputlistArray = [];

    jsonFileList.map((list, index) => {

      inputlistArray.push({
        name: list.img.name
      })

      console.log("inputlistArray = ", inputlistArray);
    })

    const uniquefilelist = inputlistArray.map(function (val, index) {
      return val['name'];
    }).filter(function (val, index, arr) {
      return arr.indexOf(val) === index;
    });

    console.log("uniquefilelist1 = ", uniquefilelist);

    setinputlist(uniquefilelist);

    console.log("uniquefilelist2 = ", uniquefilelist);

    /*     inputlist.map((list2, index) => {
          console.log("inputlist map = ", list2[index].img.name);
        }) */

    console.log("inputlistinputlistinputlistinputlist = ", inputlist);
  }

  const handlePost = () => {
    const formData = new FormData();
    var i = 0;

    console.log("file post start");

    console.log("jsonFileList", jsonFileList);

    console.log("file post start");

    while (i < jsonFileList.length) {
      formData.append('mac', jsonFileList[i].MAC);
      formData.append('file', jsonFileList[i].img);

      console.log("file post end");

      console.log("handlePost Count = ", jsonFileList.length);
      console.log("handlePost File", jsonFileList);
      console.log("handlePost File[" + i + "] = ", jsonFileList[i]);
      console.log("handlePost File[" + i + "].img.name = ", jsonFileList[i].img.name);

      for (var pair of formData.entries()) { console.log("formData = ", pair[0] + ', ' + pair[1]); }

      /*       for (var key of formData.keys()) {
              console.log("key1 = ", key);
            }
            for (var value of formData.values()) {
              console.log("value1 = ", value);
            } */
      i++;
      console.log("i = ", i);
    }
    return axios.post('api/up', formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then(res => {
        alert('성공')
        for (var pair of formData.entries()) { console.log("formData = ", pair[0] + ', ' + pair[1]); }
        /* for (var key of formData.keys()) {
          console.log("key2 = ", key);
        }
        for (var value of formData.values()) {
          console.log("value2 = ", value);
        } */
      })
      .catch(err => {
        alert('실패')
        for (var key of formData.keys()) {
          console.log("key3 = ", key);
        }
        for (var value of formData.values()) {
          console.log("value3 = ", value);
        }
      })
  }

  const [total, setTotal] = useState(0);

  const [inputlist, setinputlist] = useState([]);

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      position: 'absolute',
      width: 300,
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

  console.log("flag 초기값 = ", flag);

  const [values, setValues] = React.useState('');

  const handleChanges = (event) => {
    setValues(event.target.value);
  };

  const [valueSN, setSN] = React.useState('');

  const handleChangeSN = (event) => {
    setSN(event.target.value);
  };

  function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
      console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
      return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
      str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
  }

  const addBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("posts = ", posts);
    console.log("posts.data = ", posts.data);

    axios.post('post', {
      command: 'ADDUSER',
      /* mid: posts.data[0].CLIENTID, */
      mid: lpad(values, 20, " "),
      msn: lpad(valueSN, 20, " "),
    })
      .then(function (response) {
        console.log("response = ", response);
        console.log("전송완료");
        alert("Device Registration Success");
      })
      .catch(function (error) {
        console.log("error = ", error);
        console.log("에러");
        alert("Device Registration Failed");
      });
  }
  const deleteBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("posts = ", posts);
    console.log("posts.data = ", posts.data);

    axios.post('post', {
      command: 'DELUSER',
      mid: lpad(values, 20, " "),
      msn: lpad(valueSN, 20, " "),
    })
      .then(function (response) {
        console.log("response = ", response);
        console.log("전송완료");
        alert("Device Delete Success");
      })
      .catch(function (error) {
        console.log("error = ", error);
        console.log("에러");
        alert("Device Delete Failed");
      });
  }

  //Left
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  /*   console.log("data.data2 = ", data.data); */

  const [posts, setPosts] = useState();
  useEffect(() => {
    axios
      .get("/GetUserInfo")
      .then(({ data }) => setPosts(data));
  }, []);

  console.log("posts = ", posts);

  const [items, setItems] = useState([]);

  //리스트 아이템 클릭 selected 작업
  const onClick = index => () => {
    console.log("index = ", index)
    console.log("post.data.length = ", posts.data.length)
    console.log("post.data[index].MACHINEID : ", posts.data[index].MACHINEID);

    console.log("flag 변경 전 = ", flag);
    console.log("flag 변경 전 index = ", index);
    console.log("index flag 변경 전 = ", posts.data[index].selected);

    if (posts.data[index].selected == null) {
      posts.data[index].selected = true;
      console.log("index flag = ", posts.data[index].selected);
      /* flag = true; */
    } else if (posts.data[index].selected == true) {
      posts.data[index].selected = false;
      console.log("index flag = ", posts.data[index].selected);
      /* flag = false; */
    } else if (posts.data[index].selected == false) {
      /* flag = true; */
      posts.data[index].selected = true;
      console.log("index flag = ", posts.data[index].selected);
    }
    console.log("index flag 변경 후 = ", posts.data[index].selected);
    console.log("flag 변경 후 = ", flag);
    console.log("flag 변경 후 index = ", index);

    const item = posts.data[index];

    console.log("=================");
    console.log("item = ", item);
    console.log("=================");

    console.log("flag2 = ", flag);
    const newItems = [...items];
    console.log("newItems = ", newItems);

    newItems[index] = { ...item, selected: !item.selected };
    setItems(newItems);

    console.log("item : ", item);
    console.log("items[index] : ", posts.data[index]);
    console.log("index : ", index);
    console.log("selected : ", posts.data.selected);

    //Left 클릭 시 Post 전송
    axios.post('post',
      {
        command: 'GETCNTI',
        clientid: posts.data[index].CLIENTID,
      })
      .then(function (response) {
        console.log(response)
        console.log('response')
      })
      .catch(function (error) {
        console.log(error)
        console.log('error')
      });
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onchange={titlechange} onMenuClick={toggleDrawer} value={value} /* handleChange={handleChange} */ />

      {/*Navigation으로 빼서 분활?*/}
      <Drawer open={drawer} onClose={toggleDrawer}>
        <List>

          <Divider />

          <ListItem button component={Link} to="/" replace onClick={onItemClick('Home')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Home</ListItemText>
          </ListItem>

          <Divider />

          {/* 
          <ListItem button component={Link} to="/about" replace onClick={onItemClick('Menu 1')}>
            <TurnedInIcon color="primary" />
            <ListItemText>Menu 1</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/menu2" replace onClick={onItemClick('Menu 2')}>
            <ListItem button containerElement={<Link to="/menu1" replace />} onClick={onItemClick('Page 3')}>
              <TurnedInIcon color="primary" />
              <ListItemText>Menu 2</ListItemText>
            </ListItem>
          </ListItem>
 */}
          <ListItem button component={Link} to="/deviceinfo" replace onClick={onItemClick('DeviceInfo')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Device</ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/countinfo" replace onClick={onItemClick('CountInfo')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Count Log</ListItemText>
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
            <ListItemText style={{ color: 'red' }}>&nbsp;&nbsp;<del>Recog</del></ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/settings" replace onClick={onItemClick('Settings')}>
            <WebIcon color="primary" />
            {/* <ListItemText style={{ color: 'red' }}>&nbsp;&nbsp;<del>Settings</del></ListItemText> */}
            <ListItemText>&nbsp;&nbsp;Settings</ListItemText>
          </ListItem>
          {/* 
          <Divider />

          <ListItem button component={Link} to="/upgrade" replace onClick={onItemClick('Upgrade')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;F/W Upgrade</ListItemText>
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/user" replace onClick={onItemClick('User')}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;User</ListItemText>
          </ListItem>

 */}
          <Divider />
          {/* 
          <ListItem button component={Link} to="/user2" replace onClick={onItemClick('User2')}>
            <WebIcon color="primary" />
            <ListItemText>User2</ListItemText>
          </ListItem> */}

          <Divider />

          <ListItem button onClick={handleOpen2}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;F/W Upgrade</ListItemText>
          </ListItem>
          <Modal
            open={open3}
            onClose={toggleDrawer}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classess.paper}>
              <div className="left" style={{ float: 'left', position: 'static', backgroundColor: '', width: '50%', height: '20%' }}>
                <Paper style={{ overflow: 'auto' }} className='paper'>
                  <List style={{ maxHeight: 150, position: 'relative', overflow: 'auto' }}>
                    {posts && posts.data.map((post, index) => (
                      <ListItem
                        key={index}
                        button
                        selected={post.selected}
                        onClick={UPonClick(index)}
                      >
                        <ListItemText primary={post.MACHINEID} />
                        <ListItemText primary={post.STATUS} />
                        <ListItemIcon>
                          <MaybeSelectedIcon
                            selected={post.selected}
                            Icon={DevicesIcon}
                          />
                        </ListItemIcon>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <div style={{ float: 'left', position: 'static', backgroundColor: '' }}>
                  <input type="file" name="imgFile" id="imgFile" multiple onChange={handleChangeFile} />
                </div>
                <p></p>
                <div style={{ float: 'left', position: 'static', backgroundColor: '' }}>
                  <Button variant="contained" color="primary" onClick={() => handlePost()}>Upload</Button>
                </div>
              </div>
              <div className="FileList">
                <div style={{ float: 'left', "backgroundColor": "white" }}>
                  <List style={{ maxHeight: 160, position: 'relative', overflow: 'auto' }} subheader='======Upload List======'>
                    {inputlist && inputlist.map((list, index) => (
                      <ListItem
                        key={index}
                      >
                        <ListItemText primary={list} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </div>
          </Modal>
          <Divider />

          <ListItem button onClick={handleOpen}>
            <WebIcon color="primary" />
            <ListItemText>&nbsp;&nbsp;Device Reg</ListItemText>
          </ListItem>
          <Modal
            open={open2}
            onClose={toggleDrawer}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {/* <upgrade open={open} onClose={handleClose}></upgrade> */}
            <div style={modalStyle} className={classess.paper}>
              <div className="left" style={{ float: 'left', position: 'static', backgroundColor: '#EDE7F6', width: '50%', height: '75%' }}>
                <Paper className='paper'>
                  {/* <left/> */}
                  <List style={{ maxHeight: 160, position: 'relative', overflow: 'auto' }}>
                    {posts && posts.data.map((post, index) => (
                      <ListItem
                        key={index}
                        button
                        selected={post.selected}
                        onClick={onClick(index)}
                      >
                        <ListItemText primary={post.MACHINEID} />
                        <ListItemText secondary={post.STATUS} />
                        <ListItemIcon>
                          <MaybeSelectedIcon
                            selected={post.selected}
                            Icon={DevicesIcon}
                          />
                        </ListItemIcon>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <div>
                  <br></br>
                </div>
              </div>
              <div className="right" style={{ float: 'center', position: 'static', backgroundColor: '' }}>
                <TextField inputProps={{ maxLength: 3, }} id="MID" label="Machine ID *" value={values} onChange={handleChanges} color="secondary" />
                <br></br>
                <br></br>
                <TextField inputProps={{ maxLength: 7, }} id="SN" label="Serial Number *" value={valueSN} maxLength={7} onChange={handleChangeSN} color="secondary" />
                <br></br>
                <br></br>
                {/*                     <TextField id="filled" label="MachineID_Copy" value={values} onChange={handleChanges} variant="filled" color="secondary" />
                    <br></br>
                    <br></br>
                    <TextField id="outlined" label="Password" type="password" value={valueSN} onChange={handleChangeSN} variant="outlined" color="secondary" /> */}
                <div className="list" style={{ backgroundColor: '', position: 'static' }}>
                  <Button variant="contained" color="primary" onClick={() => addBtn()}>Add</Button>
                       &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={() => deleteBtn()}>Del</Button>
                </div>
              </div>
            </div>
          </Modal>
          <Divider />
        </List>
      </Drawer >
    </div >
  )
}

export default withStyles(styles)(Header);
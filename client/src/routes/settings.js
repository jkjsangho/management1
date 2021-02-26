import React, { useState, useEffect, Fragment } from 'react';
import { useInterval } from 'react-use';

import Header from '../layout/Header';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';

/* import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from "@material-ui/lab/DateTimePicker"; */

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DevicesIcon from '@material-ui/icons/Devices';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


/* import {makeStyles} from '@material-ui/styles'; */
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import axios from "axios";
import Moment from "react-moment"
import { Typography } from '@material-ui/core';

let flag = 0;
let marker = '';
let marker2 = '';
let marker3 = '';
let marker4 = '';

var blackboxjson = new Array();

const styles = theme => ({

})

function Settings() {

  /* http://localhost:5000 */

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2),
        width: theme.spacing(50),
        height: theme.spacing(50),
      },
      /*       width: '10%',
            backgroundColor: theme.palette.background.paper, */
    },
    nested: {
      paddingLeft: theme.spacing(3),
    },
    control: { margin: theme.spacing(2), minWidth: 140 },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250
      //width: '88%'
    }
  }));

  const [posts, setPosts] = useState();
  const [posts2, setPosts2] = useState();
  const [blackbox, setblackbox] = useState();

  useEffect(() => {
    axios
      .get("/getuserinfo")
      .then(({ data }) => setPosts(data));
  }, []);

  useEffect(() => {
    axios
      .get("/getsettinginfo")
      .then(({ data }) => setPosts2(data));
  }, []);

  useEffect(() => {
    axios
      .get("/getblackbox")
      .then(({ data }) => setblackbox(data));
  }, []);

  const classes = useStyles();

  const [categories, setCategories] = useState([""]);
  const [categories2, setCategories2] = useState([
    { label: 'Free', id: 0 },
    { label: 'Value', id: 1 },
    { label: 'Face', id: 2 },
    { label: 'Orient', id: 3 },
    { label: 'FaceOrient', id: 4 },
    { label: 'Ticket', id: 5 },
    { label: 'SerialNumber', id: 6 },
    { label: 'MultiAuto', id: 7 },
    { label: 'MultiMix', id: 8 },
    { label: 'ValueSerial', id: 9 },
    { label: 'FitnessSort', id: 10 },
    { label: 'Check', id: 11 },
    { label: 'EditionSort', id: 12 },
    { label: 'TapeDetection', id: 13 },
    { label: 'Graffiti', id: 14 },
    { label: 'ATMFit', id: 15 },
    { label: 'AutoFace', id: 16 },
    { label: 'AutoOrient', id: 17 },
    { label: 'AutoFitness', id: 18 },
    { label: 'AutoSNRFit', id: 19 },
  ]);
  const [categories3, setCategories3] = useState([
    { label: 'Count', id: 0 },
    { label: 'Amount', id: 1 },
  ]);
  const [categories4, setCategories4] = useState([
    { label: 'Speed1200NPM', id: 0 },
    { label: 'Speed1000NPM', id: 1 },
    { label: 'Speed800NPM', id: 2 },
    { label: 'Speed600NPM', id: 3 },
    { label: 'Speed1500NPM', id: 4 },
  ]);

  const setters = {
    categories: setCategories,
    categories2: setCategories2,
    categories3: setCategories3,
    categories4: setCategories4,
  };

  const collections = { categories, categories2, categories3, categories4 };

  const onChange = e => {
    const setCollection = setters[e.target.name];

    console.log('e.target.name = ', e.target.name);
    console.log('e.target.name = ', collections[e.target.name]);

    const collection = collections[e.target.name].map(item => ({
      ...item,
      selected: false
    }));

    console.log('collections = ', collections);
    console.log('collection = ', collection);

    const index = collection.findIndex(
      item => item.id === e.target.value,
    );

    console.log("e.target.namee.target.name", e.target.name)
    console.log("e.target.value.target.value", e.target.value)

    console.log("indexindex = ", index)

    collection[index] = { ...collection[index], selected: true };
    setCollection(collection);
    console.log('collectionscollections = ', collections);
    console.log("collectioncollection = ", collection);
    /* 
        if (e.target.name != "products2") {
          console.log("if in e.target.name = ", e.target.name);
          //Currency select
          console.log('collection2collection2 = ', collection2[index].LOC);
          categoriesCurr = collection2[index].LOC;
          console.log('categoriesCurrcategoriesCurr = ', categoriesCurr);
          console.log("posts3.dataposts3.data = ", posts3.data);
          console.log("product2 indexindex = ", index)
    
          posts3.data.map((abc, index) => {
            if (categoriesCurr == posts3.data[index].CURRENCY) {
              jsonFileList2 = posts3.data[index].DENOMINATION;
            }
          })
    
          console.log("jsonFileList2 = ", posts3.data[index].DENOMINATION);
    
          var dateParts2 = jsonFileList2.split(/[,]+/);
          console.log("dateParts2 = ", dateParts2);
    
          dateParts2.map((list, index) => {
            if (dateParts2[index] != "") {
              DenoData.push({
                Curr: categoriesCurr,
                Deno: dateParts2[index],
                id: index + 1
              })
            }
          })
          console.log("setProducts2 inside");
          setProducts2(DenoData);
          console.log("products2products2", products2);
        }
        console.log("products2products2products2", products2); */
  }

  const category = categories.find(category => category.selected) || {
    id: marker
  };
  const category2 = categories2.find(category => category.selected) || {
    id: marker2
  };
  const category3 = categories3.find(category => category.selected) || {
    id: marker3
  };
  const category4 = categories4.find(category => category.selected) || {
    id: marker4
  };

  const Infobtn = () => {
    //Search 클릭 시 Post 전송
    console.log("searchposts = ", posts);
    console.log("posts.data = ", posts.data);
    console.log("posts.data[0].selected = ", posts.data[0].selected);
    /* console.log("posts.data[0].selected = ", posts.data[1].selected); */

    posts.data.map((list, index) => {
      if (list.selected == true) {

        //setting 최신화 요청
        axios.post('post', {
          command: 'GETSETI',
          MacAddr: lpad(posts.data[index].MACADDR, 12, " "),
          msn: lpad(posts.data[index].MACHINESN, 20, " "),
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          });

        console.log("index = ", index);
        console.log("MAC = ", list.MACADDR);

        jsonFileList = posts.data[index].CURRENCYKIND;

        var dateParts = jsonFileList.split('[');

        var LocData = new Array();

        dateParts.map((list, index) => {
          if (list != "") {
            LocData.push({
              LOC: list.substring(0, 3),
              id: index - 1 //전송 편의를 위해 -1
            })
          }
        })

        /* dateParts.map((list, index) => {
          if (dateParts[index] != "") {
            LocData.push({
              LOC: dateParts[index].substring(0, 3),
              id: index
            })
          }
        }) */

        console.log("jsonFileListjsonFileList5 = ", jsonFileList);
        console.log("datePartsdateParts = ", dateParts);
        console.log("aaa aaa aaa aaa = ", LocData);
        console.log("bbb bbb bbb bbb = ", LocData[1]);

        //marker 초기화
        //선택한 Device의 Settting - Currency 값을 초기값으로 적용하는 로직
        marker = '';
        marker2 = '';
        marker3 = '';
        marker4 = '';

        console.log("posts2 == ", posts2)

        posts2.data.map((list2) => {
          if (list2.MACADDR == list.MACADDR) {

            //SET_DATE 20210209
            //SET_TIME 173853

            //datedate = year + "-" + lpad(month, 2, 0) + "-" + lpad(date, 2, 0) + "T" + lpad(hours, 2, 0) + ":" + lpad(minutes, 2, 0) + ":" + lpad(secondss, 2, 0);
            //datedate = list2.SET_DATE.substring(0,4) + "-" + list2.SET_DATE.substring(4,6) + "-" + list2.SET_DATE.substring(6,8) +"T"+list2.SET_TIME.substring(0,2)+":"+list2.SET_TIME.substring(2,4)
            var abc = list2.SET_DATE.substring(0, 4) + "-" + list2.SET_DATE.substring(4, 6) + "-" + list2.SET_DATE.substring(6, 8) + "T" + list2.SET_TIME.substring(0, 2) + ":" + list2.SET_TIME.substring(2, 4) + ":" + list2.SET_TIME.substring(4, 6)
            setdatedate(abc)

            console.log("get datedate", abc)

            console.log("list == ", list)
            console.log("list2 == ", list2)

            let checkcheck
            let checkcheck2
            let checkcheck3

            checkcheck = categories2.find(function (n) {
              if (n.label === list2.CNT_MODE)
                return n.label
            });

            checkcheck2 = categories3.find(function (n) {
              if (n.label === list2.BATCH_MODE)
                return n.label
            });

            checkcheck3 = categories4.find(function (n) {
              if (n.label === list2.CNT_SPEED)
                return n.label
            });

            console.log("list2.CNT = ", list2.BATCH_CNT);
            console.log("list2.AMT = ", list2.BATCH_AMT);

            //handleCNT(list2.BATCH_CNT);
            //handleAMT(list2.BATCH_AMT);

            setCNT(list2.BATCH_CNT);
            setAMT(list2.BATCH_AMT);

            //CNT = list2.BATCH_CNT
            //AMT = list2.BATCH_AMT

            console.log("CNT = ", CNT);
            console.log("AMT = ", AMT);

            console.log("checkcheck = ", checkcheck);
            console.log("checkcheck.id = ", checkcheck.id);
            console.log("checkcheck2 = ", checkcheck2);
            console.log("checkcheck2.id = ", checkcheck2.id);
            console.log("checkcheck3 = ", checkcheck3);
            console.log("checkcheck3.id = ", checkcheck3.id);

            marker2 = checkcheck.id
            category2.id = marker2;

            marker3 = checkcheck2.id
            category3.id = marker3;

            marker4 = checkcheck3.id
            category4.id = marker4;

            LocData.map((list3) => {
              if (list3.LOC == list2.CURRENCYNAME) {
                marker = list3.id
                console.log("LocData[index2].LOC = ", list3.LOC);
                console.log("marker ==", marker);
                console.log("category.id111 = ", category.id);
                category.id = marker;
                console.log("category.id222 = ", category.id);
              }
            })
          }
        })

        setCategories(LocData);
        console.log("categories2categories", categories);
      }

    })
    /* setTimeout(function(){
      alert("blkget Sleep 5sec"); 
   }, 5000); */
  }

  const Savebtn = () => {
    console.log("Savebtn collections = ", collections);
    console.log("category = ", category);
    console.log("category.id = " + category.id + " category2.id = " + category2.id + " category3.id = " + category3.id + " category4.id = " + category4.id +
      " BATCH_CNT = " + CNT + " BATCH_AMT = " + AMT);

    var setcount

    categories.map((aaa) => {
      if (aaa.id == category.id) {
        console.log("category.LOC", aaa.LOC)

        //setcount = Date + Time + CountMode + CurrencyName + BatchMode + BatchCount + BatchAmount + CountSpeed
        setcount = datedate.substring(0, 4) + datedate.substring(5, 7) + datedate.substring(8, 10) + datedate.substring(11, 13) + datedate.substring(14, 16) + datedate.substring(17, 19) + lpad(category2.id, 2, 0) + aaa.LOC + lpad(category3.id, 2, 0) + lpad(CNT, 7, 0) + lpad(AMT, 8, 0) + lpad(category4.id, 2, 0)
      }
    })

    console.log("save DateDate", datedate);
    console.log("setcount = ", setcount);

    //전송부분
    posts.data.map((list, index) => {
      if (list.selected == true) {
        axios.post('post', {
          command: 'SETSETI',
          MacAddr: lpad(posts.data[index].MACADDR, 12, " "),
          msn: lpad(posts.data[index].MACHINESN, 20, " "),
          Setting: setcount,
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          });
      }
    })
  }

  const Blackboxbtn = () => {

    const getBlackbox = () => {
      try {
        axios.get('/getblackbox').then(({ data }) => setblackbox(data));
        return console.log("Async blackbox", blackbox);
      } catch (error) {
        console.error(error);
      }
    };

    const getBlkbox = () => {
      const blkbox = getBlackbox();

      console.log("Breeds = ", blackbox);
      console.log("BreedsBreeds = ", blkbox);

      setblackbox(blkbox);
    };
    //getcountinfo 호출
    console.log("Before blackbox : ", blackbox);
    getBlkbox();
    console.log("After blackbox", blackbox);

    blackboxjson = new Array();

    posts.data.map((list) => {
      if (list.selected == true) {
        console.log("if case blackbox", blackbox);
        {
          blackbox && blackbox.data.map((boxlist, index2) => {
            if (boxlist.MACADDR == list.MACADDR) {

              console.log("OPER_HOUR = ", boxlist.OPER_HOUR);
              console.log("POWERON_HOUR = ", boxlist.POWERON_HOUR);
              console.log("DIVERTER_CNT = ", boxlist.DIVERTER_CNT);
              console.log("blackboxblackbox = ", boxlist.PICKUP_HOUR);

              //선택 한 Device의 Blackbox 값 재정렬 작업
              //**REST 서버에서 쿼리로 MAC을 기준으로 열을 행으로 바꿔서 데이터 제공 필요
              blackboxjson.push({
                ITEM: "Operating Hour",
                VALUE: boxlist.OPER_HOUR
              })
              blackboxjson.push({
                ITEM: "Power on Count",
                VALUE: boxlist.POWERON_HOUR
              })
              blackboxjson.push({
                ITEM: "Diverter Count",
                VALUE: boxlist.DIVERTER_CNT
              })
              blackboxjson.push({
                ITEM: "Pick-up Count",
                VALUE: boxlist.PICKUP_HOUR
              })
              blackboxjson.push({
                ITEM: "Stack Count",
                VALUE: boxlist.STACK_CNT
              })
              blackboxjson.push({
                ITEM: "Reject Count",
                VALUE: boxlist.REJECT_CNT
              })
              blackboxjson.push({
                ITEM: "Error 20 Count",
                VALUE: boxlist.ERR_20CNT
              })
              blackboxjson.push({
                ITEM: "Error 25 Count",
                VALUE: boxlist.ERR_25CNT
              })
              blackboxjson.push({
                ITEM: "Error 31 Count",
                VALUE: boxlist.ERR_31CNT
              })
              blackboxjson.push({
                ITEM: "Error 32 Count",
                VALUE: boxlist.ERR_32CNT
              })
              blackboxjson.push({
                ITEM: "Error 33 Count",
                VALUE: boxlist.ERR_33CNT
              })
              blackboxjson.push({
                ITEM: "Total Error Count",
                VALUE: boxlist.TOTERRCNT
              })


              console.log("blackboxjson", blackboxjson)
              console.log("boxlist.MACADDR = ", boxlist.MACADDR)
              console.log("boxlist.OPER_HOUR = ", boxlist.OPER_HOUR)
              console.log("blackboxblackbox = ", blackbox);
            }
          })
        }
      }
    })
  }

  console.log("flag 초기값 = ", flag);

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

  //Left
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  /*   console.log("data.data2 = ", data.data); */

  console.log("posts = ", posts);
  console.log("posts2 = ", posts2);

  const [items, setItems] = useState([]
    /*     [
          { name: 'First User' },
          { name: 'Second User' },
          { name: 'Third User' }
        ] */
  );

  const [count, setCount] = useState();
  console.log("count start", count)

  let jsonFileList;
  let jsonFileList2;
  let categoriesCurr;

  //리스트 아이템 클릭 selected 작업
  const onClick = index => () => {

    console.log("index = ", index)
    console.log("post.data.length = ", posts.data.length)
    console.log("post.data[index].MACHINEID : ", posts.data[index].MACHINEID);
    console.log("post.data[index] : ", posts.data[index]);

    //flag로 selected 선택
    console.log("flag 변경 전 = ", flag);
    console.log("flag 변경 전 index = ", index);
    console.log("index flag 변경 전 = ", posts.data[index].selected);

    if (posts.data[index].selected == null && flag == 0) {

      posts.data[index].selected = true;
      flag = 1;
      console.log("index flag if진입 = ", posts.data[index].selected);

    } else if (posts.data[index].selected == true && flag == 1) {
      posts.data[index].selected = false;
      flag = 0;
      console.log("index flag elseif1 진입 = ", posts.data[index].selected);
    } else if (posts.data[index].selected == false && flag == 0) {
      flag = 1;
      posts.data[index].selected = true;
      console.log("index flag if진입 = ", posts.data[index].selected);
    } /* else if (posts.data[index].selected == null && flag == 1) {
      flag = 1;
      posts.data[index].selected = true;
      console.log("index flag if진입 = ", posts.data[index].selected);
    } */

    console.log("index flag 변경 후 = ", posts.data[index].selected);
    console.log("flag 변경 후 = ", flag);
    console.log("flag 변경 후 index = ", index);

    /* if (posts.data[index].selected == true) {

      jsonFileList = posts.data[index].CURRENCYKIND;

      var dateParts = jsonFileList.split('[');

      var LocData = new Array();

      dateParts.map((list, index) => {
        if (dateParts[index] != "") {
          LocData.push({
            LOC: dateParts[index].substring(0, 3),
            id: index
          })
        }
      })

      console.log("jsonFileListjsonFileList5 = ", jsonFileList);
      console.log("datePartsdateParts = ", dateParts);
      console.log("aaa aaa aaa aaa = ", LocData);

      setCategories(LocData);
      console.log("categories2categories", categories);
    } */

    //EE7 선택이 없을 시 기존에 저장된 값 초기화가 필요함

    /*    const item = items[index]; */
    let item = posts.data[index];

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

  const [CNT, setCNT] = useState('');
  const [AMT, setAMT] = useState('');
  const [datedate, setdatedate] = useState("");

  const handleCNT = (event) => {
    setCNT(event.target.value);
  };

  const handleAMT = (event) => {
    setAMT(event.target.value);
  };

  const handleDATE = (event) => {
    console.log("event = ", event)
    console.log("event.target.value = ", event.target.value)
    setdatedate(event.target.value);
  };

  const [seconds, setSeconds] = useState(Date.now());

  //var datedate = "";

  //실시간 시간 업로드
  const LiveTimeContainer = () => {

    // useInterval
    useInterval(() => {
      setSeconds(Date.now());
    }, 1000);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const secondss = today.getSeconds();

    /*     console.log("Date(seconds)", Date(seconds));
        console.log("seconds", seconds);
        console.log("Date.now()", Date.now());
        console.log("new Date()", Date());
    
        var timeInMs = Date.now();
    
        console.log("timeInMs", timeInMs); */
    //2017-05-24T10:30
    console.log(today); // Thu May 16 2019 17:39:30 GMT+0900 (한국 표준시)

    //setdatedate(year +"-0"+ month+"-"+date+"T"+hours+":"+minutes);
    //datedate = year +"-0"+ month+"-"+date+"T"+hours+":"+minutes;
    datedate = year + "-" + lpad(month, 2, 0) + "-" + lpad(date, 2, 0) + "T" + lpad(hours, 2, 0) + ":" + lpad(minutes, 2, 0) + ":" + lpad(secondss, 2, 0);
    console.log(year + "-0" + month + "-" + date + "T" + hours + ":" + minutes);
    console.log("datedate", datedate);

    const startTime = new Date('2021-02-23T11:54'),
      nowTimeFormat = new Date(seconds);

    return (

      //Date(seconds)

      <Fragment>
        <FormControl className={classes.control}>
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            value={datedate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
      </Fragment>

      /*         <>
            {startTime - nowTimeFormat > 0 ? 
             (<><Moment fromNow>{startTime}</Moment>&nbsp;접수 시작</>) : (<div>{'접수 중'}</div>)
            }  
            </> */
    )
  }

  /*   const MomentDateChage = () => {
      const nowTime = Date.now();
      // Sun Aug 23 2020 15:43:49 GMT+0900
      return <Moment interval = { 10000 }>{nowTime}</Moment>;
    } */

  //const [value, setValue] = React.useState(new Date());

  //Left
  console.log("count end", count)
  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'grey', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'purple' }}>
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: '#EDE7F6', width: '15%', height: '81.5%' }}>
        <Paper className='paper'>
          {/* <Right/> */}
          <List>
            {posts && posts.data.map((post, index) => (
              <ListItem
                key={index}
                button
                selected={post.selected}
                onClick={onClick(index)}
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
          {/*           <List>
          <ListItemText>afsafasfa</ListItemText>
            {count &&count.data.map((ccc, index) => (
              <ListItem
                key={index}
                button
                onClick={onClick(index)}
              >

                <ListItemText primary={ccc.CLIENTID} />
              </ListItem>
            ))}
          </List> */}
        </Paper>
        {/*         <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={seconds}
            onChange={(newValue) => {
              setSeconds(newValue);
            }}
          />
        </LocalizationProvider> */}
        {/* <LiveTimeContainer /> */}
      </div>
      <div>
        <Fragment>
          <FormControl className={classes.control}>
            <InputLabel htmlFor="categories">Currency</InputLabel>
            <Select
              //value={category.id}
              value={category.id}
              onChange={onChange}
              inputProps={{
                name: 'categories',
                id: 'categories'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.LOC}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
        <Fragment>
          <FormControl className={classes.control}>
            <InputLabel htmlFor="categories2">Mode</InputLabel>
            <Select
              value={category2.id}
              onChange={onChange}
              inputProps={{
                name: 'categories2',
                id: 'categories2'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories2.map(category2 => (
                <MenuItem key={category2.id} value={category2.id}>
                  {category2.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
        <Fragment>
          <FormControl className={classes.control}>
            <InputLabel htmlFor="categories3">Batch Mode</InputLabel>
            <Select
              value={category3.id}
              onChange={onChange}
              inputProps={{
                name: 'categories3',
                id: 'categories3'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories3.map(category3 => (
                <MenuItem key={category3.id} value={category3.id}>
                  {category3.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
        <Fragment>
          <FormControl className={classes.control}>
            <InputLabel htmlFor="categories4">Speed</InputLabel>
            <Select
              value={category4.id}
              onChange={onChange}
              inputProps={{
                name: 'categories4',
                id: 'categories4'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories4.map(category4 => (
                <MenuItem key={category4.id} value={category4.id}>
                  {category4.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
        <div>
          <Fragment>
            <FormControl className={classes.control}>
              <TextField style={{ width: 140 }} inputProps={{ maxLength: 7, }} id="BATCH_CNT" label="Batch_Count" value={CNT} onChange={handleCNT} color="secondary" />
            </FormControl>
          </Fragment>
          <Fragment>
            <FormControl className={classes.control}>
              <TextField style={{ width: 140 }} inputProps={{ maxLength: 8, }} id="BATCH_AMT" label="Batch Amount" value={AMT} onChange={handleAMT} color="secondary" />
            </FormControl>
          </Fragment>
          <Fragment>
            <FormControl className={classes.control}>
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                //defaultValue={datedate}
                value={datedate}
                onChange={handleDATE}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
          </Fragment>
        </div>
      </div>
      <div className={classes.root}>
        <Paper style={{ overflow: 'auto' }} elevation={3}>
          <List subheader={<li />} subheader={<li><ListSubheader component="div" id="nested-list-subheader">ITEM / VALUE</ListSubheader></li>}>
            <li style={{ backgroundColor: 'inherit' }}>
              <ul style={{ backgroundColor: 'inherit', padding: 5 }}>
                {blackboxjson.map((post, index) => (
                  <ListItem
                    key={index}
                    selected={post.selected}
                  >
                    <Box color="primary" textAlign="center" style={{ paddingRight: 5}}>
                      {post.ITEM}
                    </Box>
                    <ListItemText secondary={post.VALUE} secondaryTypographyProps={{ align: "center", paddingRight: 50 }}/>
                    {/* <ListItemText primary={post.VALUE} /> */}
                  </ListItem>
                ))}
              </ul>
            </li>
          </List>
        </Paper>
      </div>
      <div className="buttonlist" style={{ backgroundColor: '#5C6BC0', position: 'static', height: '8%' }}>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => Infobtn()}>GET</Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => Savebtn()}>SAVE</Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => Blackboxbtn()}>BLACKBOX</Button>
      </div>
    </div>
  );
}

export default Settings
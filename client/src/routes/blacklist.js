import React, { useState, useEffect, useRef, Fragment } from 'react';
import Customer from '../components/Customer'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Right from '../layout/right';

import Button from '@material-ui/core/Button';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import Collapse from '@material-ui/core/Collapse';

import { List as VirtualList, AutoSizer } from 'react-virtualized';

import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

var flag = 0;
var SelectMAC;

const styles = theme => ({

})

function BlackList() {


  /* http://localhost:5000 */

  var frameworkComponents = { agDateInput: CustomDateComponent };

  console.log("flag 초기값 = ", flag);

  const [valueSN, setSN] = React.useState('');

  const handleChangeSN = (event) => {
    setSN(event.target.value);
  };

  const [gridApi, setGridApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
  };

  const onBtnExport = () => {
    var params = getParams();
    console.log(params)
    if (params.suppressQuotes || params.columnSeparator) {
      alert(
        'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
      );
    }
    gridApi.exportDataAsCsv(params);
  };

  function getParams() {
    return {
      suppressQuotes: getValue('#suppressQuotes'),
      columnSeparator: getValue('#columnSeparator'),
      customHeader: getValue('#customHeader'),
      customFooter: getValue('#customFooter'),
    };
  }

  const onGridSizeChanged = (params) => {
    var gridWidth = document.getElementById('root').offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  };

  //Left
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  const MaybeSelectedIcon2 = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  /*   console.log("data.data2 = ", data.data); */

  const [posts, setPosts] = useState();
  const [posts2, setPosts2] = useState();
  const [posts3, setPosts3] = useState();

  useEffect(() => {
    axios
      .get("/getuserinfo")
      .then(({ data }) => setPosts(data));
  }, []);

  useEffect(() => {
    axios
      .get("/getuserinfo")
      .then(({ data }) => setPosts2(data));
  }, []);

  useEffect(() => {
    axios
      .get("/getdenomination")
      .then(({ data }) => setPosts3(data));
  }, []);

  console.log("posts = ", posts);

  const [items, setItems] = useState([]
    /*     [
          { name: 'First User' },
          { name: 'Second User' },
          { name: 'Third User' }
        ] */
  );

  let [count, setCount] = useState();
  console.log("count start", count)

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

  /* const onClick = index => () => { */
  /* const searchBtn = () => { */
  const blkGetBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("searchposts = ", posts);
    console.log("posts.data = ", posts.data);
    console.log("posts.data[0].selected = ", posts.data[0].selected);
    /* console.log("posts.data[0].selected = ", posts.data[1].selected); */

    posts.data.map((list, index) => {
      if (list.selected == true) {
        console.log("index = ", index);
        console.log("MAC = ", list.MACADDR);
        /*         console.log("YYYY = ", list.CLIENTID.substring(0, 4));
                console.log("MM = ", list.CLIENTID.substring(4, 6));
                console.log("DD = ", list.CLIENTID.substring(6, 8)); */

        axios.post('post', {
          command: 'GETBLSI',
          MacAddr: lpad(posts.data[index].MACADDR, 12, " "),
          msn: lpad(posts.data[index].MACHINESN, 20, " "),
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          });
        const getBreeds = async () => {
          try {
            axios.get('/getblacklistinfo').then(({ data }) => setCount(data));
            return console.log("Async Count", count);
          } catch (error) {
            console.error(error);
          }
        };

        var newCount = new Array();
        var newArray = new Array();

        const countBreeds = async () => {
          const breeds = getBreeds();

          console.log("breedsbreeds = ", breeds);

          /*           posts.data.map((list, index1) => {
                      console.log("map inside && index1", index1);
                
                      if (list.selected == true) {
                        console.log("map inside && index1", index1);
                
                        newArray.data = (breeds.data).filter(x => {
                          return x.MACADDR == posts.data[index1].MACADDR
                        });
          
                        console.log("newArray", newArray);
                        console.log("newCount = ", newCount);
                        console.log("newCount.data.length = ", newCount.data.length);
                      }
                    }) */

          setCount(breeds);
          console.log("Breeds = ", count);
        };
        //getcountinfo 호출
        console.log("count.item1 : ", count);
        countBreeds();
        console.log("count.item2 : ", count);
      }
    })
    /* setTimeout(function(){
      alert("blkget Sleep 5sec"); 
   }, 5000); */
  }

  var newCount = new Array();
  var blkpostend;

  const blkAddBtn = () => {

    var newArray = new Array();

    var LOC = category2.LOC;
    var DENO = product2.Deno;
    var SN = valueSN;

    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let time = today.getHours();  // 시간

    console.log("searchposts = ", posts);
    console.log("posts.data = ", posts.data);
    //console.log("posts.data[0].selected = ", posts.data[index].selected);
    console.log("count.push Before = ", count);

    posts.data.map((list, index1) => {
      console.log("map inside && index1", index1);

      if (list.selected == true) {
        console.log("map inside && index1", index1);

        //선택한 MAC, CURRENCY 조건에 맞는 데이터 생성
        newArray.data = (count.data).filter(x => {
          return x.MACADDR == posts.data[index1].MACADDR
          //return x.MACADDR == posts.data[index1].MACADDR && x.BL_CURRENCYNAME == LOC
        });

        newCount.data = [...newArray.data, {
          BL_DATE: year,
          BL_TIME: time,
          MACHINESN: posts.data[index1].MACHINESN,
          MACADDR: posts.data[index1].MACADDR,
          BL_CURRENCYNAME: LOC,
          BL_DENOM: DENO,
          BL_SNNUMBER: SN
        }]
        //focus 1
        console.log("count1 = ", count)
        console.log("newArray1 = ", newArray);
        console.log("newCount1 = ", newCount);
        console.log("newCount.data.length1 = ", newCount.data.length);

        var blkpost;
        var tmp = "";

        newCount.data.map((list, index3) => {

          blkpost = newCount.data[index3].BL_CURRENCYNAME + lpad(newCount.data[index3].BL_DENOM, 7, " ") + lpad(newCount.data[index3].BL_SNNUMBER, 20, " ")
          tmp = tmp + blkpost;
          blkpostend = tmp;
        })
        console.log("blkpostend = ", blkpostend);

/*         axios.post('post', {
          command: 'SETBLSN',
          MacAddr: posts.data[index1].MACADDR,
          msn: lpad(posts.data[index1].MACHINESN, 20, " "),
          BlackList: lpad(newCount.data.length, 2, 0) + blkpostend,
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          }); */

        console.log("BlackList Add After setCount(newCount)", count);
      }
    })
    console.log("newCount.push After = ", newCount);
    console.log("Currency = " + LOC + " Denomination = " + DENO + " S/N = " + SN + "Blacklist = " + count);
    /* console.log("posts.data[0].selected = ", posts.data[1].selected); */

    /* posts.data.map((list, index) => {
      if (list.selected == true) {
        console.log("index = ", index);
        console.log("MAC = ", list.MACADDR);

        const getBreeds = async () => {
          try {
              return axios.get('/getblacklistinfo').then(({ data }) => setCount(data));
          } catch (error) {
            console.error(error);
          }
        };
 
        const countBreeds = async () => {
          const breeds = getBreeds();
          console.log("breeds = ", breeds);
          setCount(breeds);
          console.log("setCount(breads) After = ", count);
          breeds.map((list, index) => {
            console.log("breeds.data = ",breeds)
          })
        };
 
        //getcountinfo 호출
        console.log("count.item1 : ", count);
        countBreeds();
        console.log("count.item2 : ", count);
      }
    }) */
    /* setTimeout(function(){
      alert("Sup!"); 
   }, 5000); */
    /* blkGetBtn() */
    setCount(newCount);
    console.log("newCount = ", newCount);
    console.log("setCount(newCount) = ", count)
    redrawAllRows();
    /* scrambleAndRefreshAll(); */
  }

  const blkSaveBtn = () =>{

    posts.data.map((list, index1) => {
      console.log("map inside && index1", index1);

      if (list.selected == true) {
    axios.post('post', {
      command: 'SETBLSN',
      MacAddr: posts.data[index1].MACADDR,
      msn: lpad(posts.data[index1].MACHINESN, 20, " "),
      BlackList: lpad(newCount.data.length, 2, 0) + blkpostend,
    })
      .then(function (response) {
        console.log("response = ", response);
      })
      .catch(function (error) {
        console.log("error = ", error);
      });
    }})
  }

  /* const onClickCurrency = index => () => {

    if (posts2.data[index].selected == null) {
      posts2.data[index].selected = true;
      console.log("index flag = ", posts2.data[index].selected);
      //flag = true;
    } else if (posts2.data[index].selected == true) {
      posts2.data[index].selected = false;
      console.log("index flag = ", posts2.data[index].selected);
      //flag = false;
    } else if (posts2.data[index].selected == false) {
      //flag = true;
      posts2.data[index].selected = true;
      console.log("index flag = ", posts2.data[index].selected);
    }


    console.log("index = ", index)
    console.log("post.data[index].MACHINEID : ", posts2.data[index].LOCATION);
    console.log("posts2.data[index] = ", posts2.data[index]);
    console.log("posts2.data[index].selected = ", posts2.data[index].selected);
  } */


  /* let jsonFileList = new Array(); */
  let jsonFileList;
  let jsonFileList2;
  let categoriesCurr;

  const [categories2, setCategories2] = useState([""]);

  const [products2, setProducts2] = useState([""]);

  const setters2 = {
    categories2: setCategories2,
    products2: setProducts2
  };
  const collections2 = { categories2, products2 };

  var DenoData = new Array();

  const onChange2 = e => {
    const setCollection2 = setters2[e.target.name];

    console.log('e.target.name = ', e.target.name);
    console.log('e.target.name = ', collections2[e.target.name]);

    const collection2 = collections2[e.target.name].map(item => ({
      ...item,
      selected: false
    }));

    console.log('collections2 = ', collections2);
    console.log('collection2 = ', collection2);

    const index = collection2.findIndex(
      item => item.id === e.target.value,
    );

    console.log("e.target.namee.target.name", e.target.name)
    console.log("e.target.valuee.target.value", e.target.value)

    console.log("indexindex = ", index)

    collection2[index] = { ...collection2[index], selected: true };
    setCollection2(collection2);

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
    console.log("products2products2products2", products2);

  };

  const category2 = categories2.find(category2 => category2.selected) || {
    id: ''
  };
  const product2 = products2.find(product2 => product2.selected) || {
    id: ''
  };

  //Left Click Start(json에 selected 추가해서 true false로 체크박스 확인 한개만 선택가능)
  //기기 선택시 Currency Denomination 설정
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
      console.log("index flag = ", posts.data[index].selected);
      flag = 1;

      //선택된 MAC 다른곳에서 쓸까?
      SelectMAC = posts.data[index].MACADDR
      console.log("SelectMAC ", SelectMAC);

    } else if (posts.data[index].selected == true && flag == 1) {
      posts.data[index].selected = false;
      console.log("index flag = ", posts.data[index].selected);
      flag = 0;
    } else if (posts.data[index].selected == false && flag == 0) {
      flag = 1;
      posts.data[index].selected = true;

      //선택된 MAC 다른곳에서 쓸까?
      SelectMAC = posts.data[index].MACADDR
      console.log("SelectMAC ", SelectMAC);

      console.log("index flag = ", posts.data[index].selected);
      console.log("SelectMAC ", SelectMAC);
    }

    console.log("index flag 변경 후 = ", posts.data[index].selected);
    console.log("flag 변경 후 = ", flag);
    console.log("flag 변경 후 index = ", index);

    /* if (posts.data[index].selected == null) {
      posts.data[index].selected = true;
      console.log("index flag = ", posts.data[index].selected);
    } else if (posts.data[index].selected == true) {
      posts.data[index].selected = false;
      console.log("index flag = ", posts.data[index].selected);
    } else if (posts.data[index].selected == false) {
      posts.data[index].selected = true;
      console.log("index flag = ", posts.data[index].selected);
    } */

    /* posts.data.map((list, index) => {
      setCategories2(posts.data[index].CURRENCYKIND);
    }) */

    /*     jsonFileList.push(
          posts.data[index].CURRENCYKIND
        ) */

    //EE7 선택이 없을 시 기존에 저장된 값 초기화가 필요함

    if (posts.data[index].selected == true) {

      jsonFileList = posts.data[index].CURRENCYKIND;

      var dateParts = jsonFileList.split('[');

      var LocData = new Array();

      /* jsonFileList.push({
        MAC: list.MACHINESN,
        img: files
      }) */

      dateParts.map((list, index) => {
        if (dateParts[index] != "") {
          LocData.push({
            LOC: dateParts[index].substring(0, 3),
            id: index
          })
        }
      })

      /*     var jsonData = new Array();
      
          jsonData = JSON.parse(aaa); */


      //console.log("jsonFileListjsonFileList1 = ", jsonFileList.split('[').join(',').split(',').join(']').split(']'));
      //console.log("jsonFileListjsonFileList2 = ", jsonFileList.split(/[[,]+/));
      //console.log("jsonFileListjsonFileList3 = ", jsonFileList.split(/[""[]+/));
      //console.log("jsonFileListjsonFileList4 = ", jsonFileList.split(']'));
      console.log("jsonFileListjsonFileList5 = ", jsonFileList);
      console.log("datePartsdateParts = ", dateParts);
      console.log("aaa aaa aaa aaa = ", LocData);
      /* console.log("jsonDatajsonData = ", jsonData); */

      setCategories2(LocData);
      console.log("categories2categories2", categories2);

      //EE7_DENOMINATION CURRENCY GBP DENOMINATION 5, 10, 20, 50


      //Denomination 설정

      /*       jsonFileList2 = posts3.data[index].DENOMINATION;
            console.log("jsonFileList2 = ",posts3.data[index].DENOMINATION);
            var dateParts2 = jsonFileList2.split(/[,]+/);
            console.log("dateParts2 = ",dateParts2);
      
            var DenoData = new Array();
      
            dateParts2.map((list, index) => {
              if (dateParts2[index] != "") {
                DenoData.push({
                  Curr: categoriesCurr,
                  Deno : dateParts2[index],
                  id: index+1
                })
              }
            })
            console.log("DenoData = ", DenoData)
      
            setProducts2(DenoData);
            console.log("products2products2", products2); */
    }


    /*    const item = items[index]; */
    let item = posts.data[index];

    /* let item; */

    /*     if (item ==null){
          item = posts.data[index];
          console.log("=====true=====", item);
        }
        else{
          item = items[index];
          console.log("=====false=====", item);
        } */
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

  console.log("count end", count)

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '10%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(3),
    },
    control: { margin: theme.spacing(2), minWidth: 200 }
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [categories, setCategories] = useState([
    { label: 'Category 1', id: 1 },
    { label: 'Category 2', id: 2 },
    { label: 'Category 3', id: 3 }
  ]);

  const [products, setProducts] = useState([
    { label: 'Product 1', id: 1, category: 1 },
    { label: 'Product 2', id: 2, category: 1 },
    { label: 'Product 3', id: 3, category: 1 },
    { label: 'Product 4', id: 4, category: 2 },
    { label: 'Product 5', id: 5, category: 2 },
    { label: 'Product 6', id: 6, category: 2 },
    { label: 'Product 7', id: 7, category: 3 },
    { label: 'Product 8', id: 8, category: 3 },
    { label: 'Product 9', id: 9, category: 3 }
  ]);

  /* ============================================================================================= */

  const setters = {
    categories: setCategories,
    products: setProducts
  };
  const collections = { categories, products };

  const onChange = e => {
    const setCollection = setters[e.target.name];
    const collection = collections[e.target.name].map(item => ({
      ...item,
      selected: false
    }));
    const index = collection.findIndex(
      item => item.id === e.target.value
    );

    collection[index] = { ...collection[index], selected: true };
    setCollection(collection);

  };

  const category = categories.find(category => category.selected) || {
    id: ''
  };
  const product = products.find(product => product.selected) || {
    id: ''
  };

  var data = [];
  var topRowData = [];
  var bottomRowData = [];

  function scramble() {
    data.forEach(scrambleItem);
    topRowData.forEach(scrambleItem);
    bottomRowData.forEach(scrambleItem);
  }

  function scrambleItem(item) {
    ['BL_DATE', 'BL_TIME', 'MACHINESN', 'BL_CURRENCYNAME', 'BL_DENOM', 'fBL_SNNUMBER'].forEach(function (colId) {
      if (Math.random() > 0.5) {
        return;
      }
      item[colId] = Math.floor(Math.random() * 100);
    });
  }

  const scrambleAndRefreshAll = () => {

    console.log("scrambleAndRefreshAll IN");

    scramble();
    var params = {
      force: isForceRefreshSelected(),
      suppressFlash: isSuppressFlashSelected(),
    };
    gridApi.refreshCells(params);
  };

  function isForceRefreshSelected() {
    return document.querySelector('#forceRefresh').checked;
  }
  function isSuppressFlashSelected() {
    return document.querySelector('#suppressFlash').checked;
  }

  const redrawAllRows = () => {
    /* progressColor(); */
    gridApi.redrawRows();
  };

  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'green', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'silver' }}>
        <div className="Button1" style={{ padding: '0.1%', marginLeft: '1%', marginTop: '3%' }}>
          <Fragment>
            <FormControl className={classes.control}>
              <InputLabel htmlFor="categories2">Currency</InputLabel>
              <Select
                value={category2.id}
                onChange={onChange2}
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
                    {category2.LOC}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className={classes.control}
              disabled={category2.id === ''}
            >
              <InputLabel htmlFor="Products">Denomination</InputLabel>
              <Select
                value={product2.id}
                onChange={onChange2}
                inputProps={{
                  name: 'products2',
                  id: 'values',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {products2
                  .filter(product2 => product2.Curr === category2.LOC)
                  .map(product2 => (
                    <MenuItem key={product2.id} value={product2.id}>
                      {product2.Deno}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField inputProps={{ maxLength: 20 }} id="SN" label="Serial Number *" value={valueSN} maxLength={7} onChange={handleChangeSN} color="secondary" />
          </Fragment>
        </div>
        {/*         <Button variant="contained" color="primary" onClick={() => onBtnExport()}>
            CSV Export
        </Button> */}
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: 'gray', width: '20%', height: '75%' }}>
        <Paper className='paper'>
          {/* <left/> */}

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
        </Paper>

      </div>
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '80%', height: '75%', minHeight: '400px' }}>
        <AgGridReact
          rowData={count && count.data} rowSelection="multiple" pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged.bind(this)} frameworkComponents={frameworkComponents}>
          <AgGridColumn headerName="DATE" field="BL_DATE" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="TIME" field="BL_TIME" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="MACHINESN" field="MACHINESN" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Currency" field="BL_CURRENCYNAME" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Deno." field="BL_DENOM" sortable={true} filter={true} ></AgGridColumn>
          <AgGridColumn headerName="S/N" field="BL_SNNUMBER" sortable={true} filter={true} frameworkComponents={CustomDateComponent}></AgGridColumn>
        </AgGridReact>
      </div>

      <div className="list" style={{ backgroundColor: 'lightblue', position: 'static' }}>
        <Button variant="contained" color="primary" onClick={() => blkGetBtn()}>GET</Button>
          &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => blkAddBtn()}>ADD</Button>
        &nbsp;&nbsp;&nbsp;
        {/* <Button variant="contained" color="primary" onClick={() => blkSaveBtn()}>SAVE</Button> */}
        <Footer />
      </div>
    </div>
  );
}

var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
};

function getValue(inputSelector) {
  var text = document.querySelector(inputSelector).value;
  switch (text) {
    case 'string':
      return (
        'Here is a comma, and a some "quotes". You can see them using the\n' +
        'api.getDataAsCsv() button but they will not be visible when the downloaded\n' +
        'CSV file is opened in Excel because string content passed to\n' +
        'customHeader and customFooter is not escaped.'
      );
    case 'array':
      return [
        [],
        [
          {
            data: {
              value: 'Here is a comma, and a some "quotes".',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value:
                'They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value: 'this cell:',
              type: 'String',
            },
            mergeAcross: 1,
          },
          {
            data: {
              value: 'is empty because the first cell has mergeAcross=1',
              type: 'String',
            },
          },
        ],
        [],
      ];
    case 'none':
      return;
    case 'tab':
      return '\t';
    case 'true':
      return true;
    default:
      return text;
  }
}

export default BlackList
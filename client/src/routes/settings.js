import React, { useState, useEffect, useRef, Fragment } from 'react';
import Customer from '../components/Customer'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Right from '../layout/right';

import Button from '@material-ui/core/Button';

import { List as VirtualList, AutoSizer } from 'react-virtualized';

import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DevicesIcon from '@material-ui/icons/Devices';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

//달력
import CustomDateComponent from '../components/customDateComponent';

/* import {makeStyles} from '@material-ui/styles'; */
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import axios from "axios";
import { result } from 'lodash';
import { post } from 'request';



let flag = 0;

const styles = theme => ({

})

function Settings() {

  /* http://localhost:5000 */

  var frameworkComponents = { agDateInput: CustomDateComponent };

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

  const [categories, setCategories] = useState([""]);
  const [categories2, setCategories2] = useState([""]);
  const [categories3, setCategories3] = useState([""]);
  const [categories4, setCategories4] = useState([""]);

  const setters = {
    categories: setCategories,
    categories2: setCategories2,
    categories3: setCategories3,
    categories4: setCategories4,
  };

  const collections = { categories };

  var DenoData = new Array();

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
    console.log("e.target.valuee.target.value", e.target.value)

    console.log("indexindex = ", index)

    collection[index] = { ...collection[index], selected: true };
    setCollection(collection);
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
    id: ''
  };

  const Infobtn = () => {
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
    })
    /* setTimeout(function(){
      alert("blkget Sleep 5sec"); 
   }, 5000); */
  }

  console.log("flag 초기값 = ", flag);

  const [gridApi, setGridApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
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

  const searchBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("searchposts = ", posts);
    console.log("posts.data = ", posts.data);
    posts.data.map((list, index) => {
      console.log("map inside && index1", index);

      if (list.selected == true) {
        /*         axios.post('post', {
                  command: 'GETSETI',
                  MacAddr: lpad(posts.data[index].MACADDR, 12, " "),
                  msn: lpad(posts.data[index].MACHINESN, 20, " ")
                })
                  .then(function (response) {
                    console.log("response = ", response);
                  })
                  .catch(function (error) {
                    console.log("error = ", error);
                  }); */

        /*           axios.post('post', {
                    command: 'GETBLBI',
                    MacAddr: lpad(posts.data[index].MACADDR, 12, " "),
                    msn: lpad(posts.data[index].MACHINESN, 20, " ")
                  })
                    .then(function (response) {
                      console.log("response = ", response);
                    })
                    .catch(function (error) {
                      console.log("error = ", error);
                    }); */
      }
    })

  }


  //Left
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  /*   console.log("data.data2 = ", data.data); */

  const [posts, setPosts] = useState();
  const [posts2, setPosts2] = useState();

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
  //Left
  console.log("count end", count)
  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'green', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'purple' }}>
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: 'yellow', width: '20%', height: '75%' }}>
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

      </div>
      <div>
        <Fragment>
          <FormControl className={classes.control}>
            <InputLabel htmlFor="categories">Currency</InputLabel>
            <Select
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
      </div>
      <div className="right" style={{ float: 'left', position: 'static', backgroundColor: 'red', width: '30%', height: '75%', minHeight: '400px' }}>
        <Paper className='paper'>
          <List>
            {posts2 && posts2.data.map((post, index) => (
              <ListItem
                key={index}
                button
                selected={post.selected}
                onClick={onClick(index)}
              >
                <ListItemText primary={post.CURRENCYNAME} />
                <ListItemText primary={post.CNT_MODE} />
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

      <div className="list" style={{ backgroundColor: 'lightblue', position: 'static' }}>
          &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => Infobtn()}>GET</Button>
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

export default Settings
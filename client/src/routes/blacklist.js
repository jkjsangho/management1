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

const styles = theme => ({



})

function BlackList() {

  /* http://localhost:5000 */

  var frameworkComponents = { agDateInput: CustomDateComponent };


  console.log("flag 초기값 = ", flag);

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

  //REST API에서 받아옴
  /*   const [data, setData] = useState({ hits: [] });
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          '/GetUserInfo'
        );
        setData(result.data);
        console.log("result.data = ", result.data);
        console.log("result.data.data = ", result.data.data);
      };
      fetchData();
    }, []);
  
    console.log('1================1');
    console.log("Right = ", Right);
    console.log("data =", data);
    console.log("data.data = ", data.data);
    console.log('1================1'); */



  /*   const [data, setData] = useState({ hits: [] });
   
    useEffect(async () => {
      const result = await axios(
        '/GetUserInfo',
      );
   
      setData(result.data);
    }, []); */

  /*   const [rowData, setRowData] = useState([]);
    useEffect(() => {
      axios.get("api/customers")
        .then(({data}) => setRowData({data}));
    }, []); */

  /*   const [rowData, setRowData] = useState([]);
  
    useEffect(() => {
      fetch('/GetUserInfo')
        .then(res => res.json())
        .then(rowData => setRowData(rowData.UserInfo))
    }, []);
  
    const [rowCount, setCount] = useState([]);
    useEffect(() => {
      fetch('/GetCountInfo')
        .then(res1 => res1.json())
        .then(rowCount => setCount(rowCount.CountInfo))
    }, []); */

  /*   console.log('================');
    console.log(result.UserInfo);
    console.log('================');
    console.log(rowCount);
    console.log('================'); */

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
      .get("/getuserinfo")
      .then(({ data }) => setPosts2(data));
  }, []);

  console.log("posts = ", posts);

  const [items, setItems] = useState([]
    /*     [
          { name: 'First User' },
          { name: 'Second User' },
          { name: 'Third User' }
        ] */
  );

  const [count, setCount] = useState();
  console.log("count start", count)

  /* const onClick = index => () => { */
  /* const searchBtn = () => { */
  const searchBtn = () => {
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
          command: 'GETCNTI',
          MacAddr: posts.data[index].MACADDR,
          msn: posts.data[index].MACHINESN,
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          });
        const getBreeds = async () => {
          try {
            return axios.get('/getblacklistinfo').then(({ data }) => setCount(data));
          } catch (error) {
            console.error(error);
          }
        };

        const countBreeds = async () => {
          const breeds = getBreeds();
          setCount(breeds);
          console.log("Breeds = ", count);
        };

        //getcountinfo 호출
        console.log("count.item1 : ", count);
        countBreeds();
        console.log("count.item2 : ", count);
      }
    })

    /*     const getBreeds = async () => {
          try {
            return axios.get('/getcountinfo').then(({ data }) => setCount(data));;
          } catch (error) {
            console.error(error);
          }
        };
    
        const countBreeds = async () => {
          const breeds = getBreeds();
          setCount(breeds);
          console.log("Breeds = ", count);
        };
    
        //getcountinfo 호출
        console.log("count.item1 : ", count);
        countBreeds();
        console.log("count.item2 : ", count); */

    /*     axios.post('post', {
          command: 'CMDCNTI',
          clientid: posts.data[0].CLIENTID,
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          }); */
  }


  //Left Click Start(json에 selected 추가해서 true false로 체크박스 확인)
  const onClickCurrency = index => () => {
  
    console.log("index = ", index)
    console.log("post.data[index].MACHINEID : ", posts2.data[index].LOCATION);
    console.log("posts2.data[index] = ", posts2.data[index]);
    console.log("posts2.data[index].selected = ", posts2.data[index].selected);

  }

  const onClick = index => () => {
    console.log("index = ", index)
    console.log("post.data.length = ", posts.data.length)
    console.log("post.data[index].MACHINEID : ", posts.data[index].MACHINEID);

    /*     const getBreeds = async () => {
          try {
            return axios.get('/getcountinfo').then(({ data }) => setCount(data));;
          } catch (error) {
            console.error(error);
          }
        };
    
        const countBreeds = async () => {
          const breeds = getBreeds();
          setCount(breeds);
          console.log("Breeds = ", count);
        };
    
        //getcountinfo 호출
        console.log("count.item1 : ", count);
        countBreeds();
        console.log("count.item2 : ", count); */

    //flag로 selected 선택
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

    /*    const item = items[index]; */
    const item = posts.data[index];

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
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'green', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'purple' }}>
        <div className="Button1" style={{ padding: '0.5%', marginLeft: '88%', marginTop: '4%' }}>
          {/*         <Button variant="contained" color="primary" onClick={() => onBtnExport()}>
            CSV Export
        </Button> */}
        </div>
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: 'gray', width: '20%', height: '75%' }}>
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
                <ListItemText primary={post.CLIENTID} />
                <ListItemIcon>
                  <MaybeSelectedIcon
                    selected={post.selected}
                    Icon={DevicesIcon}
                  />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Currency" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {posts2 && posts2.data.map((post2, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={post2.selected}
                    onClick={onClickCurrency(index)}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={post2.LOCATION} />
                    <ListItemIcon>
                      <MaybeSelectedIcon
                        selected={post2.selected}
                        Icon={DevicesIcon}
                      />
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <ListItem button onClick={handleClick2}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Denomination" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Paper>

      </div>
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '80%', height: '75%', minHeight: '400px' }}>
        <AgGridReact
          rowData={count && count.data} pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged.bind(this)} floatingFilter={true} frameworkComponents={frameworkComponents}>
          <AgGridColumn headerName="DATE" field="BL_DATE" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="TIME" field="BL_TIME" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Currency" field="BL_CURRENCYNAME" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Deno." field="BL_DENOM" sortable={true} filter={true} ></AgGridColumn>
          <AgGridColumn headerName="S/N" field="BL_SNNUMBER" sortable={true} filter={true} frameworkComponents={CustomDateComponent}></AgGridColumn>
        </AgGridReact>
        {/*         <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
            onGridReady={this.onGridReady}
          /> */}
      </div>

      <div className="list" style={{ backgroundColor: 'lightblue', position: 'static' }}>
        <Button variant="contained" color="primary" onClick={() => searchBtn()}>Search</Button>
        <Footer />
      </div>
      <div className="abc" style={{ display: 'none', backgroundColor: 'blue', height: '100%', width: '90%' }}>
        <div>
          <div className="row">0
            <label>suppressQuotes = </label>
            <select id="suppressQuotes">
              <option value="none">(default)</option>
              <option value="true">true</option>
            </select>
          </div>
          <div className="row">
            <label>columnSeparator = </label>
            <select id="columnSeparator">
              <option value="none">(default)</option>
              <option value="tab">tab</option>
              <option value="|">bar (|)</option>
            </select>
          </div>
        </div>
        <div style={{ marginLeft: '10px' }}>
          <div className="row">
            <label>customHeader = </label>
            <select id="customHeader">
              <option>none</option>
              <option value="array">
                ExcelCell[][] (recommended format)
                  </option>
              <option value="string">string (legacy format)</option>
            </select>
          </div>
          <div className="row">
            <label>customFooter = </label>
            <select id="customFooter">
              <option>none</option>
              <option value="array">
                ExcelCell[][] (recommended format)
              </option>
              <option value="string">string (legacy format)</option>
            </select>
          </div>
        </div>
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
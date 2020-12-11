import React, { useState, useEffect, useRef } from 'react';
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

function Menu2() {

  var frameworkComponents = { agDateInput: CustomDateComponent };


  console.log("flag_start", flag);

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
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        '/GetUserInfo',
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
  console.log('1================1');



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

  const searchBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("posts = ", posts);
    console.log("posts.data = ", posts.data);

    axios.post('post', {
      Post: 'Need Device Info',
      Data: posts.data[0].MACHINEID
    })
      .then(function (response) {
        console.log("response = ", response);
      })
      .catch(function (error) {
        console.log("error = ", error);
      });
  }


  //Left
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  console.log("data.data2 = ", data.data);


  const [posts, setPosts] = useState();
  useEffect(() => {
    axios
      .get("/GetUserInfo")
      .then(({ data }) => setPosts(data));
  }, []);

  console.log("posts = ", posts);

  const [items, setItems] = useState([]
    /*     [
          { name: 'First User' },
          { name: 'Second User' },
          { name: 'Third User' }
        ] */
  );

  //리스트 아이템 클릭 selected 작업
  const onClick = index => () => {
    console.log("index = ", index)
    console.log("post.data.length = ", posts.data.length)
    console.log("post.data[index].MACHINEID : ", posts.data[index].MACHINEID);

    //flag로 selected 선택
    console.log("flag = ", flag);
    if(flag == null){
      posts.data[index].selected = true;
      flag = true;
    }else if(flag == true){
      posts.data[index].selected = false;
      flag = false;
    }else if(flag == false){
      flag = true;
      posts.data[index].selected = true;
    }

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

    //왼쪽 리스트 목록을 지속적으로 RESTAPI에서 받아와서 selected 초기값 null로 인식

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
    axios.post('post', {
      Event: 'Device_Info',
      Data: posts.data[index].MACHINEID
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
  //Left

  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'green', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'purple' }}>
        <div className="Button1" style={{ padding: '0.5%', marginLeft: '88%', marginTop: '4%' }}>
          <Button variant="contained" color="primary" onClick={() => onBtnExport()}>
            CSV Export
        </Button>
        </div>

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
          rowData={items} pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged.bind(this)} floatingFilter={true} frameworkComponents={frameworkComponents}>
          <AgGridColumn field="CLIENTID" sortable={true} filter={true} width={100}></AgGridColumn>
          <AgGridColumn field="CURRENCYKIND" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="MACHINEID" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="MACHINESN" sortable={true} filter={true} ></AgGridColumn>
          <AgGridColumn field="DATETIME" sortable={true} filter={true} frameworkComponents={CustomDateComponent}></AgGridColumn>
          <AgGridColumn field="IPADDR" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="LOCATION" sortable={true} filter={true}></AgGridColumn>
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

export default Menu2
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

import Divider from '@material-ui/core/Divider';

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

function Userinfo() {

  /* http://localhost:5000 */

  var frameworkComponents = { agDateInput: CustomDateComponent };


  console.log("flag 초기값 = ", flag);

  const [gridApi, setGridApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
  };

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
  /* const onClick = index => () => { */
  /* const searchBtn = () => { */

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
    console.log("posts = ", posts);
    console.log("posts.data = ", posts.data);

    axios.post('post', {
      command: 'CMDCNTI',
      clientid: posts.data[0].CLIENTID,
      date: '2020110120201205'
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

  /*   console.log("data.data2 = ", data.data); */

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

    console.log("flag 변경 전 = ", flag);
    console.log("flag 변경 전 index = ", index);
    console.log("index flag 변경 전 = ",posts.data[index].selected);
    
    if(posts.data[index].selected == null){
      posts.data[index].selected = true;
      console.log("index flag = ",posts.data[index].selected);
      /* flag = true; */
    }else if(posts.data[index].selected == true){
      posts.data[index].selected = false;
      console.log("index flag = ",posts.data[index].selected);
      /* flag = false; */
    }else if(posts.data[index].selected == false){
      /* flag = true; */
      posts.data[index].selected = true;
      console.log("index flag = ",posts.data[index].selected);
    }

    console.log("index flag 변경 후 = ",posts.data[index].selected);
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
  //Left

  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'green', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'purple' }}>
{/*         <div className="Button1" style={{ padding: '0.5%', marginLeft: '88%', marginTop: '4%' }}>

        </div> */}
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: 'pink', width: '20%', height: '75%' }}>
        <Paper className='paper'>
          {/* <left/> */}
          <List>
            <Divider />
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
            <Divider />
          </List>
        </Paper>

      </div>
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '80%', height: '75%', minHeight: '400px' }}>
        <AgGridReact
          rowData={items} rowSelection="multiple" pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}
          /* onGridSizeChanged={onGridSizeChanged.bind(this)} */ /* floatingFilter={true} */ frameworkComponents={frameworkComponents}>
          <AgGridColumn field="CURRENCYKIND" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="MACHINEID" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="MACHINESN" sortable={true} filter={true} ></AgGridColumn>
          <AgGridColumn field="DATETIME" sortable={true} filter={true} frameworkComponents={CustomDateComponent}></AgGridColumn>
          <AgGridColumn field="IPADDR" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="LOCATION" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="CLIENTID" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="USERSTATUS" sortable={true} filter={true}></AgGridColumn>
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
        &nbsp;&nbsp;&nbsp;&nbsp;
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

export default Userinfo
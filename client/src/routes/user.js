import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Customer from '../components/Customer'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Right from '../layout/right';

import Button from '@material-ui/core/Button';

import { List as VirtualList, AutoSizer } from 'react-virtualized';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';

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

  /* http://localhost:5000 */

  var frameworkComponents = { agDateInput: CustomDateComponent };

  console.log("flag 초기값 = ", flag);

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [valueSN, setSN] = React.useState('');

  const handleChangeSN = (event) => {
    setSN(event.target.value);
  };

  const [gridApi, setGridApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
  };
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
  const addBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("posts = ", posts);
    console.log("posts.data = ", posts.data);

    axios.post('post', {
      command: 'ADDUSER',
      /* mid: posts.data[0].CLIENTID, */
      mid: value,
      sn: valueSN
    })
      .then(function (response) {
        console.log("response = ", response);
        console.log("전송완료");
      })
      .catch(function (error) {
        console.log("error = ", error);
        console.log("에러");
      });
  }
  const deleteBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("posts = ", posts);
    console.log("posts.data = ", posts.data);

    axios.post('post', {
      command: 'DELUSER',
      mid: value,
      sn: valueSN
    })
      .then(function (response) {
        console.log("response = ", response);
        console.log("전송완료");
      })
      .catch(function (error) {
        console.log("error = ", error);
        console.log("에러");
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
      <div className='title' style={{ height: '10%', backgroundColor: 'gold' }}>
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: '#ffcdd2', width: '20%', height: '75%' }}>
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
                <ListItemText secondary={post.MACHINESN} />
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
       {/*  <Grid container spacing={2} className="container" style={{ marginLeft: '10px' }}> */}
          {/* <inputGrid itemName="MID">
            <TextField ID="MID" label="Machine ID" />
          </inputGrid>
          <Grid itemName="SN">
            <TextField ID="SN" label="Serial Number" />
          </Grid> */}
          <div>
          <TextField inputProps = {{maxLength :  3,}} id="MID" label="Machine ID *" value={value} onChange={handleChange} color="secondary" />
          </div>
          <br></br>
          <TextField inputProps = {{maxLength :  7,}}id="SN" label="Serial Number *" value={valueSN} maxLength={7} onChange={handleChangeSN} color="secondary"/>
          <div>
          <br></br>
          <TextField id="filled" label="MachineID_Copy"  value={value} onChange={handleChange} variant="filled" color="secondary"/>
          </div>
          <div>
          <br></br>
          <TextField id="outlined" label="Password"  type = "password" value={valueSN} onChange={handleChangeSN} variant="outlined" color="secondary"/>
          </div>
        {/* </Grid> */}

      </div>
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '80%', height: '75%', minHeight: '400px' }}>
        <AgGridReact
          rowData={items} rowSelection="multiple" pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}
          /* onGridSizeChanged={onGridSizeChanged.bind(this)} */ floatingFilter={true} frameworkComponents={frameworkComponents}>
          <AgGridColumn field="CLIENTID" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="ALIAS" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="CURRENCYKIND" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="MACHINEID" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="MACHINESN" sortable={true} filter={true} ></AgGridColumn>
          <AgGridColumn field="DATETIME" sortable={true} filter={true} frameworkComponents={CustomDateComponent}></AgGridColumn>
          <AgGridColumn field="IPADDR" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="LOCATION" sortable={true} filter={true}></AgGridColumn>
        </AgGridReact>
      </div>

      <div className="list" style={{ backgroundColor: 'lightblue', position: 'static' }}>
        <Button variant="contained" color="primary" onClick={() => addBtn()}>Add</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => deleteBtn()}>Del</Button>
        <Footer />
      </div>
    </div>
  );
}

export default Menu2
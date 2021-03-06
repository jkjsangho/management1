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

let flag=0;

const styles = theme => ({



})

function Serialnum() {

  /* http://localhost:5000 */

  var frameworkComponents = { agDateInput: CustomDateComponent };


  console.log("flag 초기값 = ", flag);

  //AG-Grid Excel_Export
  const [gridApi, setGridApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
  };

  //AG-Grid Excel_Export

  //AG-Grid Row_AutoSize
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
  //AG-Grid Row_AutoSize

  //Left
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  /*   console.log("data.data2 = ", data.data); */

  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get("/getuserinfo")
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

  const [count, setCount] = useState();

  useEffect(() => {
    axios
      .get("/getserialinfo")
      .then(({ data }) => setCount(data));
  }, []);

  console.log("count start", count)

  const [count2, setCount2] = useState([]);

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
    console.log("lpad.length ===", str.length);
    return str;
}

  /* const onClick = index => () => { */
  /* const searchBtn = () => { */
  const GETSN = () => {

    let newArray = new Array();
    let newArray2 = new Array();

    posts.data.map((list, index) => {
      if (list.selected == true) {
        console.log("posts = ", list)
        console.log("count = ", count)
        console.log("count = ", count.data)
        if (count !== null) {
          newArray.data = (count.data).filter(x => {
            return x.MACADDR == list.MACADDR
          });
          newArray2 = [...newArray2, ...newArray.data];
          console.log("IF_newArray1 = ", newArray);
          console.log("IF_newArray2 = ", newArray2);
        }

        axios.post('post', {
          command: 'GETSNOI',
          MacAddr: posts.data[index].MACADDR,
          msn:lpad(posts.data[index].MACHINESN, 20, " "),
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          });
      }
    })
    console.log("FN_newArray1 = ", newArray);
    console.log("FN_newArray2 = ", newArray2);
    setCount2(newArray2);
    console.log("count2 = ", count2);
    //redrawAllRows();
/* 
    //Search 클릭 시 Post 전송
    console.log("searchposts = ", posts);
    console.log("posts.data = ", posts.data);
    console.log("posts.data[0].selected = ", posts.data[0].selected);

    posts.data.map((list, index) => {
      if (list.selected == true) {
        console.log("index = ", index);
        console.log("MAC = ", list.MACADDR);
        //console.log("YYYY = ", list.CLIENTID.substring(0, 4));
        //console.log("MM = ", list.CLIENTID.substring(4, 6));
        //console.log("DD = ", list.CLIENTID.substring(6, 8));

        axios.post('post', {
          command: 'GETSNOI',
          MacAddr: posts.data[index].MACADDR,
          msn:lpad(posts.data[index].MACHINESN, 20, " "),
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          });
        const getBreeds = async () => {
          try {
            return axios.get('/getserialinfo').then(({ data }) => setCount(data));
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
      } */
  }


  //Left Click Start(json에 selected 추가해서 true false로 체크박스 확인)
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
      flag=1;
      /* flag = true; */
    } else if (posts.data[index].selected == true) {
      posts.data[index].selected = false;
      console.log("index flag = ", posts.data[index].selected);
      flag=0;
      /* flag = false; */
    } else if (posts.data[index].selected == false) {
      /* flag = true; */
      flag=1;
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

    //Left List 아이템 클릭 시 Post 전송
    /*     axios.post('post',
          {
            command: 'GETCNTI',
            clientid: posts.data[index].CLIENTID
          })
          .then(function (response) {
            console.log(response)
            console.log('response')
          })
          .catch(function (error) {
            console.log(error)
            console.log('error')
          }); */
  };
  //Left Click End
  console.log("count end", count)
  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: '#5C6BC0', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '9%', backgroundColor: 'purple' }}>
          <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: '#EDE7F6', width: '15%', height: '85%' }}>
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
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '85%', height: '85%', minHeight: '400px' }}>
        <AgGridReact
          rowData={count2} rowSelection="multiple" pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}>
          <AgGridColumn headerName="Device S/N" field="MACHINESN" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="DATE" field="SN_DATE" sortable={true} filter="agDateColumnFilter" filterParams={filterParams}></AgGridColumn>
          <AgGridColumn headerName="TIME" field="SN_TIME" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Currency" field="CURRENCYNAME" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Denomination" field="DENOM" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="S/N" field="SERIALNO" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Rej." field="SN_ISREJECT" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn headerName="Image" field="IMG_DATA" sortable={true} filter={true}></AgGridColumn>
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

      <div className="list" style={{ backgroundColor: '#5C6BC0', position: 'static' }}>
        <Button variant="contained" color="primary" onClick={() => GETSN()}>Get SN</Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => GETSN()}>Get SN with IMAGE</Button>
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
/*     console.log("dateAsString = ", dateAsString);
        var dateParts = dateAsString.split('/');
    
        var cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        ); */
    var YYYY = dateAsString.substring(0, 4);
    var MM = dateAsString.substring(4, 6);
    var DD = dateAsString.substring(6, 8);
    var cellDate = new Date(
      Number(YYYY),
      Number(MM) - 1,
      Number(DD)
    ); 
    console.log("YYYY = ", Number(YYYY));
    console.log("MM = ", Number(MM));
    console.log("DD = ", Number(DD));
    console.log("cellDate = ", cellDate);

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

export default Serialnum
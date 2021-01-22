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

/* import { AllCommunityModules } from '@ag-grid-community/all-modules'; */

import axios from "axios";
import { result } from 'lodash';
import { post } from 'request';

let flag;

const styles = theme => ({



})

function Upgrade() {

  /* http://localhost:5000 */
  /* var frameworkComponents = { agDateInput: CustomDateComponent }; */

  console.log("flag 초기값 = ", flag);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
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
  console.log("count start", count)

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
        })
          .then(function (response) {
            console.log("response = ", response);
          })
          .catch(function (error) {
            console.log("error = ", error);
          });

        const getBreeds = async () => {
          try {
            return axios.get('/getcountinfo').then(({ data }) => setCount(data));
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
  }


  //Left Click Start(json에 selected 추가해서 true false로 체크박스 확인)
  const onClick = index => () => {
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

  let jsonFileList = new Array();
  console.log("jsonFileList fffffffffffffffffffffffffffff", jsonFileList.length);
  
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일


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

    const curFiles = event.target.files;
    var i = 0;

    jsonFileList = new Array();

    while (i < curFiles.length) {
      var files = curFiles[i];
      jsonFileList.push({
        img: files
      })
      i++;
    }

    console.log("jsonFileList = ", jsonFileList);
    console.log("event.target.files = ", event.target.files);
    console.log("jsonFileList[0] = ", jsonFileList[0]);
    console.log("jsonFileList[0].img = ", jsonFileList[0].img);
    console.log("event.target.files[0] = ", event.target.files[0]);
    console.log("jsonFileList[0].img.name = ", jsonFileList[0].img.name);
    console.log("jsonFileList.length", jsonFileList.length);

    /*     if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
      console.log("FileState = ", event.target.files[0]);
    } */
  }

  const handlePost = () => {
    const formData = new FormData();
    var i = 0;

    console.log("file post start");

    /* console.log("selectedFile1 = ", imgFile); */

    /* formData.append('file', imgFile); */

    while (i < jsonFileList.length) {
      formData.append('file', jsonFileList[i].img);

      console.log("file post end");

      console.log("handlePost Count = ", jsonFileList.length);
      console.log("handlePost File", jsonFileList);
      console.log("handlePost File[" + i + "] = ", jsonFileList[i]);
      console.log("handlePost File[" + i + "].img = ", jsonFileList[i].img.name);

      for (var key of formData.keys()) {
        console.log("key1 = ", key);
      }
      for (var value of formData.values()) {
        console.log("value1 = ", value);
      }
      i++;
      console.log("i = ", i);
    }
    axios.post('api/up', formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then(res => {
        alert('성공')
        for (var key of formData.keys()) {
          console.log("key2 = ", key);
        }
        for (var value of formData.values()) {
          console.log("value2 = ", value);
        }
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

function filelist(){
  console.log("================================================filelist 진입")
  return(
    jsonFileList.map((item)=>
            <List>
              {/* <ListItemText Primary={jsonFileList}/> */}
              <ListItemText primary={item.name}/>
            </List>
          )
  );
}

function filelist2(){
  console.log("==================================================filelist2 진입")
  return(
    <Button>내용이 없어</Button>
  );
}

  console.log("count end", count)
  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'green', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'purple' }}>
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: 'yellow', width: '15%', height: '75%' }}>
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
                <ListItemText primary={post.USERSTATUS} secondary={post.MACADDR} />
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
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '85%', height: '75%', minHeight: '400px' }}>
        <AgGridReact
          rowData={count && count.data} pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady} defaultColDef={{ editable: true, sortable: true, flex: 1, filter: true, resizable: true }} colResizeDefault={'shift'}
          Components={{ agDateInput: CustomDateComponent }}/* onGridSizeChanged={onGridSizeChanged.bind(this)} */ /* modules={AllCommunityModules} */
          /* onGridSizeChanged={onGridSizeChanged.bind(this)} */ /* floatingFilter={true} */>
          <AgGridColumn field="DATETIME" ></AgGridColumn>
          <AgGridColumn field="IPADDR" ></AgGridColumn>
          <AgGridColumn field="MACADDR" ></AgGridColumn>
          <AgGridColumn field="MACHINEID" ></AgGridColumn>
          <AgGridColumn field="ALIAS" ></AgGridColumn>
          <AgGridColumn field="COUNT_DATE" filter="agDateColumnFilter" filterParams={filterParams}></AgGridColumn>
          <AgGridColumn field="COUNT_TIME" filter="agNumberColumnFilter"></AgGridColumn>
          <AgGridColumn field="COUNT_MODE" ></AgGridColumn>
          <AgGridColumn field="CURRENCYNAME" ></AgGridColumn>
          <AgGridColumn field="STACKCNT" ></AgGridColumn>
          <AgGridColumn field="REJECTCNT" ></AgGridColumn>
          <AgGridColumn field="DOUBLECNT" ></AgGridColumn>
        </AgGridReact>
      </div>

      <div className="list" style={{ backgroundColor: 'lightblue', position: 'static' }}>
        <Button variant="contained" color="primary" onClick={() => searchBtn()}>Search</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => handlePost()}>Upload</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="file" name="imgFile" id="imgFile" multiple onChange={handleChangeFile} />
        <div className="App">
          <div style={{ "backgroundColor": "#efefef", "width": "150px", "height": "150px" }}>
          <ListItemText>AAA</ListItemText>
          <ol>
            {(jsonFileList.length)>0 ? <filelist/>:<filelist2/>}
          </ol>
          <ListItemText>BBB</ListItemText>
          </div>
        </div>
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

export default Upgrade
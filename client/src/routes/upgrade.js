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

  console.log("jsonFileList check length", jsonFileList.length);

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

    jsonFileList = new Array();

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
    /* console.log("jsonFileList[0].img = ", jsonFileList[0].img); */
    console.log("event.target.files[0] = ", event.target.files[0]);
    /* console.log("jsonFileList[0].img.name = ", jsonFileList[0].img.name); */
    console.log("jsonFileList.length", jsonFileList.length);

    /*     if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
      console.log("FileState = ", event.target.files[0]);
    } */
    FileList();
  }

  const handlePost = () => {
    const formData = new FormData();
    var i = 0;

    console.log("file post start");

    /* console.log("selectedFile1 = ", imgFile); */

    /* formData.append('file', imgFile); */

    console.log("file post start");

    while (i < jsonFileList.length) {
      formData.append('mac', jsonFileList[i].MAC);
      formData.append('file', jsonFileList[i].img);

      console.log("file post end");

      console.log("handlePost Count = ", jsonFileList.length);
      console.log("handlePost File", jsonFileList);
      console.log("handlePost File[" + i + "] = ", jsonFileList[i]);
      console.log("handlePost File[" + i + "].img.name = ", jsonFileList[i].img.name);

      for (var pair of formData.entries()) { console.log("formData = ", pair[0]+ ', ' + pair[1]); }

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
        for (var pair of formData.entries()) { console.log("formData = ", pair[0]+ ', ' + pair[1]); }
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

  function refreshPage() {
    window.location.reload(false);
  }

  const [cart, setCart] = useState([]);

  function addItemToCart(e) {
    const item = e.target.value;
    console.log(item);
    setCart(cart => [...cart, item]);
  }

  function FileList() {
    console.log("================================================filelist 진입")
    console.log("JsonListFile length FileList =", jsonFileList.length);


    /* <List>
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
  </List> */
    console.log("1111111111filelist jsonFileList = ", jsonFileList);
    return (
      <List>
        <Button value="" onClick={addItemToCart}>업로드 파일이 있음</Button>
        {jsonFileList.map((item, index) => (
          <ListItem
            key={index}
            value={item.img.name}
          >
            <ListItemText primary={item.img.name} />
          </ListItem>
        ))}
      </List>
    );
    window.location.replace("/");
    this.getPosts();
  }

  function FileList2(props) {
    console.log("==================================================filelist2 진입")
    console.log("2222222222JsonListFile length FileList2 =", jsonFileList.length);
    return (
      <Button>업로드 파일이 없음</Button>
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
          Components={{ agDateInput: CustomDateComponent }}>
{/*           <AgGridColumn field="DATETIME" ></AgGridColumn>
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
          <AgGridColumn field="DOUBLECNT" ></AgGridColumn> */}
        </AgGridReact>
      </div>

      <div className="list" style={{ backgroundColor: 'lightblue', position: 'static' }}>
        <Button variant="contained" color="primary" onClick={() => searchBtn()}>Search</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={() => handlePost()}>Upload</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="file" name="imgFile" id="imgFile" multiple onChange={handleChangeFile} />
        <div className="App">
          <div style={{ "backgroundColor": "#efefef", width: '15%', height: '75%' }}>
            <ListItemText>============</ListItemText>
            <div>
              &nbsp;&nbsp;
            {(jsonFileList.length) !== 0 ? <FileList /> : <FileList2 />}
            &nbsp;&nbsp;
            </div>
            <ListItemText>============</ListItemText>
          </div>
        </div>
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

export default Upgrade
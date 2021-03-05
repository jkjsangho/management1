import React, { useState, useEffect, useRef, Fragment } from 'react';
import {Link} from "react-router-dom";
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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import axios from "axios";

let flag=0;

const styles = theme => ({



})

function Recog() {

  /* http://localhost:5000 */

  console.log("flag 초기값 = ", flag);

  const tabName = ["On/Off", "Level"];

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

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '10%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(3),
    },
    control: { margin: theme.spacing(1), minWidth: 200 }
  }));

  const classes = useStyles();

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



  /* const onClick = index => () => { */
  /* const searchBtn = () => { */
  const searchBtn = () => {
    //Search 클릭 시 Post 전송
    console.log("searchposts = ", posts);
    console.log("posts.data = ", posts.data);

    posts.data.map((list, index) => {
      if (list.selected == true) {

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

        //setting 최신화 요청
        axios.post('post', {
          command: 'GETRCUI',
          MacAddr: lpad(posts.data[index].MACADDR, 12, " "),
          msn: lpad(posts.data[index].MACHINESN, 20, " "),
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

  //Left
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  /*   console.log("data.data2 = ", data.data); */

  const [posts, setPosts] = useState();
  const [recougusa, setrecougusa] = useState();

  useEffect(() => {
    axios
      .get("/getuserinfo")
      .then(({ data }) => setPosts(data));
  }, []);

  useEffect(() => {
    axios
      .get("/getrecogusageinfo")
      .then(({ data }) => setrecougusa(data));
  }, []);

  console.log("posts = ", posts);
  console.log("recougusa = ", recougusa);

  const [items, setItems] = useState([]
    /*     [
          { name: 'First User' },
          { name: 'Second User' },
          { name: 'Third User' }
        ] */
  );

  const [count, setCount] = useState();
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
    console.log("lpad.length ===", str.length);
    return str;
}

  //리스트 아이템 클릭 selected 작업
  const onClick = index => () => {

    setCategories2([""]);

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

  //Left
  console.log("count end", count)
  return (
    <div className="ag-theme-alpine" style={{ position: 'absolute ', backgroundColor: 'green', height: '100%', width: '100%' }}>
      <div className='title' style={{ height: '10%', backgroundColor: 'purple' }}>
        {/* <div className="Button1" style={{ padding: '0.5%', marginLeft: '88%', marginTop: '4%' }}>
        </div> */}
        <Header />
      </div>
      <div className="left" style={{ float: 'left', position: 'static', backgroundColor: 'yellow', width: '15%', height: '75%' }}>
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
            </Fragment>
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
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '85%', height: '75%', minHeight: '400px' }}>
        <AgGridReact
          rowData={recougusa && recougusa.data} pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady} defaultColDef={{
            flex: 1,
            minWidth: 100,
            editable: true,
          }}
          /* onGridSizeChanged={onGridSizeChanged.bind(this)} */ >
          <AgGridColumn field="FIT_DENOM" headerName="Deno." sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="USAGE_CF" headerName="CF" cellEditor="agSelectCellEditor"
              cellEditorParams={{
                values: ['TRUE','FALSE'],
              }}></AgGridColumn>
          <AgGridColumn field="USAGE_MR" headerName="MR" ></AgGridColumn>
          <AgGridColumn field="USAGE_UV" headerName="UV" ></AgGridColumn>
          <AgGridColumn field="USAGE_BL" headerName="BL" ></AgGridColumn>
          <AgGridColumn field="IMAGE_USE" headerName="IMAGE" ></AgGridColumn>
          <AgGridColumn field="FIT_HOLE" headerName="HOLE" ></AgGridColumn>
          <AgGridColumn field="FIT_TEAR" headerName="TEAR" ></AgGridColumn>
          <AgGridColumn field="FIT_DENOMIMG" headerName="1" ></AgGridColumn>
          <AgGridColumn field="FIT_STAIN" headerName="STAIN" ></AgGridColumn>
          <AgGridColumn field="FIT_FC" headerName="FC" ></AgGridColumn>
          <AgGridColumn field="FIT_MULTI" headerName="MULTI" ></AgGridColumn>
          <AgGridColumn field="FIT_FOLDED" headerName="FOLDED" ></AgGridColumn>
          <AgGridColumn field="FIT_GRAFF" headerName="GRAFF" ></AgGridColumn>
          <AgGridColumn field="FIT_LIMP" headerName="LIMP" ></AgGridColumn>
          <AgGridColumn field="FIT_CRUM" headerName="CRUM" ></AgGridColumn>
          <AgGridColumn field="FIT_DELINKED" headerName="DELINKED" ></AgGridColumn>
          <AgGridColumn field="FIT_TAPE" headerName="TAPE" ></AgGridColumn>
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
        <div style={{flexGrow: 1}}>
        <Tabs /* value={value} onChange={handleChange} */ aria-label="simple tabs example">
              <Tab label="Tab1" component={Link} to="/recog" />
              <Tab label="Tab3" component={Link} to="/menu2" />
        </Tabs>
        </div>
        <ul className="modelsWrapper">
          {tabName.map((name, index) => {
            return (
              <li>{name}</li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Recog
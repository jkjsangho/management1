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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

//달력
import CustomDateComponent from '../components/customDateComponent';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import axios from "axios";

const styles = theme => ({



})



/* const onGridReady = (params) => {
  this.gridApi = params.api;
  //gridColumnApi = params.columnApi;
};

const onBtnExport = () => {
  var params = getParams();
  if (params.suppressQuotes || params.columnSeparator) {
    alert(
      'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
    );
  }
  this.gridApi.exportDataAsCsv(params);
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
    case 'none':
      return;
    default:
      return text;
  }
}

function getParams() {
  return {
    suppressQuotes: getValue('#suppressQuotes'),
    columnSeparator: getValue('#columnSeparator'),
    customHeader: getValue('#customHeader'),
    customFooter: getValue('#customFooter'),
  };
} */
function Menu2() {
  /* 
    constructor(props) {
      super(props);
    this.state = {
      columnDefs: [
        { field: 'id' },
        {
          field: 'image',
        },
        { field: 'name' },
        { field: 'birthday' },
        {
          field: 'time',
          minWidth: 190,
          filter: 'agDateColumnFilter',
          filterParams: filterParams,
        },
        { field: 'gender' },
        {
          field: 'job',
          filter: 'agNumberColumnFilter',
        },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      rowData: null,
      frameworkComponents: { agDateInput: CustomDateComponent },
    };
  } */

  var frameworkComponents = { agDateInput: CustomDateComponent };

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

  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        '/GetUserInfo',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  console.log('================');
  console.log(data.data);
  console.log('================');



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

  //Right
  const MaybeSelectedIcon = ({ selected, Icon }) =>
    selected ? <CheckCircleOutlineIcon /> : <Icon />;

  const [items, setItems] = useState([
/*     { name: 'First User' },
    { name: 'Second User' },
    { name: 'Third User' },
    { name: 'Four User' },
    { name: 'Five User' },
    { name: 'Six User' } */
  ]);

  const onClick = index => () => {
    console.log(data.data[index].MACHINEID);
    const item = items[index];
/*     const item = data.data[index].MACHINEID; */
    const newItems = [...items];

    newItems[index] = { ...item, selected: !item.selected };
    setItems(newItems);
    console.log("item : ",item);
    console.log("items[index] : ", items[index]);
    console.log("index : ", index);

  };


  //Right


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
          <List>
            {items.map((item, index) => (
              <ListItem
                key={index}
                button
                selected={item.selected}
                onClick={onClick(index)}
              >
                <ListItemText primary={item.name} />
                <ListItemIcon>
                  <MaybeSelectedIcon
                    selected={item.selected}
                    Icon={AccountCircleIcon}
                  />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Paper>

      </div>
      <div className="right" style={{ float: 'right', position: 'static', backgroundColor: 'red', width: '80%', height: '75%', minHeight: '400px' }}>
        <AgGridReact
          rowData={data.data} pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}
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
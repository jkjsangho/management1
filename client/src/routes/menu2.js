import React, { useState, useEffect, useRef } from 'react';
import Customer from '../components/Customer'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import Button from '@material-ui/core/Button';
//달력
import CustomDateComponent from '../components/customDateComponent.js';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('/api/customers')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);

  console.log(rowData);

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


  return (
    <div className="ag-theme-alpine" style={{ backgroundColor: 'green', height: '100%', width: '90%', margin: '5%' }}>

      <Header />
      
      <div className="ag-theme-alpine" style={{ backgroundColor: 'yellow', height: '100%', width: '90%', margin: '5%' }}>
        <div style={{ display: 'none' }}>
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

      <div align='center' style={{ backgroundColor: 'red', height: '100px', minHeight: '400px', padding: '3%' }}>
        <AgGridReact
          rowData={rowData} pagination={true} paginationAutoPageSize={true} onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged.bind(this)} floatingFilter={true}>
          {/* frameworkComponents={this.state.frameworkComponents} */}
          <AgGridColumn field="id" sortable={true} filter={true} width={100}></AgGridColumn>
          <AgGridColumn field="image" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="name" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="birthday" sortable={true} filter={true} filterParams={filterParams}></AgGridColumn>
          <AgGridColumn field="time" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="gender" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="job" sortable={true} filter={true}></AgGridColumn>
        </AgGridReact>
        
{/*         <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
            onGridReady={this.onGridReady}
          /> */}

        <div className="Button1" style={{ marginLeft: '89%', padding: '0.5%' }}>
          <Button variant="contained" color="primary" onClick={() => onBtnExport()}>
            CSV Export
        </Button>
        </div>
      </div>

      <Footer />

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
import React, { useState, useEffect } from 'react';
import Customer from '../components/Customer'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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

  //const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);

   useEffect(() => {
    fetch('/api/customers')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '90%' }}>
      <Header />
      <div style={{ display: 'flex' }}>
        <div>
          <div className="row">
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
      <div>
        {/* <button onClick={() => onBtnExport()}>
          Download file (api.exportDataAsCsv())
            </button> */}
      </div>
      <AgGridReact
        rowData={rowData} pagination={true} paginationAutoPageSize={true} /* onGridReady={onGridReady} */>
        <AgGridColumn field="id" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="image" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="name" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="birthday" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="time" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="gender" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="job" sortable={true} filter={true}></AgGridColumn>
      </AgGridReact>
      <Footer />
    </div>
  );
}

export default Menu2
import React, { useState, useEffect } from 'react';
import Customer from '../components/Customer'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const styles = theme => ({



})

function Menu2() {

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
      fetch('/api/customers')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '90%' }}>
      <Header />
      <AgGridReact
        rowData={rowData} pagination={true} paginationAutoPageSize={true}>
        <AgGridColumn field="id" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="image" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="name" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="birthday" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="gender" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="job" sortable={true} filter={true}></AgGridColumn>
      </AgGridReact>
      <Footer />
    </div>
  );
}

export default Menu2
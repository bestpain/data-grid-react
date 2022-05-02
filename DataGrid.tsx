import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

interface MyProps {
    rowData?: any,
    columnDefs?: any
}   

class DataGrid extends React.Component<MyProps>{
    api: any;
    onGridReady=(params: any)=> {
        this.api = params.api;
    }
    
    render() {
        console.log(DataGrid, this)
        return (
            <AgGridReact
                rowData={this.props.rowData}
                columnDefs={this.props.columnDefs}
                onGridReady={this.onGridReady}
            />
        );
    }
};

export default DataGrid;
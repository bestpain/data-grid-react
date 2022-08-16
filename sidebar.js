

I think @InspiredJW did it with ES5, and as @trincot pointed out, using es6 is a better approach. But we can add a bit more sugar, by using the spread operator, and logical AND short circuit evaluation:

const a = {
   ...(someCondition && {b: 5})
}

1. create pallete
2. store column and filter property in config file
	conlumn =	{
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
		toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
		}
	
	filter =  {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        toolPanelParams: {
          suppressExpandAll: false,
          suppressFilterSearch: false,
      }
      },
		
3. if column panel true in panel then use the above config

4. toolPanelParams will come from pallete(pop up): should be undefined in checkbox

	toolPanelParams: {
          ...toolPanelParams,
		  ...palleteProvidedValues
        },


import React, { useState,useMemo } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const App = () => {
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ]);

  const defaultColDef = {
      filter: true,
  };

  const sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        toolPanelParams: {
          suppressExpandAll: false,
          suppressFilterSearch: false,
      }
      },
    ],
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} sideBar={sideBar}
      defaultColDef={defaultColDef} ></AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById('root'));



import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import isEqual from 'lodash/isEqual';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
  const [gridApi, setGridApi] = useState(null);

  const columns = [
    { headerName: "Athlete", field: "athlete", filter: "agTextColumnFilter" },
    { headerName: "Age", field: "age", filter: "agTextColumnFilter" },
    { headerName: "Country", field: "country", filter: "agTextColumnFilter" },
    { headerName: "Year", field: "year", filter: "agTextColumnFilter" },
    { headerName: "Date", field: 'date', filter: "agTextColumnFilter" },
    { headerName: "Sport", field: 'sport', filter: "agTextColumnFilter" },
    { headerName: "Gold", field: 'gold', filter: "agTextColumnFilter" },
    { headerName: "Silver", field: 'silver', filter: "agTextColumnFilter" },
    { headerName: "Bronze", field: 'bronze', filter: "agTextColumnFilter" },
    { headerName: "Total", field: 'total', filter: "agTextColumnFilter" },
  ]

  let oldSortModelGlobal;
  //   const isSame = (a, b) => a.value === b.value && a.display === b.display;
  //   const compareSorting = (old, new) => {
  //   if (old.length !== new.length) return true;
  //   old.filter(i => console.log(i))

  // }
  // copySorting = 
  const compareAndModifySortModel = (oldSort, newSort) => {
    let flag = false;
    // if (oldSort.length !== newSort.length) {
    //   oldSortModelGlobal = [...newSort]
    //   flag = true;
    // } else {
    if (!newSort.length) return false
    console.log(oldSort, newSort)
    if (!isEqual(oldSort, newSort)) {
      oldSortModelGlobal = [...newSort]
      flag = true;
    }
    // newSortModel.forEach(i => console.log(i))
    // }
    return flag;
  }
  const datasource = {
    getRows(params) {
      const newSortModel = params.api.getSortModel();
      if (compareAndModifySortModel(oldSortModelGlobal, newSortModel)) {
        params.api.paginationGoToPage(0)
      }
      // console.log(oldSortModelGlobal, newSortModel)
      //   // params.api.paginationGoToPage(0)
      //   // console.log(oldSortModel, newSortModel)
      // }
      // if (sortState.length == 0) {
      //   console.log("No sort active");
      // } else {
      //   console.log("State of sorting is:");
      //   for (var i = 0; i < sortState.length; i++) {
      //     const item = sortState[i];
      //     params.api.paginationGoToPage(0)
      //     console.log(i + " = {colId: " + item.colId + ", sort: " + item.sort + "}");
      //   }
      // }
      // if (sortModelTemp.isSort) {
      //   // params.request.startRow = 0;
      //   // params.request.endRow = 10;
      //   params.api.paginationGoToPage(0)
      // }
      console.log(JSON.stringify(params.request, null, 1));
      fetch('https://ag-grid-server.herokuapp.com/olympicWinners', {
        method: 'post',
        body: JSON.stringify(params.request),
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
        .then(httpResponse => httpResponse.json())
        .then(response => {
          params.successCallback(response.rows, response.lastRow);
        })
        .catch(error => {
          console.error(error);
          params.failCallback();
        })
    }
  };

  const onGridReady = (params) => {
    setGridApi(params);
    // register datasource with the grid
    oldSortModelGlobal = params.api.getSortModel();
    params.api.setServerSideDatasource(datasource);
  }

  return (
    <div>
      <h1 align="center">React-App</h1>
      <h4 align='center'>Implement Server-Side Pagination, Filter and Sorting in ag Grid</h4>
      <div className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          rowModelType="serverSide"
          onGridReady={onGridReady}
          // serverSideSortAllLevels={true}
          cacheBlockSize={10}
          // multiSortKey='ctrl'
          // onSortChanged={(params) => { sortModelTemp.isSort = true }}
          // onPaginationChanged={(params) => { sortModelTemp.isSort = false }}
          defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
        // getServerSideGroupLevelParams={getServerSideGroupLevelParams}

        />
      </div>
    </div>
  );
};
export default App






  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      const { startRow, endRow, filterModel, sortModel } = params.request
      let url = `http://localhost:4000/olympic?`
      //Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0]
        url += `_sort=${colId}&_order=${sort}&`
      }
      //Filtering
      const filterKeys = Object.keys(filterModel)
      filterKeys.forEach(filter => {
        url += `${filter}=${filterModel[filter].filter}&`
      })
      //Pagination
      url += `_start=${startRow}&_end=${endRow}`
      fetch(url)
        .then(httpResponse => httpResponse.json())
        .then(response => {
          params.successCallback(response, 499);
        })
        .catch(error => {
          console.error(error);
          params.failCallback();
        })
    }
  };
  
  const onGridReady = (params) => {
    setGridApi(params);
    // register datasource with the grid
    params.api.setServerSideDatasource(datasource);
  }

  return (
    <div>
      <h1 align="center">React-App</h1>
      <h4 align='center'>Implement Server-Side Pagination, Filter and Sorting in ag Grid</h4>
      <div className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
          domLayout="autoHeight"
          rowModelType="serverSide"
          onGridReady={onGridReady}
          defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
        />
      </div>
    </div>
  );
};
export default App

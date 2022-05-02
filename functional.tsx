import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';

const DataGrid = forwardRef((props, ref) => {
    const [rowData, setRowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 }
    ]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ]);

    const [api, setApi] = useState(null);

    const onGridReady = (params: any) => {
        setApi(params.api);
    };

    useImperativeHandle(ref, () => {
        return {
            getApi() {
                return api;
            }
        }
    });
    return <AgGridReact rowData={rowData} columnDefs={columnDefs} onGridReady={onGridReady} />;
})

export default DataGrid;


import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {mount} from 'enzyme';
import {act} from "@testing-library/react";
import DataGrid from './DataGrid'

let component: any = null;
let agGridReact: any = null;

const ensureGridApiHasBeenSet = async (componentRef: any) => {
    await act(async () => {
        await new Promise<void>(function (resolve, reject) {
            (function waitForGridReady() {
                console.log(componentRef)
                if (componentRef.current.getApi()) {
                    if (componentRef.current.getApi().getRowNode(2)) {
                        return resolve();
                    }

                }
                setTimeout(waitForGridReady, 10);
            })();
        })

    });
};

beforeEach(async () => {
    const innerRef = React.createRef()
    component = mount(<DataGrid ref={innerRef}/>);
    agGridReact = component.find(AgGridReact).instance();
    await ensureGridApiHasBeenSet(innerRef);
});

afterEach(() => {
    component.unmount();
    agGridReact = null;
})


it('all rows selected', () => {
    // // no rows are selected initially
    // expect(agGridReact.api.getSelectedRows().length).toEqual(0);

    // // simulate a user clicking on the select all button
    // component.find('#selectAll').simulate('click', {
    // // no actual event data is needed for this particular event/use case
    // });

    // expect(agGridReact.api.getSelectedRows().length).toEqual(8618)
});

// it('all rows deselected', () => {
//   // no rows are selected initially - use the grid directly to select them all (bypassing our app component)
//   agGridReact.api.selectAll();

//   // simulate a user clicking on the deselect all button
//   component.find('#deSelectAll').simulate('click', {
//     // no actual event data is needed for this particular event/use case
//   });

//   expect(agGridReact.api.getSelectedRows().length).toEqual(0);
// });

import React from 'react';
import { mount } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';
import DataGrid from './DataGrid'

const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
];

const columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'price' }
];

let component: any = null;
let agGridReact: any = null;

export const ensureGridApiHasBeenSet = (component: any) => {
    return waitForAsyncCondition(() => {
        console.log(component)
        return component.instance().api !== undefined
    }, 5)
};

export const waitForAsyncCondition = (condition: any, maxAttempts: any, attempts = 0) =>
    new Promise<void>(function (resolve, reject) {
        (function waitForCondition() {
            // we need to wait for the gridReady event before we can start interacting with the grid
            // in this case we're looking at the api property in our App component, but it could be
            // anything (ie a boolean flag)
            if (condition()) {
                // once our condition has been met we can start the tests
                return resolve();
            }

            attempts++;

            if (attempts >= maxAttempts) {
                reject("Max timeout waiting for condition")
            }

            // not set - wait a bit longer
            setTimeout(waitForCondition, 10);
        })();
    });

beforeEach((done) => {
    component = mount((<DataGrid rowData={rowData} columnDefs={columnDefs} />));
    agGridReact = component.find(AgGridReact).instance();
    // don't start our tests until the grid is ready
    ensureGridApiHasBeenSet(component).then(() => done(),
        () => fail("Grid API not set within expected time limits"));
});

it('stateful component returns a valid component instance', () => {
    expect(agGridReact.api).toBeTruthy();
});

it('first column name should be called "Make"', () => {
    console.log(rowData.map((a) => {
        return Object.keys(a)[0]
    }))
    expect(component.render().find('.ag-header-cell-text').html()).toEqual(`Make`);
})

it('number of colums should match the input', () => {
    expect(component.render().find('.ag-cell-label-container').length).toEqual(4);
})


it('component should match the row value', () => {
    expect(component.render().find('.ag-cell-value').html()).toEqual(`Toyota`);
})

it('total number of rows')
it('nth row should match this')
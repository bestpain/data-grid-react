import React from "react";

function youreAlwaysCoolHOC(ChildComp: React.ComponentType<any | string>) {
  return class Component extends React.Component<any, any> {
    render() {
      console.log(this.props);
      return (
        <>
          <ChildComp {...this.props} />
        </>
      );
    }
  };
}
export default youreAlwaysCoolHOC;


const App = youreAlwaysCoolHOC(DataGrid);

render(<App config={tesdData2.config} />, document.querySelector("#root"));

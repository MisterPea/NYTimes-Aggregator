import React from "react";
import ReactDOM from "react-dom";
import SectionMenu from "./components/SectionMenu";

function App() {
  return (
    <div>
      <SectionMenu />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

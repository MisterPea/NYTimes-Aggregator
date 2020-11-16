import React from "react";
import ReactDOM from "react-dom";
import SectionMenu from "./components/SectionMenu";
import TitleBar from "./components/TitleBar"

function App() {
  return (
    <div>
      <TitleBar />
      <SectionMenu />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


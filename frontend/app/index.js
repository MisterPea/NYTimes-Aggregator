import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div>
      <p>Hello y'all</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

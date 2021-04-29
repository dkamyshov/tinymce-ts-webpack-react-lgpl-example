import React from "react";
import { render } from "react-dom";
import { TinyMCEEditor } from "./TinyMCEEditor";

const App = () => {
  return (
    <div>
      <TinyMCEEditor />
      <br />
      <TinyMCEEditor />
      <br />
      <TinyMCEEditor />
      <br />
      <TinyMCEEditor />
    </div>
  );
};

render(<App />, document.getElementById("root"));

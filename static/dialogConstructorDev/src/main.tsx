import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.css";
import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./components/Application";

const DragAndDropComponent = () => {
  var app = new Application();
  return <BodyWidget app={app} />;
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <DragAndDropComponent />,
    document.querySelector("#dialogConstructorContainer")
  );
});

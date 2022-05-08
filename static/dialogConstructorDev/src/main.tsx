import * as React from "react";
import * as ReactDOM from "react-dom";
import { MainLayout } from "./components/MainLayout";
import { Application } from "./Application";

const DragAndDropComponent = () => {
  var app = new Application();
  return <MainLayout app={app} />;
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<DragAndDropComponent />, document.querySelector("#dialogConstructorContainer"));
});

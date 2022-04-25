import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.css";
import { MainLayout } from "./components/MainLayout";
import { Application } from "./components/Application";

const DragAndDropComponent = () => {
  var app = new Application();
  return <MainLayout app={app} />;
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <DragAndDropComponent />,
    document.querySelector("#dialogConstructorContainer")
  );
});

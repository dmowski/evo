/*import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.css";
/*
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import { TSCustomNodeFactory } from "./custom-node-ts/TSCustomNodeFactory";
import { TSCustomNodeModel } from "./custom-node-ts/TSCustomNodeModel";


import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./Application";


const engine = createEngine();
engine.getNodeFactories().registerFactory(new TSCustomNodeFactory());

const model = new DiagramModel();

const node1 = new TSCustomNodeModel({ color: "rgb(192,255,0)" });
node1.setPosition(50, 50);

const node2 = new TSCustomNodeModel({ color: "rgb(0,192,255)" });
node2.setPosition(700, 50);

const link1 = new DefaultLinkModel();
link1.setSourcePort(node1.getPort("out"));
link1.setTargetPort(node2.getPort("in"));

model.addAll(node1, node2, link1);

engine.setModel(model);


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
*/

import React, { useState } from "react";
import * as _ from "lodash";
import { Application } from "./Application";

import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { GraphCanvas } from "./GraphCanvas";
import { AdvancedPortModel } from "./LinksSettings";
import styled from "@emotion/styled";
import { CustomNodeModel } from "./Node/CustomNodeModel";
export interface MainLayoutProps {
  app: Application;
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export const Tray = styled.div<{ color: string }>(({ color }) => ({
  color: "black",
  padding: "5px 10px",
  border: `1px solid  ${color}`,
  backgroundColor: "white",
  cursor: "pointer",
}));

export const MainLayout = ({ app }: MainLayoutProps) => {
  const forceUpdate = useForceUpdate();

  const dropHandler = (event) => {
    var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
    var nodesCount = _.keys(
      app.getDiagramEngine().getModel().getNodes()
    ).length;

    var node: DefaultNodeModel | CustomNodeModel = null;
    if (data.type === "skill") {
      const name = "skill " + (nodesCount + 1);
      node = new CustomNodeModel(name, "skill", true);
    } else {
      node = new DefaultNodeModel(
        "intent " + (nodesCount + 1),
        "rgb(0,192,255)"
      );
      node.addPort(new AdvancedPortModel(false, "out", "out"));
    }
    var point = app.getDiagramEngine().getRelativeMousePoint(event);
    node.setPosition(point);
    app.getDiagramEngine().getModel().addNode(node);
    forceUpdate();
  };

  return (
    <div>
      <div
        style={{
          height: "100vh",
        }}
        onDrop={dropHandler}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      >
        <GraphCanvas color="rgb(222, 222, 222)" background="rgb(233, 233, 233)">
          <CanvasWidget engine={app.getDiagramEngine()} />
        </GraphCanvas>
      </div>

      <div
        style={{
          display: "flex",
          borderRadius: "10px",
          backgroundColor: "white",
          gap: "10px",
          padding: "25px 30px",
          position: "fixed",
          left: "20px",
          bottom: "20px",
        }}
      >
        <Tray
          color="rgb(192,255,0)"
          draggable={true}
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "storm-diagram-node",
              JSON.stringify({ type: "skill" })
            );
          }}
          className="tray-item"
        >
          Skill
        </Tray>

        <Tray
          color="rgb(0,192,255)"
          draggable={true}
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "storm-diagram-node",
              JSON.stringify({ type: "intent" })
            );
          }}
          className="tray-item"
        >
          Intent
        </Tray>
      </div>
    </div>
  );
};

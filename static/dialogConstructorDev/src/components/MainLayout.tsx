import React, { useState } from "react";
import * as _ from "lodash";
import { Application } from "./Application";

import { DefaultNodeModel, NodeModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { GraphCanvas } from "./GraphCanvas";
import { AdvancedLinkModel, AdvancedPortModel } from "./LinksSettings";
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
  padding: "5px 10px",
  border: `1px solid ${color}`,
  backgroundColor: color,
  fontFamily: "sans-serif",
  color: "white",
  cursor: "pointer",
}));

export const ZoomControllButton = styled.div<{ color: string }>(
  ({ color }) => ({
    display: "flex",
    padding: "15px 20px 18px 20px",
    fontSize: "30px",
    fontFamily: "sans-serif",
    color: "#222",
    cursor: "pointer",
    height: "40px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    backgroundColor: "white",
    border: "1px solid #EBEBEB",
    position: "fixed",
    left: "0",
    right: "0",
    bottom: "20px",
    margin: "auto",
    width: "200px",

    ":hover": {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
  })
);

export const DeleteControllButton = styled.div<{ color: string }>(
  ({ color }) => ({
    display: "flex",
    padding: "15px 20px 18px 20px",
    fontSize: "30px",
    fontFamily: "sans-serif",
    color: "#222",
    cursor: "pointer",
    height: "40px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    backgroundColor: "white",
    border: "1px solid #EBEBEB",
    position: "fixed",
    right: "20px",
    bottom: "20px",
    margin: "auto",
    width: "50px",

    ":hover": {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
  })
);

export const MainLayout = ({ app }: MainLayoutProps) => {
  const forceUpdate = useForceUpdate();

  const dropHandler = (event) => {
    var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
    var nodesCount = _.keys(app.diagramEngine.getModel().getNodes()).length;

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
    var point = app.diagramEngine.getRelativeMousePoint(event);
    node.setPosition(point);
    app.diagramEngine.getModel().addNode(node);
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
          <CanvasWidget engine={app.diagramEngine} />
        </GraphCanvas>
      </div>

      <div
        style={{
          display: "flex",
          borderRadius: "14px",
          backgroundColor: "white",
          gap: "16px",
          padding: "20px 25px",
          border: "1px solid #EBEBEB",
          position: "fixed",
          left: "20px",
          bottom: "20px",
        }}
      >
        <Tray
          color="#1A1A4E"
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

        <Tray
          color="#FF7A00"
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
      </div>

      <ZoomControllButton
        onClick={() => {
          app.diagramEngine.zoomToFitSelectedNodes({ margin: 100 });
        }}
      >
        Zoom to fit
      </ZoomControllButton>

      <DeleteControllButton
        onClick={() => {
          app.diagramEngine
            .getModel()
            .getSelectedEntities()
            .forEach((item) => {
              console.log("item", item);

              if (item instanceof NodeModel) {
                app.diagramEngine.getModel().removeNode(item);
              } else if (item instanceof AdvancedLinkModel) {
                app.diagramEngine.getModel().removeLink(item);
              }
            });
          forceUpdate();
        }}
      >
        🗑
      </DeleteControllButton>
    </div>
  );
};

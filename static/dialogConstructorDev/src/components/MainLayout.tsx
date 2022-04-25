import React, { useState } from "react";
import * as _ from "lodash";
import { Application } from "./Application";

import {
  DefaultNodeModel,
  LinkModel,
  NodeModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { GraphCanvas } from "./GraphCanvas";
import { AdvancedLinkModel, AdvancedPortModel } from "./LinksSettings";
import styled from "@emotion/styled";
import { CustomNodeModel } from "./Node/CustomNodeModel";
export interface MainLayoutProps {
  app: Application;
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
    fontSize: "20px",
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
    fontSize: "20px",
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
  const dropHandler = (event) => {
    var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
    var nodesCount = _.keys(app.diagramEngine.getModel().getNodes()).length;

    var node: DefaultNodeModel | CustomNodeModel = null;
    if (data.type === "skill") {
      const name = "skill " + (nodesCount + 1);
      node = new CustomNodeModel(name, "skill", true);
    } else {
      const name = "intent " + (nodesCount + 1);
      node = new CustomNodeModel(name, "intent", false);
    }
    var point = app.diagramEngine.getRelativeMousePoint(event);
    node.setPosition(point);
    app.diagramEngine.getModel().addNode(node);
    app.diagramEngine.repaintCanvas();
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
          gap: "16px",
          position: "fixed",
          left: "20px",
          top: "20px",
        }}
      >
        <select
          name="dialogs"
          id=""
          style={{
            padding: "10px 15px",
            backgroundColor: "white",
            border: "1px solid #c2c2c2",
            borderRadius: "4px",
          }}
        >
          <option value="a">asda sd asd</option>
          <option value="a1">asda sd asd</option>
          <option value="a2">FFffFF</option>
          <option value="a3">asda sd asd</option>
        </select>

        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "white",
            border: "1px solid #c2c2c2",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Добавить диалог
        </button>
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
          const confirmResult = confirm("Delete this element?");
          if (!confirmResult) {
            return;
          }
          app.diagramEngine
            .getModel()
            .getSelectedEntities()
            .forEach((item) => {
              console.log("item", item);

              if (item instanceof NodeModel) {
                app.diagramEngine.getModel().removeNode(item);
              } else if (item instanceof LinkModel) {
                app.diagramEngine.getModel().removeLink(item);
              }
            });
          app.diagramEngine.repaintCanvas();
        }}
      >
        🗑
      </DeleteControllButton>
    </div>
  );
};

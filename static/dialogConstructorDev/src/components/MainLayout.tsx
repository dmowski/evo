import React, { useState, useEffect } from "react";
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
import { DeleteControllButton, Tray, ZoomControllButton } from "./style";
export interface MainLayoutProps {
  app: Application;
}

export interface GraphShortInfo {
  id: string;
  title: string;
}

const baseUrl = location.host.startsWith("localhost:34567")
  ? "http://localhost:62544/"
  : location.origin + "/";

const getListOfGraphs = async () => {
  const req = await fetch(baseUrl + "api/v1/dialo_graph.list");
  const listOfNodes = await req.json();
  return listOfNodes?.graph_list || [];
};

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

  const [graphList, setGrapList] = useState<GraphShortInfo[]>([]);

  useEffect(() => {
    (async () => {
      const graphList = await getListOfGraphs();
      setGrapList(graphList);
    })();
  }, []);

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
          {graphList.map((graphInfo) => {
            return <option value={graphInfo.id}>{graphInfo.title}</option>;
          })}
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

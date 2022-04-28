import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { Application } from "./Application";

import {
  DiagramEngine,
  LinkModel,
  NodeModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { CustomNodeModel } from "./Node/CustomNodeModel";
import {
  AddDialogButton,
  DeleteControlButton,
  DialogConstructorHeader,
  GraphCanvas,
  NodeControlElement,
  NodeControlPanel,
  ZoomControlButton,
} from "./style";

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
  return (
    listOfNodes?.graph_list || [
      { id: 1, title: "title" },
      { id: 2, title: "213123" },
    ]
  );
};

export const MainLayout = ({ app }: MainLayoutProps) => {
  const dropHandler = (event) => {
    var type = event.dataTransfer.getData("storm-diagram-node-type");
    const nodeName = `${type} #${Math.round(Math.random() * 1000)}`;
    const isIn = type === "skill";
    const content = "hello";
    const node = new CustomNodeModel(nodeName, type, isIn, content);
    var point = app.diagramEngine.getRelativeMousePoint(event);
    node.setPosition(point);
    app.diagramEngine.getModel().addNode(node);
    app.diagramEngine.repaintCanvas();
  };

  const saveGraph = ({ id, title }: { id: string; title: string }) => {
    const serialisedData = app.diagramEngine.getModel().serialize();
    const nodeDates = Object.values(serialisedData.layers[1].models);
    const arrowsDates = Object.values(serialisedData.layers[0].models);
    const names = nodeDates.map((i) => {
      return { id: i.id, name: i.extras.name };
    });
    const momChild = arrowsDates.map((m) => {
      return {
        mom: m.source,
        child: m.target,
        childName: names.find((name) => name.id === m.target).name,
      };
    });
    const graph = nodeDates.map((node) => {
      return {
        node_type: node.extras.type,
        node_name: node.extras.name,
        node_content: node.extras.content,
        node_links: momChild
          .filter((item) => item.mom === node.id)
          .map((i) => i.childName),
        node_views: 0,
      };
    });
    const result = {
      id,
      title,
      graph,
    };
    console.log(result);
  };

  const [graphList, setGraphList] = useState<GraphShortInfo[]>([]);

  useEffect(() => {
    (async () => {
      const graphList = await getListOfGraphs();
      setGraphList(graphList);
      setSelectGraph(graphList[0]);
    })();
  }, []);
  const [selectGraph, setSelectGraph] = useState(graphList[0]);
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

      <DialogConstructorHeader>
        <select
          name="dialogs"
          onChange={(e) => {
            setSelectGraph(graphList[e.target.value]);
          }}
        >
          {graphList.map((graphInfo, key) => {
            return (
              <option value={key} key={graphInfo.id}>
                {graphInfo.title}
              </option>
            );
          })}
        </select>

        <AddDialogButton>Добавить диалог</AddDialogButton>

        <AddDialogButton onClick={() => saveGraph({ ...selectGraph })}>
          Сохранить граф
        </AddDialogButton>
      </DialogConstructorHeader>

      <NodeControlPanel>
        <NodeControlElement
          color="#1A1A4E"
          draggable={true}
          onDragStart={(event) => {
            event.dataTransfer.setData("storm-diagram-node-type", "intent");
          }}
          className="tray-item"
        >
          Intent
        </NodeControlElement>

        <NodeControlElement
          color="#FF7A00"
          draggable={true}
          onDragStart={(event) => {
            event.dataTransfer.setData("storm-diagram-node-type", "skill");
          }}
          className="tray-item"
        >
          Skill
        </NodeControlElement>
      </NodeControlPanel>

      <ZoomControlButton
        onClick={() => {
          app.diagramEngine.zoomToFitSelectedNodes({ margin: 100 });
        }}
      >
        Zoom to fit
      </ZoomControlButton>

      <DeleteControlButton
        onClick={() => {
          const confirm = window.confirm(
            "Are you sure you want to delete Dialog?"
          );
          if (confirm) {
            console.log("Send request");
          }
        }}
      >
        🗑
      </DeleteControlButton>
    </div>
  );
};

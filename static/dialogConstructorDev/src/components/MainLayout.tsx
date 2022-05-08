import * as React from "react";
import { useState, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Application } from "../Application";
import { DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { CustomNodeModel } from "./Node/CustomNodeModel";
import {
  DialogConstructorHeader,
  GraphCanvas,
  GraphToolbar,
  NodeControlElement,
  NodeControlPanel,
} from "./style";
import * as converter from "../utils/graphConverter";
import backendFunctions from "../utils/backendFunctions";
import { ZoomControl } from "./ZoomControl/ZoomControl";
import { DeleteControl } from "./DeleteControl/DeleteControl";
import { AddNewDialog } from "./AddNewDialog/AddNewDialog";
import { SaveDialog } from "./SaveDialog/SaveDialog";
import { BackendGraph, BackendShortGraph } from "../types/backend";

export interface MainLayoutProps {
  app: Application;
}

export const MainLayout = ({ app }: MainLayoutProps) => {
  const [graphList, setGraphList] = useState<BackendShortGraph[]>([]);
  const [selectedGraph, setSelectedGraph] = useState<BackendGraph | null>(null);

  const dropHandler = (event) => {
    var type = event.dataTransfer.getData("storm-diagram-node-type");
    const nodeName = `${type} #${Math.round(Math.random() * 1000)}`;
    const isIn = type === "skill";
    const content = "";
    const node = new CustomNodeModel(nodeName, type, isIn, content, 0);
    var point = app.diagramEngine.getRelativeMousePoint(event);
    node.setPosition(point);
    app.diagramEngine.getModel().addNode(node);
    app.diagramEngine.repaintCanvas();
  };

  const saveGraph = async () => {
    const graphModel = app.diagramEngine.getModel();
    const graphDataForBackend = converter.toBackendFormat(graphModel);

    const graphData = await backendFunctions.getOne(selectedGraph.id);
    const isNewGraph = !!graphData.error;
    const id = selectedGraph.id;

    let title = selectedGraph.title;

    title = window.prompt("Введите имя нового диалога", title);

    const dataForSaveInBackend: BackendGraph = {
      id,
      title,
      graph: graphDataForBackend,
    };

    try {
      if (isNewGraph) {
        const errorResult = await backendFunctions.create(dataForSaveInBackend);
        if (errorResult) {
          alert("Error: " + errorResult);
        }
      } else {
        const errorResult = await backendFunctions.update(dataForSaveInBackend);
        if (errorResult) {
          alert("Error: " + errorResult);
        }
      }
    } catch (e) {
      alert("Ошибка в процессе сохранения");
      console.log(e);
    }

    await updateListOfDialogs();
  };

  const updateListOfDialogs = async () => {
    try {
      const graphList = await backendFunctions.getList();
      if (graphList.length) {
        setGraphList(graphList);
      }
    } catch (e) {
      alert("Ошибка при получении списка графов");
      console.log(e);
    }
  };

  useEffect(() => {
    updateListOfDialogs();
  }, [selectedGraph]);

  const changeGraph = async (newGraphId: string) => {
    if (selectedGraph && selectedGraph.id === newGraphId) {
      return;
    }

    if (window.confirm("Вы действительно хотите сменить диалог?")) {
      const graphFullData = await backendFunctions.getOne(newGraphId);
      const backendNodes = graphFullData.graph || [];
      const newModels = converter.fromBackendFormat(backendNodes);
      app.activeModel = new DiagramModel();
      app.diagramEngine.setModel(app.activeModel);
      app.activeModel.addAll(...newModels);
      app.diagramEngine.repaintCanvas();
      setSelectedGraph(graphFullData);
    }
  };

  const newGraph = async () => {
    const newGraphId = `${Date.now()}`;
    const newGraphShortInfo: BackendShortGraph = {
      id: newGraphId,
      title: `Dialog #${newGraphId}`,
    };

    setGraphList([...graphList, newGraphShortInfo]);

    const newGraphFull: BackendGraph = {
      ...newGraphShortInfo,
      graph: [],
    };
    const model = new DiagramModel();
    app.diagramEngine.setModel(model);
    setSelectedGraph(newGraphFull);
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
        {selectedGraph && (
          <GraphCanvas>
            <CanvasWidget engine={app.diagramEngine} />
          </GraphCanvas>
        )}
      </div>

      <DialogConstructorHeader>
        {graphList.length > 0 && (
          <select
            name="dialogs"
            value={selectedGraph?.id}
            onChange={(e) => {
              changeGraph(e.target.value);
            }}
          >
            <option value="0"></option>
            {graphList.map((graphInfo) => {
              return (
                <option value={graphInfo.id} key={graphInfo.id}>
                  {graphInfo.title}
                </option>
              );
            })}
          </select>
        )}

        <AddNewDialog onClick={newGraph} showConfirm={selectedGraph} />
        {selectedGraph && <SaveDialog onClick={saveGraph} />}
      </DialogConstructorHeader>

      {selectedGraph && (
        <GraphToolbar>
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

          <ZoomControl app={app} />

          <DeleteControl
            onDelete={async () => {
              console.log("Send request");
            }}
          />
        </GraphToolbar>
      )}
    </div>
  );
};

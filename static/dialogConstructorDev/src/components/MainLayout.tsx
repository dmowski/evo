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
import { confirmChangesDialog } from "../utils/confirmChangesDialog";

export interface MainLayoutProps {
  app: Application;
}

export const MainLayout = ({ app }: MainLayoutProps) => {
  const [graphList, setGraphList] = useState<BackendShortGraph[]>([]);
  const [selectedGraph, setSelectedGraph] = useState<BackendGraph | null>(null);
  const [selectedGraphId, setSelectedGraphId] = useState<number>(0);
  const [isNewGraph, setIsNewGraph] = useState(true);

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
    const id = selectedGraph.id;
    let title = selectedGraph.title;
    title = window.prompt("Введите имя нового диалога", title);

    const dataForSaveInBackend: BackendGraph = {
      id,
      title,
      graph: graphDataForBackend,
    };

    if (isNewGraph) {
      const errorResult = await backendFunctions.create(dataForSaveInBackend);
      if (errorResult) {
        alert("Error: " + errorResult.error);
        return;
      }
    } else {
      const errorResult = await backendFunctions.update(dataForSaveInBackend);
      if (errorResult) {
        alert("Error: " + errorResult.error);
        return;
      }
    }

    await updateListOfDialogs();
    setIsNewGraph(false);
    setSelectedGraphId(id);
    setSelectedGraph(dataForSaveInBackend);
    console.log(`setSelectedGraphId(id);`, id);
  };

  const updateListOfDialogs = async () => {
    const graphList = await backendFunctions.getList();
    if (!("error" in graphList)) {
      setGraphList(graphList);
    } else {
      alert("Ошибка при получении списка графов");
      console.log(graphList);
    }
  };

  useEffect(() => {
    updateListOfDialogs();
    app.diagramEngine;
  }, []);

  const selectNewGraph = async (newGraphIdValue: string) => {
    const newGraphId = parseInt(newGraphIdValue);
    if (selectedGraph?.id === newGraphId || newGraphId == 0) {
      return;
    }

    if (selectedGraphId != 0) {
      const confirmResult = await confirmChangesDialog(
        "Вы действительно хотите сменить диалог?",
        "Данные будут потеряны"
      );
      if (!confirmResult) {
        return;
      }
    }

    const graphFullData = await backendFunctions.getOne(newGraphId);
    if ("error" in graphFullData) {
      alert(graphFullData.error);
      return;
    }
    const backendNodes = graphFullData.graph || [];
    const newModels = converter.fromBackendFormat(backendNodes);
    app.activeModel = new DiagramModel();
    app.diagramEngine.setModel(app.activeModel);
    app.activeModel.addAll(...newModels);
    app.diagramEngine.repaintCanvas();

    setSelectedGraph(graphFullData);
    setSelectedGraphId(graphFullData.id);
    setIsNewGraph(false);
  };

  const newGraph = async () => {
    const newGraphId = Date.now();
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
    setIsNewGraph(true);
    setSelectedGraphId(newGraphFull.id);
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
            value={selectedGraphId}
            onChange={(e) => {
              selectNewGraph(e.target.value);
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

        <AddNewDialog onClick={newGraph} showConfirm={selectedGraphId != 0} />
        {selectedGraphId != 0 && <SaveDialog onClick={saveGraph} />}
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

          <DeleteControl onClick={() => console.log("Send request")} />
        </GraphToolbar>
      )}
    </div>
  );
};

import * as React from 'react';
import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Application } from "./Application";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DiagramModel } from "@projectstorm/react-diagrams";
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
import { BackendGraphNode, dataForPost, receivedData } from "./utils/dataProcessing";
import { addNewGraph, getListOfGraphs, getOneGraph, updateGraphInBD } from './utils/backendFunctions';

export interface MainLayoutProps {
  app: Application;
}

export interface BackendGraph {
  id: string;
  title: string;
  graph: BackendGraphNode[];
}

export interface BackendShortGraph {
  id: string;
  title: string;
}

export const MainLayout = ({ app }: MainLayoutProps) => {
  const [graphList, setGraphList] = useState<BackendShortGraph[]>([]);
  const [selectGraph, setSelectGraph] = useState<BackendGraph | null>(null);

  const dropHandler = (event) => {
    var type = event.dataTransfer.getData("storm-diagram-node-type");
    const nodeName = `${type} #${Math.round(Math.random() * 1000)}`;
    const isIn = type === "skill";
    const content = "";
    const node = new CustomNodeModel(nodeName, type, isIn, content);
    var point = app.diagramEngine.getRelativeMousePoint(event);
    node.setPosition(point);
    app.diagramEngine.getModel().addNode(node);
    app.diagramEngine.repaintCanvas();
  };

  const saveGraph = async () => {
    const graph = dataForPost(app.diagramEngine.getModel());
    const graphData = await getOneGraph(selectGraph.id);
    const isNewGraph = !!graphData.error;
    const id = selectGraph.id;

    let title = selectGraph.title;

    title = window.prompt("Введите имя нового диалога", title);

    const dataForSaveInBackend: BackendGraph = {
      id,
      title,
      graph,
    };

    try {
      if (isNewGraph) {
        const errorResult = await addNewGraph(dataForSaveInBackend);
        if (errorResult) {
          alert("Error: " + errorResult);
        }
      } else {
        const errorResult = await updateGraphInBD(dataForSaveInBackend);
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
      const graphList = await getListOfGraphs();
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
  }, [selectGraph]);

  const changeGraph = async (newGraphId: string) => {
    if (selectGraph && selectGraph.id === newGraphId) {
      return;
    }

    if (window.confirm("Вы действительно хотите сменить диалог?")) {
      const graphFullData = await getOneGraph(newGraphId);
      const backendNodes = graphFullData.graph || [];
      const newModels = receivedData(backendNodes);
      app.activeModel = new DiagramModel();
      app.diagramEngine.setModel(app.activeModel);
      app.activeModel.addAll(...newModels);
      app.diagramEngine.repaintCanvas();
      setSelectGraph(graphFullData);
    }
  };

  const newGraph = async () => {
    const newGraphShortInfo: BackendShortGraph = {
      id: Date.now() + "",
      title: "Dialog #" + Date.now(),
    };

    setGraphList([...graphList, newGraphShortInfo]);

    const newGraph: BackendGraph = {
      ...newGraphShortInfo,
      graph: [],
    };
    const model = new DiagramModel();
    app.diagramEngine.setModel(model);
    setSelectGraph(newGraph);
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
          {selectGraph && (
              <GraphCanvas color="rgb(222, 222, 222)" background="rgb(233, 233, 233)">
                <CanvasWidget engine={app.diagramEngine} />
              </GraphCanvas>
          )}
        </div>

        <DialogConstructorHeader>
          {graphList.length > 0 && (
              <select
                  name="dialogs"
                  value={selectGraph?.id}
                  onChange={(e) => {
                    changeGraph(e.target.value);
                  }}
              >
                <option value="0"></option>
                {graphList.map((graphInfo, key) => {
                  return (
                      <option value={graphInfo.id} key={graphInfo.id}>
                        {graphInfo.title}
                      </option>
                  );
                })}
              </select>
          )}

          <AddDialogButton
              onClick={() => {
                if (selectGraph) {
                  confirmAlert({
                    title: "Создать новый диалог?",
                    message: "Несохраненные данные будут удалены",
                    buttons: [
                      {
                        label: "Да",
                        onClick: newGraph,
                      },
                      {
                        label: "Нет",
                        // onClick: () => alert("Click No")
                      },
                    ],
                  });
                } else {
                  newGraph();
                }
              }}
          >
            Добавить новый диалог
          </AddDialogButton>

          {selectGraph && <AddDialogButton onClick={saveGraph}>Сохранить граф</AddDialogButton>}
        </DialogConstructorHeader>

        {selectGraph && (
            <>
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
                    confirmAlert({
                      title: "Удалить Диалог",
                      message: "Вы действительно хотите это сделать?",
                      buttons: [
                        {
                          label: "Да",
                          onClick: () => console.log("Send request"),
                        },
                        {
                          label: "Нет",
                          // onClick: () => alert("Click No")
                        },
                      ],
                    });
                  }}
              >
                🗑
              </DeleteControlButton>
            </>
        )}
      </div>
  );
};

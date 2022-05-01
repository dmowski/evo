import React, { useState, useEffect } from "react";
import { Application } from "./Application";
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

const baseUrl = location.host.startsWith("localhost:34567")
  ? "http://localhost:62544/"
  : location.origin + "/";

const getListOfGraphs = async (): Promise<BackendShortGraph[]> => {
  const req = await fetch(baseUrl + "api/v1/dialo_graph.list");
  const listOfNodes = await req.json();
  return listOfNodes?.graph_list || [];
};

const getOneGraph = async (id: string): Promise<BackendGraph> => {
  const req = await fetch(baseUrl + "api/v1/dialo_graph.get?graph_id=" + id);
  const graphData = await req.json();
  return graphData;
};

const addNewGraph = async (graphData: BackendGraph): Promise<BackendGraph> => {
  const response = await fetch(baseUrl + "api/v1/dialo_graph.add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphData),
  });
  const result = await response.json();
  console.log("Saving result", result);

  if (result.error) {
    return result.error + result.message;
  }
};

const updateGraphInBD = async (graphData: BackendGraph): Promise<BackendGraph> => {
  const response = await fetch(baseUrl + "api/v1/dialo_graph.update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphData),
  });
  const result = await response.json();
  console.log("Saving result", result);

  if (result.error) {
    return result.error + result.message;
  }
};

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

    title = window.prompt("Enter name for new dialog", title);

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
      alert("Error during save process");
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
      alert("Failed to get list of graphs");
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

    if (window.confirm("Are you sure you want to change Dialog?")) {
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
    const confirmMessage = "Создать новый диалог? Введенные данные будут утеряны";

    if (selectGraph && !window.confirm(confirmMessage)) {
      return;
    }

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

        <AddDialogButton onClick={newGraph}>Добавить новый диалог</AddDialogButton>

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
              const confirm = window.confirm("Are you sure you want to delete Dialog?");
              if (confirm) {
                console.log("Send request");
              }
            }}
          >
            🗑
          </DeleteControlButton>
        </>
      )}
    </div>
  );
};

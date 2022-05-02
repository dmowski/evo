import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import { DiagramEngine, NodeModel, PortWidget } from "@projectstorm/react-diagrams";
import {
  DeleteNodeButton,
  GraphNode,
  GraphNodeErrorMessage,
  GraphNodeHeader,
  NodeViews,
  Port,
} from "./style";

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
  type: string;
  name: string;
  content: string;
  isIn: boolean;
  isSelected: boolean;
}

export const CustomNodeWidget = ({
  engine,
  node,
  type,
  name,
  isIn,
  isSelected,
  content,
}: CustomNodeWidgetProps) => {
  const [nameValue, setName] = React.useState(name);
  const [errorName, setErrorName] = React.useState("");
  const setNewNodeName = (name: string) => {
    const newNameResultError = node.setNewNodeName(name);
    if (newNameResultError) {
      setErrorName(newNameResultError);
    } else {
      setErrorName("");
    }
    setName(name);
  };
  const setNewNodeContent = (nodeContent: string) => {
    node.setNewNodeContent(nodeContent);
  };

  const activeColor = isIn ? "#FF7A00" : "#1A1A4E";
  return (
    <GraphNode
      activeColor={activeColor}
      isError={!!errorName}
      className={isSelected ? "is-selected" : ""}
    >
      <GraphNodeHeader activeColor={activeColor}>
        <p>{type}</p>
        <input value={nameValue} onChange={(e) => setNewNodeName(e.target.value)} />
      </GraphNodeHeader>
      {errorName && <GraphNodeErrorMessage>Error with name: {errorName}</GraphNodeErrorMessage>}

      <textarea
        defaultValue={content}
        placeholder="Node content"
        onChange={(e) => setNewNodeContent(e.target.value)}
      ></textarea>
      <PortWidget
        style={{
          top: "-10px",
          left: 120,
          position: "absolute",
        }}
        port={node.getPort(isIn ? "skill" : "intent")}
        engine={engine}
      >
        <Port />
      </PortWidget>
      <DeleteNodeButton
        style={{}}
        onClick={() => {
          const confirmResult = confirm("Delete this element?");
          if (!confirmResult) {
            return;
          }
          engine
            .getModel()
            .getSelectedEntities()
            .forEach((item) => {
              if (item instanceof NodeModel) {
                engine.getModel().removeNode(item);
                engine.repaintCanvas();
              }
            });
        }}
      >
        x
      </DeleteNodeButton>
      <NodeViews>111</NodeViews>
    </GraphNode>
  );
};

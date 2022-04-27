import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import {
  DiagramEngine,
  NodeModel,
  PortWidget,
} from "@projectstorm/react-diagrams";
import { DeleteNodeButton, GraphNode, NodeViews, Port } from "./style";

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
  type: string;
  name: string;
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
}: CustomNodeWidgetProps) => {
  const activeColor = isIn ? "#FF7A00" : "#1A1A4E";
  return (
    <GraphNode
      activeColor={activeColor}
      className={`custom-node ${isSelected ? "is-selected" : ""}`}
    >
      <p>{type}</p>
      <textarea defaultValue="hello"></textarea>
      <PortWidget
        style={{
          top: "-10px",
          left: 120,
          position: "absolute",
        }}
        port={node.getPort(isIn ? "in" : "out")}
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
        🗑
      </DeleteNodeButton>
      <NodeViews>9</NodeViews>
    </GraphNode>
  );
};

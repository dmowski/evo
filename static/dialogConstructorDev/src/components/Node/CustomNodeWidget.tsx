import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import {
  DiagramEngine,
  NodeModel,
  PortWidget,
} from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
  type: string;
  name: string;
  isIn: boolean;
  isSelected: boolean;
}

export const Port = styled.div`
  width: 16px;
  height: 16px;
  z-index: 10;
  background: rgba(0, 20, 0, 0.5);
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 1);
  }
`;

export const GraphNode = styled.div<{ activeColor: string }>(
  ({ activeColor }) => ({
    position: "relative",
    minWidth: "250px",
    minHeight: "140px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    ">p": {
      backgroundColor: activeColor,
      color: "white",
      width: "100%",
      padding: "5px",
      boxSizing: "border-box",
    },
    fontFamily: "sans-serif",
    textarea: {
      width: "100%",
      height: "100%",
      border: "none",
      padding: "5px",
      resize: "none",
      fontFamily: "sans-serif",
      boxSizing: "border-box",
      ":focus": {
        boxShadow: `0 0 3px ${activeColor}`,
        outline: "none",
      },
    },
    "&.is-selected": {
      boxShadow: `0 0 10px ${activeColor}`,
    },
  })
);

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
      <div
        style={{
          bottom: "-20px",
          left: "-20px",
          position: "absolute",
          cursor: "pointer",
          padding: "3px",
          border: "1px solid #c3c3c3",
          width: "15px",
          height: "20px",
          backgroundColor: "white",
        }}
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
      </div>

      <div
        style={{
          bottom: "-10px",
          right: "-10px",
          position: "absolute",
          cursor: "pointer",
          padding: "3px",
          border: "1px solid #c3c3c3",
          width: "20px",
          height: "20px",
          borderRadius: "40px",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        9
      </div>
    </GraphNode>
  );
};

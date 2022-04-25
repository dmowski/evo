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

export const CustomNodeWidget = ({
  engine,
  node,
  type,
  name,
  isIn,
}: CustomNodeWidgetProps) => {
  return (
    <div
      className={"custom-node"}
      style={{
        position: "relative",
        minWidth: "250px",
        minHeight: "140px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        gap: "6px",
      }}
    >
      <p
        style={{
          borderBottom: "1px solid #d7d7d7",
          width: "100%",
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <b>Type:</b> {type}
      </p>
      <textarea
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          padding: "5px",
          resize: "none",
          boxSizing: "border-box",
        }}
      >
        Hello
      </textarea>
      <PortWidget
        style={{
          top: "6px",
          left: -16,
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
    </div>
  );
};

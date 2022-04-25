import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
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
        width: "200px",
        height: "100px",
      }}
    >
      <textarea style={{ width: "80%", height: "80%", border: "none" }}>
        Hello
      </textarea>
      <PortWidget
        style={{
          top: 100 / 2 - 8,
          left: -8,
          position: "absolute",
        }}
        port={node.getPort(isIn ? "in" : "out")}
        engine={engine}
      >
        <Port />
      </PortWidget>
    </div>
  );
};

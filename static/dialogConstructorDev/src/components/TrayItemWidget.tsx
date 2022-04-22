import * as React from "react";
import styled from "@emotion/styled";

export interface TrayItemWidgetProps {
  model: any;
  color?: string;
  name: string;
}

const Tray = styled.div<{ color: string }>(({ color }) => ({
  color: "white",
  fontFamily: "Helvetica, Arial",
  padding: "5px",
  margin: "0px 10px",
  border: `solid 1px ${color}`,
  borderRadius: "5px",
  marginBottom: "2px",
  cursor: "pointer",
}));

export const TrayItemWidget = ({ color, model, name }: TrayItemWidgetProps) => {
  return (
    <Tray
      color={color}
      draggable={true}
      onDragStart={(event) => {
        event.dataTransfer.setData("storm-diagram-node", JSON.stringify(model));
      }}
      className="tray-item"
    >
      {name}
    </Tray>
  );
};

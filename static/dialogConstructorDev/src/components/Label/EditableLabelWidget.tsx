import * as React from "react";
import styled from "@emotion/styled";

import { EditableLabelModel } from "./EditableLabelModel";

export interface FlowAliasLabelWidgetProps {
  model: EditableLabelModel;
}

const DeleteButton = styled.button({
  width: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "20px",

  color: "black",
  cursor: "pointer",
  userSelect: "none",
  pointerEvents: "auto",
  border: "1px solid rgba(0, 0, 0, 1)",
  background: "rgba(255, 255, 255, 0.9)",
  "&:hover": {
    color: "white",
    background: "rgba(222, 44, 44, 1)",
  },
});

export const EditableLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
  const onDeleteClick = () => {
    const deleteIcon = confirm("Удалить линию?");
    if (deleteIcon) {
      props.model.parent.remove();
      props.engine.repaintCanvas();
    }
  };
  return (
    <DeleteButton onClick={onDeleteClick} style={{ cursor: "pointer" }}>
      X
    </DeleteButton>
  );
};

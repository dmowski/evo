import * as React from "react";
import styled from "@emotion/styled";

import { EditableLabelModel } from "./EditableLabelModel";

export interface FlowAliasLabelWidgetProps {
  model: EditableLabelModel;
}

const DeleteButton = styled.button({
  width: "30px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30px",

  background: "rgba(0, 20, 0, 0.05)",
  color: "black",
  cursor: "pointer",
  userSelect: "none",
  pointerEvents: "auto",
  borderRadius: "100%",
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

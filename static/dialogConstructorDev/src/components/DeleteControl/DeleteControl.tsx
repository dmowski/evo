import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DeleteControlButton } from "./style";
import { confirmChangesDialog } from "../../utils/confirmChangesDialog";

export interface DeleteControlProps {
  onClick: () => any;
}

export const DeleteControl = ({ onClick }: DeleteControlProps) => {
  const clickHandler = async () => {
    const confirmResult = await confirmChangesDialog(
      "Удалить диалог?",
      "Вы действительно хотите это сделать? Все данные диалога будут удалены"
    );
    if (confirmResult) {
      onClick();
    }
  };

  return (
    <DeleteControlButton onClick={clickHandler}>
      <i className="fa-solid fa-trash"></i>
    </DeleteControlButton>
  );
};

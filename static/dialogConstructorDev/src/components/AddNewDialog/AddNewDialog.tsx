import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";

import { confirmAlert } from "react-confirm-alert";
import { HeaderButton } from "../style";
import { confirmChangesDialog } from "../../utils/confirmChangesDialog";

export interface AddNewDialogProps {
  onClick: () => any;
  showConfirm: boolean;
}

export const AddNewDialog = ({ onClick, showConfirm }: AddNewDialogProps) => {
  const clickHandler = async () => {
    if (!showConfirm) {
      onClick();
      return;
    }
    const confirmResult = await confirmChangesDialog(
      "Создать новый диалог?",
      "Несохраненные данные будут удалены"
    );
    if (confirmResult) {
      onClick();
    }
  };

  return (
    <HeaderButton onClick={clickHandler}>
      <i class="fa-solid fa-plus"></i>
      Создать
    </HeaderButton>
  );
};

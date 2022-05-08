import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { HeaderButton } from "../style";
import { confirmChangesDialog } from "../../utils/confirmChangesDialog";

export interface SaveDialogProps {
  onClick: () => any;
}

export const SaveDialog = ({ onClick }: SaveDialogProps) => {
  const clickHandler = async () => {
    const confirmResult = await confirmChangesDialog(
      "Сохранить диалог?",
      "Данные будут отправлены на сервер"
    );
    if (confirmResult) {
      onClick();
    }
  };

  return <HeaderButton onClick={clickHandler}>Сохранить</HeaderButton>;
};

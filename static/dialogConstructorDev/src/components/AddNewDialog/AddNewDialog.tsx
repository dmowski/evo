import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";

import { confirmAlert } from "react-confirm-alert";
import { HeaderButton } from "../style";

export interface AddNewDialogProps {
  onClick: () => Promise<void>;
  showConfirm: boolean;
}

export const AddNewDialog = ({ onClick, showConfirm }: AddNewDialogProps) => {
  return (
    <HeaderButton
      onClick={() => {
        if (showConfirm) {
          confirmAlert({
            title: "Создать новый диалог?",
            message: "Несохраненные данные будут удалены",
            buttons: [
              {
                label: "Да",
                onClick: onClick,
              },
              {
                label: "Нет",
                onClick: () => {},
              },
            ],
          });
        } else {
          onClick();
        }
      }}
    >
      Добавить новый диалог
    </HeaderButton>
  );
};

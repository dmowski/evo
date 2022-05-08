import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";

import { confirmAlert } from "react-confirm-alert";
import { HeaderButton } from "../style";

export interface AddNewDialogProps {
  onAdd: () => Promise<void>;
  showConfirm: boolean;
}

export const AddNewDialog = ({ onAdd, showConfirm }: AddNewDialogProps) => {
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
                onClick: onAdd,
              },
              {
                label: "Нет",
                onClick: () => {},
              },
            ],
          });
        } else {
          onAdd();
        }
      }}
    >
      Добавить новый диалог
    </HeaderButton>
  );
};

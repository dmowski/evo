import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DeleteControlButton } from "./style";
import { confirmAlert } from "react-confirm-alert";

export interface DeleteControlProps {
  onDelete: () => Promise<void>;
}

export const DeleteControl = ({ onDelete }: DeleteControlProps) => {
  return (
    <DeleteControlButton
      onClick={() => {
        confirmAlert({
          title: "Удалить диалог?",
          message: "Вы действительно хотите это сделать? Все данные диалога будут удалены",
          buttons: [
            {
              label: "Да",
              onClick: onDelete,
            },
            {
              label: "Нет",
              onClick: () => {},
            },
          ],
        });
      }}
    >
      <i className="fa-solid fa-trash"></i>
    </DeleteControlButton>
  );
};

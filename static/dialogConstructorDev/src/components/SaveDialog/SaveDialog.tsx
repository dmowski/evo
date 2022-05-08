import * as React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";

import { confirmAlert } from "react-confirm-alert";
import { HeaderButton } from "../style";

export interface SaveDialogProps {
  onClick: () => Promise<void>;
}

export const SaveDialog = ({ onClick }: SaveDialogProps) => {
  return (
    <HeaderButton
      onClick={() => {
        confirmAlert({
          title: "Сохранить диалог?",
          message: "Данные будут отправлены на сервер",
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
      }}
    >
      Сохранить диалог
    </HeaderButton>
  );
};

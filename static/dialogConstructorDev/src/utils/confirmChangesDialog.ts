import { confirmAlert } from "react-confirm-alert";

export const confirmChangesDialog = (title: string, message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    confirmAlert({
      title,
      message,
      closeOnClickOutside: false,
      closeOnEscape: false,
      buttons: [
        {
          label: "Да",
          onClick: () => {
            resolve(true);
          },
        },
        {
          label: "Нет",
          onClick: () => {
            resolve(false);
          },
        },
      ],
    });
  });
};

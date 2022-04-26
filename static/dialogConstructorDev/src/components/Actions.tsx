import * as React from "react";
import {
  Action,
  ActionEvent,
  InputType,
} from "@projectstorm/react-canvas-core";

export interface CustomActionOptions {
  keyCodes?: number[];
}

export class CustomItemsAction extends Action {
  constructor(options: CustomActionOptions = {}) {
    options = {
      keyCodes: [46, 8],
      ...options,
    };
    super({
      type: InputType.KEY_DOWN,
      fire: (event: ActionEvent<React.KeyboardEvent>) => {
        if (options.keyCodes.indexOf(event.event.keyCode) !== -1) {
          console.log("Keypress: Custom delete handler2");

          /*
            const selectedEntities = this.engine.getModel().getSelectedEntities();
            if (selectedEntities.length > 0) {
              const confirm = window.confirm("Are you sure you want to delete?");
  
              if (confirm) {
                selectedEntities.forEach((model) => {
                  debugger;
                  if (!model.isLocked()) {
                    model.remove();
                  }
                });
                this.engine.repaintCanvas();
              }
            }
            */
        }
      },
    });
  }
}

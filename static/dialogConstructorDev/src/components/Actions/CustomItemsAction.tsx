import * as React from "react";
import { Action, ActionEvent, InputType } from "@projectstorm/react-canvas-core";
import { LinkModel, PointModel } from "@projectstorm/react-diagrams";

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
        if (event.event.target.tagName === "TEXTAREA") {
          return;
        }

        if (options.keyCodes.indexOf(event.event.keyCode) !== -1) {
          const selectedElements = this.engine
            .getModel()
            .getSelectedEntities()
            .filter((item) => {
              const isPoint = item instanceof PointModel;
              return isPoint;
            });

          if (selectedElements.length > 0) {
            selectedElements.forEach((model) => {
              model.remove();
            });
            this.engine.repaintCanvas();
          }
        }
      },
    });
  }
}

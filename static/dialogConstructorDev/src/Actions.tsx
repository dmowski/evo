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
          const selectedLinks = this.engine
            .getModel()
            .getSelectedEntities()
            .filter((item) => {
              const isLink = item instanceof LinkModel;
              const isPoint = item instanceof PointModel;
              return isLink || isPoint;
            })
            .map((item) => {
              const isPoint = item instanceof PointModel;
              if (isPoint) {
                return item.getParent();
              }
              return item;
            });

          if (selectedLinks.length > 0) {
            const confirm = window.confirm("Are you sure you want to delete?");
            if (confirm) {
              selectedLinks.forEach((model) => {
                model.remove();
              });
              this.engine.repaintCanvas();
            }
          }
        }
      },
    });
  }
}

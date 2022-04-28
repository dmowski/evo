import { CustomNodeWidget } from "./CustomNodeWidget";
import { CustomNodeModel } from "./CustomNodeModel";
import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class CustomNodeFactory extends AbstractReactFactory<
  CustomNodeModel,
  DiagramEngine
> {
  constructor() {
    super("custom");
  }

  generateReactWidget(event): JSX.Element {
    const { type, name, isIn, content } = event.model.options?.extras;
    const isSelected = this.engine
      .getModel()
      .getSelectedEntities()
      .find((selectedElement) => {
        return selectedElement.getID() == event.model.options.id;
      });
    return (
      <CustomNodeWidget
        type={type}
        isSelected={!!isSelected}
        name={name}
        isIn={isIn}
        content={content}
        engine={this.engine}
        node={event.model}
      />
    );
  }

  generateModel(event) {
    return new CustomNodeModel();
  }
}

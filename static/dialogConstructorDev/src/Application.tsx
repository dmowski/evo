import * as React from "react";
import createEngine, { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { CustomNodeFactory } from "./components/Node/CustomNodeFactory";
import { AdvancedLinkFactory } from "./components/Link/AdvancedLinkFactory";
import { CustomItemsAction } from "./components/Actions/CustomItemsAction";
import { EditableLabelFactory } from "./components/Label/EditableLabelFactory";

export class Application {
  public activeModel: DiagramModel;
  public diagramEngine: DiagramEngine;
  public nodeFactory: CustomNodeFactory;

  constructor() {
    this.diagramEngine = createEngine({
      registerDefaultDeleteItemsAction: false,
    });
    this.diagramEngine.getLabelFactories().registerFactory(new EditableLabelFactory());
    this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
    this.diagramEngine.getActionEventBus().registerAction(new CustomItemsAction());

    this.nodeFactory = new CustomNodeFactory();
    this.diagramEngine.getNodeFactories().registerFactory(this.nodeFactory);

    this.activeModel = new DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
  }
}

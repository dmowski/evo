import * as React from "react";
import createEngine, { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { CustomNodeFactory } from "./components/Node/CustomNodeFactory";
import { CustomItemsAction } from "./Actions";
import { AdvancedLinkFactory } from "./components/Link/AdvancedLinkFactory";

export class Application {
  public activeModel: DiagramModel;
  public diagramEngine: DiagramEngine;
  public nodeFactory: CustomNodeFactory;

  constructor() {
    this.diagramEngine = createEngine({
      registerDefaultDeleteItemsAction: false,
    });
    this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

    this.diagramEngine.getActionEventBus().registerAction(new CustomItemsAction());

    this.nodeFactory = new CustomNodeFactory();
    this.diagramEngine.getNodeFactories().registerFactory(this.nodeFactory);

    this.activeModel = new DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
  }
}

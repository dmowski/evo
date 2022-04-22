import createEngine, {
  DiagramModel,
  DiagramEngine,
} from "@projectstorm/react-diagrams";
import { AdvancedLinkFactory } from "./links";

export class Application {
  protected activeModel: DiagramModel;
  protected diagramEngine: DiagramEngine;

  constructor() {
    this.diagramEngine = createEngine();
    this.diagramEngine
      .getLinkFactories()
      .registerFactory(new AdvancedLinkFactory());
    this.newModel();
  }

  public newModel() {
    this.activeModel = new DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
  }

  public getActiveDiagram(): DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): DiagramEngine {
    return this.diagramEngine;
  }
}

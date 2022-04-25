import createEngine, {
  DiagramModel,
  DiagramEngine,
} from "@projectstorm/react-diagrams";
import { AdvancedLinkFactory } from "./LinksSettings";
import { CustomNodeFactory } from "./Node/CustomNodeFactory";
export class Application {
  public activeModel: DiagramModel;
  public diagramEngine: DiagramEngine;
  public nodeFactory: CustomNodeFactory;

  constructor() {
    this.diagramEngine = createEngine();
    this.diagramEngine
      .getLinkFactories()
      .registerFactory(new AdvancedLinkFactory());

    this.nodeFactory = new CustomNodeFactory();
    this.diagramEngine.getNodeFactories().registerFactory(this.nodeFactory);

    this.activeModel = new DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
  }
}

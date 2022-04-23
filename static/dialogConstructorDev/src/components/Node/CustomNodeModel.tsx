import { NodeModel, NodeModelGenerics } from "@projectstorm/react-diagrams";
import { AdvancedPortModel } from "../links";

export class CustomNodeModel extends NodeModel<NodeModelGenerics> {
  constructor(name: string, type: string, isIn: boolean) {
    super({
      type: "custom",
    });

    this.options.extras = {
      type,
      name,
      isIn,
    };
    if (isIn) {
      this.addPort(new AdvancedPortModel(true, "in", "in"));
    } else {
      this.addPort(new AdvancedPortModel(false, "out", "out"));
    }
  }
}

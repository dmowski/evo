import { LinkModel, LinkModelGenerics, NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { AdvancedPortModel } from "../LinksSettings";

export class CustomNodeModel extends NodeModel<NodeModelGenerics> {
  constructor(name: string, type: string, isIn: boolean, content: string) {
    super({
      type: "custom",
    });

    this.options.extras = {
      type,
      name,
      isIn,
      content
    };
    if (isIn) {
      this.addPort(new AdvancedPortModel(true, "in", "in"));
    } else {
      this.addPort(new AdvancedPortModel(false, "out", "out"));
    }
  }

  setNewNodeName(newName): string {
    const currentId = this.options.id;
    const currentType = this.options.extras.type;

    const allNodes = this.getParent().getModels();
    const keys = Object.keys(allNodes);

    const isCopy = keys.find((key) => {
      const node = allNodes[key];
      const isSameId = node.options.id === currentId;
      if (isSameId) {
        return;
      }

      const isSameName = node.options.extras.name == newName;
      const isSameType = node.options.extras.type == currentType;

      return isSameName && isSameType;
    });

    if (isCopy) {
      return "Node with the same name already exists";
    }

    this.options.extras.name = newName;
    return "";
  }
  setNewNodeContent(newSpeech:string) {
    this.options.extras.content = newSpeech;
  }
  getName(){
    return this.options.extras.name
  }
}

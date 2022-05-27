import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { AdvancedLinkModel } from "./AdvancedLinkModel";

export class AdvancedPortModel extends DefaultPortModel {
  createLinkModel(): AdvancedLinkModel | null {
    const isSkill = this.options.name === "skill";
    const colorSkill = "#ff7a00";
    const colorIntent = "#1A1A4E";

    return new AdvancedLinkModel(isSkill ? colorSkill : colorIntent);
  }
}

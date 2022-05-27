import { DiagramEngine } from "@projectstorm/react-diagrams";
import { EditableLabelModel } from "../components/Label/EditableLabelModel";

export const addLabelsToLines = (engine: DiagramEngine) => {
  const links = engine.getModel().getLinks();
  links
    .filter((link) => {
      const isEmptyLabel = link.getLabels().length === 0;
      return isEmptyLabel;
    })
    .forEach((link) => {
      link.addLabel(
        new EditableLabelModel({
          value: link.getID(),
        })
      );
    });

  engine.repaintCanvas();
};

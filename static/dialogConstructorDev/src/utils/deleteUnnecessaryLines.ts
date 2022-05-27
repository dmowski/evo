import { DiagramEngine } from "@projectstorm/react-diagrams";

export const deleteUnnecessaryLines = (engine: DiagramEngine) => {
  const links = engine.getModel().getLinks();
  const linksForDelete = links.filter((link) => {
    const targetPort = link.getTargetPort();
    const sourcePort = link.getTargetPort();
    return !targetPort || !sourcePort;
  });
  linksForDelete.forEach((link) => {
    engine.getModel().removeLink(link);
  });
  engine.repaintCanvas();
};

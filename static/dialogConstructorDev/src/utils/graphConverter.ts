import { DiagramModel, DiagramModelGenerics } from "@projectstorm/react-diagrams";
import { CustomNodeModel } from "../components/Node/CustomNodeModel";
import { Point } from "@projectstorm/geometry";
import { BackendGraphNode } from "../types/backend";
import { AdvancedLinkModel } from "../components/Link/AdvancedLinkModel";

export const toBackendFormat = (model: DiagramModel<DiagramModelGenerics>) => {
  const serializedData = model.serialize();
  const nodeData = Object.values(serializedData.layers[1].models);
  const arrowsData = Object.values(serializedData.layers[0].models);

  const names = nodeData.map((node) => {
    return { id: node.id, name: node.extras.name };
  });

  const momChild = arrowsData.map((arrow) => {
    return {
      mom: arrow.source,
      child: arrow.target,
      childName: names.find((name) => name.id === arrow.target)?.name,
    };
  });

  const graph = nodeData.map((node) => {
    return {
      node_type: node.extras.type,
      node_name: node.extras.name,
      node_content: node.extras.content,
      node_links: momChild.filter((item) => item.mom === node.id).map((item) => item.childName),
      node_views: node.extras.views,
      position_x: node.x,
      position_y: node.y,
    };
  });
  return graph;
};

export const fromBackendFormat = (backendNodes: BackendGraphNode[]) => {
  const intents = backendNodes.filter((backendNode) => backendNode.node_type === "intent");
  const skills = backendNodes.filter((backendNode) => backendNode.node_type === "skill");

  const allModels = [];
  const intentModels = intents.map((backendNode) => {
    const nodeModel = new CustomNodeModel(
      backendNode.node_name,
      backendNode.node_type,
      false,
      backendNode.node_content,
      backendNode.node_views
    );

    nodeModel.setPosition(new Point(backendNode.position_x, backendNode.position_y));
    allModels.push(nodeModel);
    return nodeModel;
  });

  const skillsModels = skills.map((backendNode) => {
    const nodeModel = new CustomNodeModel(
      backendNode.node_name,
      backendNode.node_type,
      true,
      backendNode.node_content,
      backendNode.node_views
    );

    nodeModel.setPosition(new Point(backendNode.position_x, backendNode.position_y));
    allModels.push(nodeModel);
    return nodeModel;
  });

  skills.map((skillBackendNode, index) => {
    skillBackendNode.node_links.map((nodeLink) => {
      const skillModel = skillsModels[index];
      intentModels
        .filter((node) => node.getName() === nodeLink)
        .forEach((intentModel) => {
          const color = "#ff7a00";
          const link = new AdvancedLinkModel(color);
          link.setSourcePort(skillModel.getPort("skill"));
          link.setTargetPort(intentModel.getPort("intent"));
          allModels.push(link);
        });
    });
  });

  intents.forEach((intentBackendNode, index) => {
    intentBackendNode.node_links.map((nodeLink) => {
      const intentModel = intentModels[index];

      skillsModels
        .filter((node) => node.getName() === nodeLink)
        .map((skillModel) => {
          const color = "#1A1A4E";
          const link = new AdvancedLinkModel(color);
          link.setSourcePort(intentModel.getPort("intent"));
          link.setTargetPort(skillModel.getPort("skill"));

          allModels.push(link);
        });
    });
  });
  return allModels;
};

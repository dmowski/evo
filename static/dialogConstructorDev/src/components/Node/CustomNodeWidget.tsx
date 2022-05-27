import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import { DiagramEngine, NodeModel, PortWidget } from "@projectstorm/react-diagrams";
import {
  DeleteNodeButton,
  GraphNode,
  GraphNodeErrorMessage,
  GraphNodeHeader,
  NodeViews,
  Port,
} from "./style";

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
  type: string;
  name: string;
  views: number;
  content: string;
  isIn: boolean;
  isSelected: boolean;
}

export const CustomNodeWidget = ({
  engine,
  node,
  type,
  name,
  views,
  isIn,
  isSelected,
  content,
}: CustomNodeWidgetProps) => {
  const [nameValue, setName] = React.useState(name);
  const [errorName, setErrorName] = React.useState("");
  const setNewNodeName = (name: string) => {
    const newNameResultError = node.setNewNodeName(name);
    if (newNameResultError) {
      setErrorName(newNameResultError);
    } else {
      setErrorName("");
    }
    setName(name);
  };
  const setNewNodeContent = (nodeContent: string) => {
    node.setNewNodeContent(nodeContent);
  };

  const deleteNodeHandler = () => {
    const confirmResult = confirm("Delete this element?");
    if (!confirmResult) {
      return;
    }
    engine
      .getModel()
      .getSelectedEntities()
      .forEach((item) => {
        if (item instanceof NodeModel) {
          engine.getModel().removeNode(item);
          const port = item.getPort(isIn ? "skill" : "intent");
          const links = engine.getModel().getLinks();
          const linksForDelete = links.filter(
            (link) => link.getTargetPort() === port || link.getSourcePort() === port
          );
          linksForDelete.forEach((link) => {
            engine.getModel().removeLink(link);
          });

          engine.repaintCanvas();
        }
      });
  };

  const activeColor = isIn ? "#FF7A00" : "#1A1A4E";
  const isShowViews = isIn ? false : true;
  return (
    <GraphNode
      activeColor={activeColor}
      isError={!!errorName}
      className={isSelected ? "is-selected" : ""}
    >
      <GraphNodeHeader activeColor={activeColor}>
        <p>{type}</p>
        <input value={nameValue} onChange={(e) => setNewNodeName(e.target.value)} />
      </GraphNodeHeader>
      {errorName && <GraphNodeErrorMessage>Error with name: {errorName}</GraphNodeErrorMessage>}

      <textarea
        defaultValue={content}
        placeholder="Node content"
        onChange={(e) => setNewNodeContent(e.target.value)}
      ></textarea>
      <PortWidget
        style={{
          width: "40px",
          height: "40px",
          top: "-41px",
          left: "100px",
          position: "absolute",
        }}
        port={node.getPort(isIn ? "skill" : "intent")}
        engine={engine}
      >
        <Port />
      </PortWidget>

      <DeleteNodeButton onClick={deleteNodeHandler}>x</DeleteNodeButton>
      {isShowViews && <NodeViews>{views}</NodeViews>}
    </GraphNode>
  );
};

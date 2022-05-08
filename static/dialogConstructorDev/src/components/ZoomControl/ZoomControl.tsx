import * as React from "react";
import { Application } from "../Application";
import { ZoomControlButton } from "./style";

export interface ZoomControlProps {
  app: Application;
}

export const ZoomControl = ({ app }: ZoomControlProps) => {
  const zoomAll = () => {
    const model = app.diagramEngine.getModel();
    const nodes = model.getNodes();
    app.diagramEngine.zoomToFitNodes({
      nodes: nodes,
    });
  };

  return (
    <ZoomControlButton onClick={zoomAll}>
      <i className="fa-solid fa-magnifying-glass"></i>
    </ZoomControlButton>
  );
};

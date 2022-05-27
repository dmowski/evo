import * as React from "react";
import { DefaultLinkModel } from "@projectstorm/react-diagrams";

export class AdvancedLinkModel extends DefaultLinkModel {
  constructor(color: string = "black") {
    super({
      type: "advanced",
      color: color,
      width: 2,
    });
  }
}

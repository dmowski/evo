import {
  DefaultPortModel,
  DefaultLinkFactory,
  DefaultLinkModel,
  DefaultLinkWidget,
} from "@projectstorm/react-diagrams";
import { LinkWidget, PointModel } from "@projectstorm/react-diagrams-core";
import React, { MouseEvent } from "react";

export class AdvancedLinkModel extends DefaultLinkModel {
  constructor(color: string = "black") {
    super({
      type: "advanced",
      color: color,
      width: 2,
    });
  }
}

export class AdvancedPortModel extends DefaultPortModel {
  createLinkModel(): AdvancedLinkModel | null {
    const isSkill = this.options.name === "skill";
    const colorSkill = "#ff7a00";
    const colorIntent = "#1A1A4E";

    return new AdvancedLinkModel(isSkill ? colorSkill : colorIntent);
  }
}

const CustomLinkArrowWidget = (props) => {
  const { point, previousPoint } = props;

  const angle =
    90 +
    (Math.atan2(
      point.getPosition().y - previousPoint.getPosition().y,
      point.getPosition().x - previousPoint.getPosition().x
    ) *
      180) /
      Math.PI;

  return (
    <g
      className="arrow"
      transform={"translate(" + point.getPosition().x + ", " + point.getPosition().y + ")"}
    >
      <g style={{ transform: "rotate(" + angle + "deg)", opacity: "0.5" }}>
        <g transform={"translate(0, -15)"}>
          <polygon
            points="0,10 8,30 -8,30"
            fill={props.color}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          />
        </g>
      </g>
    </g>
  );
};

export class AdvancedLinkWidget extends DefaultLinkWidget {
  generateArrow(point: PointModel, previousPoint: PointModel): JSX.Element {
    return (
      <CustomLinkArrowWidget
        key={point.getID()}
        point={point as any}
        previousPoint={previousPoint as any}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
      />
    );
  }

  render() {
    //ensure id is present for all points on the path
    var points = this.props.link.getPoints();
    var paths = [];
    this.refPaths = [];

    //draw the multiple anchors and complex line instead
    for (let j = 0; j < points.length - 1; j++) {
      paths.push(
        this.generateLink(
          LinkWidget.generateLinePath(points[j], points[j + 1]),
          {
            "data-linkid": this.props.link.getID(),
            "data-point": j,
            onMouseDown: (event: MouseEvent) => {
              this.addPointToLink(event, j + 1);
            },
          },
          j
        )
      );
    }

    //render the circles
    for (let i = 1; i < points.length - 1; i++) {
      paths.push(this.generatePoint(points[i]));
    }

    if (this.props.link.getTargetPort() !== null) {
      paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
    } else {
      paths.push(this.generatePoint(points[points.length - 1]));
    }

    return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
  }
}

export class AdvancedLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("advanced");
  }

  generateModel(): AdvancedLinkModel {
    return new AdvancedLinkModel();
  }

  generateReactWidget(event): JSX.Element {
    return <AdvancedLinkWidget link={event.model} diagramEngine={this.engine} />;
  }
}

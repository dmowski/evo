import React from "react";

export const CustomLinkArrowWidget = ({ point, previousPoint, color }) => {
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
            fill={color}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          />
        </g>
      </g>
    </g>
  );
};

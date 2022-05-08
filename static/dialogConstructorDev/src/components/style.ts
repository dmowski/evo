import React, { useState } from "react";
import * as _ from "lodash";

import styled from "@emotion/styled";

const graphToolbarBreakMedia = `@media screen and (max-width: 270px)`;

export const GraphToolbar = styled.div(() => ({
  display: "flex",
  justifyContent: "space-between",
  position: "absolute",
  width: "100%",
  bottom: "20px",
  padding: "min(20px, 1vw)",
  [graphToolbarBreakMedia]: {
    flexDirection: "column",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    padding: "0",
  },

  ">*": {
    height: "100%",
    width: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "16px",

    padding: "15px min(20px, 1vw)",
    borderRadius: "14px",
    border: "1px solid #EBEBEB",
    backgroundColor: "white",

    [graphToolbarBreakMedia]: {
      padding: "10px 10px",
      border: "none",
    },
  },
}));

export const DialogConstructorHeader = styled.div(() => ({
  display: "flex",
  borderRadius: "14px",
  gap: "16px",
  position: "absolute",
  left: "20px",
  top: "20px",
  select: {
    padding: "10px 15px",
    backgroundColor: "white",
    border: "1px solid #c2c2c2",
    borderRadius: "4px",
  },
}));

export const NodeControlPanel = styled.div({});
export const NodeControlElement = styled.div<{ color: string }>(({ color }) => ({
  padding: "5px 10px",
  border: `1px solid ${color}`,
  backgroundColor: color,
  fontFamily: "sans-serif",
  color: "white",
  cursor: "pointer",
}));

export const HeaderButton = styled.div({
  padding: "10px 15px",
  backgroundColor: "white",
  border: "1px solid #c2c2c2",
  borderRadius: "4px",
  cursor: "pointer",
});

export const GraphCanvas = styled.div<{
  color: string;
  background: string;
}>(({ color, background }) => ({
  height: `100%`,
  backgroundColor: `${background}`,
  backgroundSize: `50px 50px`,
  display: `flex`,
  "> *": {
    height: `100%`,
    minHeight: `100%`,
    width: `100%`,
  },
  backgroundImage: `linear-gradient(
      0deg,
      transparent 24%,
      ${color} 25%,
      ${color} 26%,
      transparent 27%,
      transparent 74%,
      ${color} 75%,
      ${color} 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      ${color} 25%,
      ${color} 26%,
      transparent 27%,
      transparent 74%,
      ${color} 75%,
      ${color} 76%,
      transparent 77%,
      transparent
    )`,
}));

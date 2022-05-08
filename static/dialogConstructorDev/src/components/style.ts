import React, { useState } from "react";

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

const graphHeaderBreakMedia = `@media screen and (max-width: 470px)`;
export const DialogConstructorHeader = styled.div(() => ({
  display: "flex",
  borderRadius: "14px",
  gap: "16px",
  position: "absolute",
  left: "min(20px, 1vw)",
  top: "min(20px, 1vw)",
  select: {
    padding: "10px 15px",
    backgroundColor: "white",
    border: "1px solid #c2c2c2",
    borderRadius: "4px",
  },
  [graphHeaderBreakMedia]: {
    flexDirection: "column",
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

export const GraphCanvas = styled.div(() => ({
  height: `100%`,
  backgroundColor: `rgb(233, 233, 233)`,
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
      rgb(222, 222, 222) 25%,
      rgb(222, 222, 222) 26%,
      transparent 27%,
      transparent 74%,
      rgb(222, 222, 222) 75%,
      rgb(222, 222, 222) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgb(222, 222, 222) 25%,
      rgb(222, 222, 222) 26%,
      transparent 27%,
      transparent 74%,
      rgb(222, 222, 222) 75%,
      rgb(222, 222, 222) 76%,
      transparent 77%,
      transparent
    )`,
}));

import React, { useState } from "react";
import * as _ from "lodash";

import styled from "@emotion/styled";

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

export const NodeControlElement = styled.div<{ color: string }>(({ color }) => ({
  padding: "5px 10px",
  border: `1px solid ${color}`,
  backgroundColor: color,
  fontFamily: "sans-serif",
  color: "white",
  cursor: "pointer",
}));

export const ZoomControlButton = styled.div<{ color: string }>(({ color }) => ({
  display: "flex",
  padding: "15px 20px 18px 20px",
  fontSize: "20px",
  fontFamily: "sans-serif",
  color: "#222",
  cursor: "pointer",
  height: "40px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
  backgroundColor: "white",
  border: "1px solid #EBEBEB",
  position: "absolute",
  left: "0",
  right: "0",
  bottom: "20px",
  margin: "auto",
  width: "200px",

  ":hover": {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
}));

export const AddDialogButton = styled.div({
  padding: "10px 15px",
  backgroundColor: "white",
  border: "1px solid #c2c2c2",
  borderRadius: "4px",
  cursor: "pointer",
});

export const NodeControlPanel = styled.div({
  display: "flex",
  borderRadius: "14px",
  backgroundColor: "white",
  gap: "16px",
  padding: "20px 25px",
  border: "1px solid #EBEBEB",
  position: "absolute",
  left: "20px",
  bottom: "20px",
});

export const DeleteControlButton = styled.div<{ color: string }>(({ color }) => ({
  display: "flex",
  padding: "15px 20px 18px 20px",
  fontSize: "20px",
  fontFamily: "sans-serif",
  color: "#222",
  cursor: "pointer",
  height: "40px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
  backgroundColor: "white",
  border: "1px solid #EBEBEB",
  position: "absolute",
  right: "20px",
  bottom: "20px",
  margin: "auto",
  width: "50px",

  ":hover": {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
}));

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

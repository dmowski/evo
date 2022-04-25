import React, { useState } from "react";
import * as _ from "lodash";

import styled from "@emotion/styled";

export const Tray = styled.div<{ color: string }>(({ color }) => ({
  padding: "5px 10px",
  border: `1px solid ${color}`,
  backgroundColor: color,
  fontFamily: "sans-serif",
  color: "white",
  cursor: "pointer",
}));

export const ZoomControllButton = styled.div<{ color: string }>(
  ({ color }) => ({
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
    position: "fixed",
    left: "0",
    right: "0",
    bottom: "20px",
    margin: "auto",
    width: "200px",

    ":hover": {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
  })
);

export const DeleteControllButton = styled.div<{ color: string }>(
  ({ color }) => ({
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
    position: "fixed",
    right: "20px",
    bottom: "20px",
    margin: "auto",
    width: "50px",

    ":hover": {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
  })
);

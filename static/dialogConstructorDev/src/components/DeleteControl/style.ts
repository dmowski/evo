import React, { useState } from "react";
import styled from "@emotion/styled";

export const DeleteControlButton = styled.button<{ color: string }>(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  height: "100%",
  padding: "25px 25px",
}));

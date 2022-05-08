import React, { useState } from "react";
import styled from "@emotion/styled";

export const ZoomControlButton = styled.button<{ color: string }>(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  padding: "25px 25px",
}));

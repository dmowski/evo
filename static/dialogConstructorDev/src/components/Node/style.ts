import styled from "@emotion/styled";

export const Port = styled.div({
  width: "100%",
  height: "100%",
  zIndex: "10",
  background: "rgba(0, 20, 0, 0)",

  cursor: "pointer",
  "&:hover:after": {
    background: "rgba(0, 0, 0, 1)",
    boxShadow: "inset 0 0 0 calc(var(--port-zoom-level-px)+1px) rgba(0, 20, 0, 0.9)",
  },
  "&:after": {
    position: "absolute",
    content: "''",
    display: "block",
    boxShadow: "inset 0 0 0 var(--port-zoom-level-px) rgba(0, 0, 0, 1)",
    width: `100%`,
    height: `100%`,
    left: "0",
    right: "0",
    zIndex: -2,
    transform: "scale(var(--port-zoom-level))",
    borderRadius: "100%",
    background: "rgba(255, 255, 255, 0.2)",
    bottom: 0,
    margin: "auto",
  },
});

export const GraphNode = styled.div<{ activeColor: string; isError: string }>(
  ({ activeColor, isError }) => ({
    position: "relative",
    minWidth: "250px",
    minHeight: "140px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    outline: isError ? `red solid 5px` : "",
    border: "solid 2px gray",
    borderRadius: "5px",
    width: "50px",
    height: "50px",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontFamily: "sans-serif",
    textarea: {
      width: "100%",
      height: "100%",
      border: "none",
      padding: "5px",
      resize: "none",
      fontFamily: "sans-serif",
      boxSizing: "border-box",
      ":focus": {
        outline: "none",
        boxShadow: `inset 0 0 0 1px black`,
      },
    },
    "&:hover": {
      boxShadow: `0 0 10px rgba(0,0,0,0.6)`,
    },
    "&.is-selected": {
      boxShadow: `0 0 10px ${activeColor}`,
    },
  })
);

export const GraphNodeErrorMessage = styled.p({
  color: "red",
  fontSize: "11px",
});

export const NodeViews = styled.div({
  bottom: "-10px",
  right: "-10px",
  position: "absolute",
  cursor: "pointer",
  padding: "5px",
  border: "1px solid #c3c3c3",
  width: "35px",
  height: "35px",
  borderRadius: "40px",
  backgroundColor: "white",
  textAlign: "center",
});

export const DeleteNodeButton = styled.div({
  bottom: "-20px",

  left: "-20px",
  text: "10px",
  position: "absolute",
  cursor: "pointer",

  width: "30px",
  height: "30px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background: "rgba(0, 20, 0, 0.05)",
  color: "black",
  userSelect: "none",
  pointerEvents: "auto",
  borderRadius: "100%",
  "&:hover": {
    color: "white",
    background: "rgba(222, 44, 44, 1)",
  },
});

export const GraphNodeHeader = styled.div<{ activeColor: string }>(({ activeColor }) => ({
  display: "flex",
  backgroundColor: activeColor,
  color: "white",
  width: "100%",
  height: "35px",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 0 0 5px ",
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "0 10px",
    color: "white",
    height: "100%",
    border: "none",
    outline: "none",
    width: "190px",
    "&:focus": {
      boxShadow: `inset 0 0 0 1px black`,
    },
  },
  p: {
    minWidth: "50px",
    textAlign: "center",
    paddingTop: "15px",
  },
}));

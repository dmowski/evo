import styled from "@emotion/styled";

export const Port = styled.div({
  width: "16px",
  height: "16px",
  zIndex: "10",
  background: "rgba(0, 20, 0, 0.5)",
  borderRadius: "8px",
  cursor: "pointer",
  "&:hover": {
    background: "rgba(0, 0, 0, 1)",
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
  padding: "3px",
  border: "1px solid #c3c3c3",
  width: "20px",
  height: "20px",
  borderRadius: "40px",
  backgroundColor: "white",
  textAlign: "center",
});

export const DeleteNodeButton = styled.div({
  bottom: "-20px",
  left: "-20px",
  position: "absolute",
  cursor: "pointer",
  padding: "3px",
  border: "1px solid #c3c3c3",
  width: "15px",
  height: "20px",
  backgroundColor: "white",
});

export const GraphNodeHeader = styled.div<{ activeColor: string }>(
  ({ activeColor }) => ({
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
      "&:focus": {
        boxShadow: `inset 0 0 0 1px black`,
      },
    },
  })
);

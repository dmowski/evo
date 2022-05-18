import styled from "@emotion/styled";

export const Port = styled.div({
  width: "47px",
  height: "40px",
  zIndex: "10",
  background: "rgba(0, 20, 0, 0)",
  boxShadow: "inset 0 0 6px rgba(0, 20, 0, 0.4)",
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
  bottom: "-10px",
  color: "red",
  left: "-10px",
  text: "10px",
  position: "absolute",
  cursor: "pointer",
  paddingLeft: "7px",
  paddingBottom: "10px",
  border: "1px solid #c3c3c3",
  width: "25px",
  borderRadius: "40px",
  height: "25px",
  backgroundColor: "white",
  "&:hover": {
    boxShadow: `inset 0 0 0 1px black`,
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

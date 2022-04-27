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

export const GraphNode = styled.div<{ activeColor: string }>(
  ({ activeColor }) => ({
    position: "relative",
    minWidth: "250px",
    minHeight: "140px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    ">p": {
      backgroundColor: activeColor,
      color: "white",
      width: "100%",
      padding: "5px",
      boxSizing: "border-box",
    },
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
        boxShadow: `0 0 3px ${activeColor}`,
        outline: "none",
      },
    },
    "&.is-selected": {
      boxShadow: `0 0 10px ${activeColor}`,
    },
  })
);

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

import React from "react";
import styled from "styled-components";
import { Button, Grid, Paper, Box } from "@material-ui/core";

const ClassItem = styled(Paper)((props) => ({
  //borderWidth: "0.1rem 0rem 0.1rem 0rem",
  borderRadius: "2rem",
  border: "2px solid #d3d7ec",
  boxShadow: "0px 3px 1px 3px #f3f3f8",
  padding: "2rem",
  textAlign: "center",

  [props.theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },

  // transition: theme.transitions.create(["border"], {
  //   duration: "0.2s",
  // }),
  "&:hover": {
    backgroundColor: "ghostwhite",
    cursor: "pointer",
  },
}));

const StyledStudentItem = styled(Paper)((props) => ({
  //borderWidth: "0.1rem 0rem 0.1rem 0rem",
  borderRadius: "1rem",
  border: "2px solid #d3d7ec",
  boxShadow: "0px 3px 1px 1px #f3f3f8",
  padding: "0.5rem",
  textAlign: "center",

  [props.theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },

  // transition: theme.transitions.create(["border"], {
  //   duration: "0.2s",
  // }),
  "&:hover": {
    backgroundColor: "ghostwhite",
    cursor: "pointer",
  },
}));

const StyledStudentText = styled(Box)((props) => ({
  fontFamily: "Montserrat",
  fontSize: "1.6rem",
  fontWeight: "600",
  color: "steelblue",
}));

const MyButton = styled(Button)((props) => ({
  margin: "1rem 0rem 1rem 0rem",
  borderRadius: "2rem",
  padding: "0.5rem 2rem 0.5rem 2rem",
  backgroundColor: "#43b3f8",
  color: "white",
  fontSize: "1.6rem",
  fontWeight: "500",
  fontFamily: "Montserrat",
  textTransform: "none",
}));

export function StyledButton(props) {
  return (
    <>
      <MyButton {...props}> {props.children} </MyButton>
    </>
  );
}

export function StyledClassItem(props) {
  return (
    <>
      <ClassItem variant="outlined" {...props}>
        {props.children}
      </ClassItem>
    </>
  );
}

export function StudentCell(props) {
  return (
    <>
      <StyledStudentItem variant="outlined" {...props}>
        <StyledStudentText>{props.children}</StyledStudentText>
      </StyledStudentItem>
    </>
  );
}

export function LineBreak() {
  return <Grid item xs={12} style={{ height: "2rem" }} />;
}

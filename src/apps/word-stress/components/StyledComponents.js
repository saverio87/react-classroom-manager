import React from "react";
import styled from "styled-components";
import { Grid, Paper, Box } from "@material-ui/core";

const MyStyledPaper = styled(Paper)((props) => ({
  //borderWidth: "0.1rem 0rem 0.1rem 0rem",
  borderRadius: "0.5rem",
  //border: "2px solid steelblue",
  boxShadow: "0px 0px 3px 0px steelblue",
  padding: "2rem",
  textAlign: "center",

  [props.theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },

  // transition: theme.transitions.create(["border"], {
  //   duration: "0.2s",
  // }),
  "&:hover": {
    backgroundColor: "whitesmoke",
    cursor: "pointer",
  },
}));

const MyStyledPaperText = styled(Box)((props) => ({
  fontFamily: "Montserrat",
  fontSize: "2rem",
  fontWeight: "700",
  color: "steelblue",

  [props.theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

export function StyledPaper(props) {
  return (
    <>
      <MyStyledPaper variant="outlined" {...props}>
        {props.children}
      </MyStyledPaper>
    </>
  );
}

export function LineBreak() {
  return <Grid item xs={12} style={{ height: "2rem" }} />;
}

export function StyledPaperText(props) {
  return (
    <>
      <MyStyledPaperText>{props.children}</MyStyledPaperText>
    </>
  );
}

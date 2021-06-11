import React from "react";
import styled from "styled-components";
import { Button, Grid, Paper, Box, IconButton } from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogContent";

import CloseIcon from "@material-ui/icons/Close";

const StyledDialogHeader = styled(MuiDialogTitle)((props) => ({
  borderRadius: "2rem 2rem 0rem 0rem",
  backgroundColor: "#7a6eaa",
  border: "3px solid whitesmoke",
  padding: "2rem 2rem 2rem 2rem",
  textAlign: "center",

  "& .title": {
    fontSize: "2.5rem",
    color: "white",
    fontWeight: "800",
    fontFamily: "Montserrat",
  },
  "& .icon": {
    fontSize: "7rem",
    color: "white",
  },
}));

const StyledDialogClose = styled(IconButton)((props) => ({
  position: "absolute",
  left: "1rem",
  top: "1rem",
  color: "violet",
}));

const StyledDialogContent = styled(MuiDialogContent)((props) => ({
  padding: "2rem",
  backgroundColor: "whitesmoke",
  textAlign: "center",
  borderRadius: "0rem 0rem 2rem 2rem",
  "& .main": {
    fontSize: "2rem",
    color: "#29175f",
    fontWeight: "800",
    fontFamily: "Montserrat",
  },
}));

const ClassroomItem = styled(Paper)((props) => ({
  //borderWidth: "0.1rem 0rem 0.1rem 0rem",
  height: "100%",

  backgroundColor: "whitesmoke",
  borderRadius: "2rem",
  border: "2px solid #7a6eaa",
  boxShadow: "0px 3px 1px 3px #f3f3f8",
  padding: "0rem 1.5rem 0rem 1.5rem",
  textAlign: "center",
  //#d3d7ec
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

  "& > h2": {
    backgroundColor: "white",
    fontFamily: "Montserrat",
    fontSize: "2rem",
    fontWeight: "900",
    color: "#29175f",
    border: "2px solid #7a6eaa",
    padding: "0.3rem 0rem 0.3rem 0rem",
    borderRadius: "1rem",
    //#d3d7ec
  },

  "& > h3": {
    fontFamily: "Montserrat",
    textTransform: "uppercase",
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#7a6eaa",
    lineHeight: "1rem",
  },

  "& > h4": {
    fontFamily: "Montserrat",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "darkgrey",
  },
}));

const StyledNoteItem = styled(Paper)((props) => ({
  backgroundColor: "white",
  height: "100%",
  border: "1px solid #7a6eaa",
  padding: "0rem",

  transition: "transform 0.1s ease-in-out",
  "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },

  "& > h1": {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 800,
    color: "#7a6eaa",
    fontSize: "3rem",
  },

  "& span": {
    fontFamily: "Montserrat",
    fontSize: "1.3rem",
    fontWeight: 500,
    color: "#7a6eaa",
  },
}));

const StyledNoteItemHeader = styled(Grid)((props) => ({
  backgroundColor: "#d3d7ec",
  padding: "1rem",

  "& .date, .icon": {
    fontFamily: "Montserrat",
    fontWeight: 700,
    color: "#7a6eaa",
    fontSize: "1.2rem",
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
  color: "#7a6eaa",
}));

const MyButton = styled(Button)((props) => ({
  margin: "1rem 0rem 1rem 0rem",
  borderRadius: "2rem",
  padding: "0.5rem 2rem 0.5rem 2rem",
  backgroundColor: "#7a6eaa",
  color: "white",
  fontSize: "1.6rem",
  fontWeight: "500",
  fontFamily: "Montserrat",
  textTransform: "none",
}));

export function DialogClose(props) {
  return (
    <>
      <StyledDialogClose {...props}>
        <CloseIcon style={{ fontSize: "2rem" }} />
        {/* {props.children} */}
      </StyledDialogClose>
    </>
  );
}

export function DialogHeader(props) {
  return (
    <>
      <StyledDialogHeader variant="outlined" {...props}>
        {props.children}
      </StyledDialogHeader>
    </>
  );
}

export function DialogContent(props) {
  return (
    <>
      <StyledDialogContent variant="outlined" {...props}>
        {props.children}
      </StyledDialogContent>
    </>
  );
}

export function NoteItem(props) {
  return (
    <>
      <StyledNoteItem variant="outlined" {...props}>
        {props.children}
      </StyledNoteItem>
    </>
  );
}

export function NoteItemHeader(props) {
  return (
    <>
      <StyledNoteItemHeader {...props}>{props.children}</StyledNoteItemHeader>
    </>
  );
}

export function StyledButton(props) {
  return (
    <>
      <MyButton {...props}> {props.children} </MyButton>
    </>
  );
}

export function StyledClassroomItem(props) {
  return (
    <>
      <ClassroomItem variant="outlined" {...props}>
        {props.children}
      </ClassroomItem>
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

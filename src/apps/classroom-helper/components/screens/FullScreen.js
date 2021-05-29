import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

// Material icons
import FaceIcon from "@material-ui/icons/Face";
import TimerIcon from "@material-ui/icons/Timer";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CloseIcon from "@material-ui/icons/Close";

// Material UI core

import { Paper, Grid } from "@material-ui/core";
import { ClassroomHelperContext } from "../../context/helperContext";

import { Dialog, IconButton, Typography } from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogContentText from "@material-ui/core/DialogContentText";

// Timer

import CountdownTimer from "@sakit-sa/countdown-timer";

import { Group, SettingsRemoteRounded } from "@material-ui/icons";
import { LineBreak } from "../StyledComponents";
//import { LineBreak } from "../../word-stress/components/StyledComponents";

const useStyles = makeStyles((theme) => ({
  root: {},
  headerText: {
    fontSize: "2.5rem",
    color: "white",
    fontWeight: "800",
    fontFamily: "Inter",
  },
  backButton: {
    position: "absolute",
    right: "1rem",
    top: "1rem",
    color: theme.palette.grey[500],
  },
  body: {
    padding: "2rem",
    height: "auto",
  },

  // Groups screen

  groupItem: {
    paddingTop: "1rem",
    border: "0.5rem solid darkgreen",
    borderRadius: "2rem",
    padding: "0rem",
    fontSize: "1.8rem",
  },

  groupTitle: {
    fontSize: "1.8rem",
    color: "darkgreen",
    fontWeight: "800",
    fontFamily: "Montserrat",
  },
}));

export default function FullScreen(props) {
  const {
    //States
    studentGroups,
    loading,
    screenOpen,
    setScreenOpen,
    selectedClass,
    timer,
    setTimer,
    // Functionalities
    openScreen,
    closeScreen,
    groupStudents,
  } = useContext(ClassroomHelperContext);

  const classes = useStyles();

  function renderScreen() {
    // Destructuring the state object 'screenOpen'
    const { content } = screenOpen;

    switch (content) {
      case "groups":
        return groupsBody;
      case "timer":
        return timerBody;
      default:
        break;
    }
  }

  const groupsBody = (
    <div
      style={{
        backgroundColor: "green",
      }}
      className={classes.body}
    >
      <MuiDialogTitle className={classes.header} onClose={closeScreen}>
        <IconButton
          aria-label="close"
          className={classes.backButton}
          onClick={closeScreen}
        >
          <CloseIcon style={{ fontSize: "2rem" }} />
        </IconButton>
        <Typography align="center" className={classes.headerText}>
          <GroupIcon style={{ fontSize: "7rem" }} />
        </Typography>
      </MuiDialogTitle>
      <MuiDialogContent>
        <Grid container spacing={2} justify="center">
          {studentGroups &&
            studentGroups.map((group, key) => (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
                <Paper variant="outlined" className={classes.groupItem}>
                  <Typography align="center" className={classes.groupTitle}>
                    Group {key + 1}
                  </Typography>
                  <ul>
                    {group.map((student) => (
                      <li
                        style={{ lineHeight: "2.5rem", listStyleType: "none" }}
                      >
                        {" "}
                        <FaceIcon />
                        {"  "}
                        {student}
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Grid>
            ))}
        </Grid>
        <LineBreak />
      </MuiDialogContent>
    </div>
  );

  const timerBody = (
    <div
      style={{
        background: "linear-gradient(darkorange, orange)",
      }}
      className={classes.body}
    >
      <MuiDialogTitle className={classes.header} onClose={closeScreen}>
        <IconButton
          aria-label="close"
          className={classes.backButton}
          onClick={closeScreen}
        >
          <CloseIcon style={{ fontSize: "2rem" }} />
        </IconButton>
        <Typography align="center" className={classes.headerText}>
          <TimerIcon style={{ fontSize: "7rem" }} />
        </Typography>
      </MuiDialogTitle>
      <MuiDialogContent>
        <Grid
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: "24rem",
            color: "white",
          }}
          container
          spacing={2}
          justify="center"
        >
          <CountdownTimer
            time={timer}
            format="MM:SS"
            onComplete={function (e) {
              closeScreen();
              setTimer(0);
            }}
          />
        </Grid>
        <LineBreak />
        <LineBreak />
        <LineBreak />
      </MuiDialogContent>
    </div>
  );

  return (
    <Dialog fullScreen={true} onClose={closeScreen} open={screenOpen.isOpen}>
      {renderScreen()}
    </Dialog>
  );
}

import React, { useContext } from "react";
import { Hidden } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { ClassroomHelperContext } from "../context/helperContext";

import { makeStyles } from "@material-ui/core/styles";

// Dialog component
import ToolBarDialog from "./ToolBarDialog";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FullScreen from "./screens/FullScreen";

// Icons

import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FaceIcon from "@material-ui/icons/Face";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import TimerIcon from "@material-ui/icons/Timer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    bottom: "0",
  },

  icon: {
    fontSize: "3rem",
    color: "steelblue",
  },

  tabs: {
    borderTop: "1px solid lightgrey",
  },

  indicator: {
    backgroundColor: "steelblue",
  },

  tab: {
    padding: "1rem 0 1rem 0",
    fontFamily: "Montserrat",
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "#7a6eaa",

    transition: theme.transitions.create(["color"], {
      duration: "1s",
    }),
    "&:hover": {
      backgroundColor: "ghostwhite",
      fontWeight: "700",
    },
  },

  indicator: {
    backgroundColor: "steelblue",
    color: "steelblue",
  },
}));

export default function TabPanel() {
  const classes = useStyles();
  const {
    activeTab,
    setActiveTab,
    pickStudent,
    selectedClass,
    pickPair,
    openDialog,
    takeAttendance,
  } = useContext(ClassroomHelperContext);

  const { students } = selectedClass;

  return (
    <>
      <Paper
        square
        className={classes.root}
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        <Tabs
          classes={{ indicator: classes.indicator }}
          className={classes.tabs}
          variant="fullWidth"
          aria-label="icon label tabs example"
        >
          <Tab
            onClick={function (e) {
              if (activeTab !== "classroom") {
                setActiveTab("classroom");
              }
              takeAttendance(students);
            }}
            className={classes.tab}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <AssignmentIndIcon fontSize="large" />
                <Hidden mdDown>&nbsp;&nbsp;Attendance</Hidden>
              </div>
            }
          />
          <Tab
            onClick={function (e) {
              if (activeTab !== "classroom") {
                setActiveTab("classroom");
              }
              if (students.length < 1) {
                alert("Add some students first!");
                return;
              }
              pickStudent(students);
            }}
            className={classes.tab}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaceIcon fontSize="large" />
                <Hidden mdDown>&nbsp;&nbsp;Random picker</Hidden>
              </div>
            }
          />
          <Tab
            onClick={() => openDialog("grouping")}
            className={classes.tab}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <SupervisedUserCircleIcon fontSize="large" />
                <Hidden mdDown>&nbsp;&nbsp;Group students</Hidden>
              </div>
            }
          />

          <Tab
            onClick={() => openDialog("timer")}
            className={classes.tab}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <TimerIcon fontSize="large" />
                <Hidden mdDown>&nbsp;&nbsp;Timer</Hidden>
              </div>
            }
          />
          <Tab
            onClick={() => openDialog("task")}
            className={classes.tab}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <AssignmentIcon fontSize="large" />
                <Hidden mdDown>&nbsp;&nbsp;Tasks</Hidden>
              </div>
            }
          />
        </Tabs>
      </Paper>

      {/* Dialog and screen box - only renders when 'dialogOpen.isOpen' = true / 'screenOpen.isOpen' = true */}
      <ToolBarDialog />
      <FullScreen />
    </>
  );
}

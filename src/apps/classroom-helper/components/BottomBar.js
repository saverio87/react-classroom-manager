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
    color: "steelblue",

    transition: theme.transitions.create(["color"], {
      duration: "0.2s",
    }),
    "&:hover": {
      backgroundColor: "whitesmoke",
    },
  },

  indicator: {
    backgroundColor: "steelblue",
    color: "steelblue",
  },
}));

export default function TabPanel() {
  const classes = useStyles();
  const { pickStudent, selectedClass, pickPair, openDialog, takeAttendance } =
    useContext(ClassroomHelperContext);

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
            onClick={() => takeAttendance(students)}
            className={classes.tab}
            label="Attendance"
          />
          <Tab
            onClick={() => pickStudent(students)}
            className={classes.tab}
            label="Random"
          />
          <Tab
            onClick={() => openDialog("grouping")}
            className={classes.tab}
            label="Group students"
          />
          <Tab
            onClick={() => openDialog("timer")}
            className={classes.tab}
            label="Timer"
          />
          <Tab
            onClick={() => openDialog("task")}
            className={classes.tab}
            label="Task"
          />
        </Tabs>
      </Paper>

      {/* Dialog and screen box - only renders when 'dialogOpen.isOpen' = true / 'screenOpen.isOpen' = true */}
      <ToolBarDialog />
      <FullScreen />
    </>
  );
}

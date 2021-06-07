import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { ClassroomHelperContext } from "../context/helperContext";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    position: "relative",
  },

  tab: {
    fontFamily: "Montserrat",
    textTransform: "capitalize",
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#7a6eaa",
  },

  indicator: {
    backgroundColor: "#7a6eaa",
  },

  textColor: {
    color: "black",
  },
});

export default function TopTabs() {
  const classes = useStyles();

  const { activeTab, setActiveTab } = useContext(ClassroomHelperContext);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper square variant="outlined" className={classes.root}>
      <Tabs
        classes={{ indicator: classes.indicator }}
        value={activeTab}
        onChange={handleChange}
        indicatorColor="#d3d7ec"
      >
        <Tab value="classroom" className={classes.tab} label="Classroom" />
        <Tab value="groups" className={classes.tab} label="Groups" />
        <Tab value="notes" className={classes.tab} label="Teacher notes" />
      </Tabs>
    </Paper>
  );
}

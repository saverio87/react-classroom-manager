import React, { useEffect, useContext } from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import { ClassroomHelperContext } from "./context/helperContext";
import Loader from "react-loader-spinner";
import { StyledClassItem } from "./components/StyledComponents";
import TopBar from "./components/TopBar";
import TopTabs from "./components/TopTabs";
import BottomBar from "./components/BottomBar";
import { makeStyles } from "@material-ui/core/styles";

import { StudentList } from "./components/tabs/StudentList";
import { TeacherNotes } from "./components/tabs/TeacherNotes";
import { DisplayGroups } from "./components/tabs/DisplayGroups";

import { SubmitClass } from "./SubmitClass";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f7f8fe",
    width: "100vw",
  },
  stretch: {
    minHeight: "90vh",
    width: "100%",
  },
});

export const Main = () => {
  const classes = useStyles();
  const { allClasses, getClasses, activeTab, loading, selectedClass } =
    useContext(ClassroomHelperContext);

  const { name, students } = selectedClass;

  if (loading) {
    return (
      <Grid container justify="center" alignItems="center">
        <Loader type="ThreeDots" color="steelblue" height={120} width={120} />
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <TopBar
          nameOfClass={name && name}
          studentNumber={students && students.length}
        />
      </Grid>
      <Grid item xs={12}>
        <TopTabs />
      </Grid>
      <Grid item xs={12} className={classes.stretch}>
        {activeTab === "notes" && <TeacherNotes />}
        {activeTab === "classroom" && <StudentList />}
        {activeTab === "groups" && <DisplayGroups />}
      </Grid>

      <Grid item xs={12}>
        <BottomBar />
      </Grid>

      {/* <SubmitClass /> */}
    </Grid>
  );
};

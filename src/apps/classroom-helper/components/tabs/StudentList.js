import React, { useEffect, useContext } from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { ClassroomHelperContext } from "../../context/helperContext";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Loader from "react-loader-spinner";
import { LineBreak, StudentCell } from "../StyledComponents";
import { StyledButton } from "../StyledComponents";

// Styling

import classNames from "classnames";

const useStyles = makeStyles({
  root: {},

  addStudents: {
    width: "20rem",
  },
  addStudentsText: {
    fontWeight: "800",
    fontFamily: "Montserrat",
  },
  selected: {
    backgroundColor: "lightgreen",
  },

  absent: {
    opacity: "0.5",
  },

  promptdelete: {
    backgroundColor: "pink",
    transition: "transform 0.3s ease-in-out",
    transform: "scale3d(0.9, 0.9, 1)",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
});

export const StudentList = () => {
  const classes = useStyles();
  const {
    loading,
    openDialog,
    selectedClass,
    toggleAttendance,
    toggleAbsence,
  } = useContext(ClassroomHelperContext);

  const { students } = selectedClass;

  if (students.length === 0) {
    return (
      <Grid container justify="center" alignItems="center">
        <LineBreak />
        <Grid item xs={12}>
          <Typography align="center">
            <img
              className={classes.addStudents}
              src={process.env.PUBLIC_URL + "/boy.png"}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            style={{ fontSize: "2rem" }}
            className={classes.addStudentsText}
            align="center"
          >
            Add your students!
          </Typography>
          <Typography
            style={{ fontSize: "1.4rem", lineHeight: "1.6rem" }}
            className={classes.addStudentsText}
            align="center"
          >
            Engage students with instant feedback and start building your
            classroom community!
          </Typography>
          <Typography align="center">
            <StyledButton onClick={() => openDialog("add-students")}>
              Add students
            </StyledButton>
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <LineBreak />

        <Grid container spacing="2">
          {students &&
            students.map((student, key) => (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <StudentCell
                  onClick={() => {
                    toggleAttendance
                      ? toggleAbsence(students, key)
                      : console.log("nothing to see here");
                  }}
                  className={classNames(
                    student.selected && classes.selected,
                    toggleAttendance && classes.promptdelete,
                    student.absent && classes.absent
                  )}
                >
                  {student.name}
                </StudentCell>
              </Grid>
            ))}
        </Grid>
      </Container>
      <LineBreak />
      <LineBreak />
      <LineBreak />
    </div>
  );
};

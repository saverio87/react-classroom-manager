import React, { useEffect, useContext } from "react";
import { Container, Grid, Paper, Box, Typography } from "@material-ui/core";
import { ClassroomHelperContext } from "../../context/helperContext";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import { LineBreak, StudentCell } from "../StyledComponents";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {},

  date: {
    fontWeight: "700",
    fontSize: "1.3rem",
    color: "steelblue",
  },

  noteItem: {
    backgroundColor: "white",
    borderRadius: "2rem",
    border: "2px solid #43b3f8",
    padding: "1rem 3rem 1rem 3rem",
    fontSize: "1.3rem",
    fontFamily: "Montserrat",
    fontWeight: 500,
    color: "black",

    transition: "transform 0.1s ease-in-out",
    "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
  },
});

export const TeacherNotes = () => {
  const classes = useStyles();
  const {
    loading,
    selectedClass,
    openDialog,
    toggleAttendance,
    toggleAbsence,
    setAbsentStudents,
  } = useContext(ClassroomHelperContext);

  const { notes } = selectedClass;

  if (loading) {
    return (
      <Grid container justify="center" alignItems="center">
        <Loader type="ThreeDots" color="steelblue" height={120} width={120} />
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <LineBreak />
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              className={classes.noteItem}
              onClick={() => openDialog("add-note")}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography align="center">
                    <AddCircleOutlineIcon
                      style={{
                        fontSize: "3rem",
                        color: "steelblue",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    align="center"
                    style={{ fontSize: "2rem", color: "steelblue" }}
                  >
                    Add note
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {notes.map((note) => (
            <Grid item xs={12}>
              <Paper variant="outlined" className={classes.noteItem}>
                <Grid container spacing="1">
                  <Grid item xs={12}>
                    {note}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.date} align="left">
                      12/02/2018
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: "steelblue" }} align="right">
                      <DeleteIcon />
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <LineBreak />
    </div>
  );
};

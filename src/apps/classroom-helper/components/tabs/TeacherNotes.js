import React, { useEffect, useContext } from "react";
import { Container, Grid, Paper, Box, Typography } from "@material-ui/core";
import { ClassroomHelperContext } from "../../context/helperContext";
import { makeStyles } from "@material-ui/core/styles";
import { NoteItem, NoteItemHeader } from "../StyledComponents";
import Loader from "react-loader-spinner";
import { LineBreak, StudentCell } from "../StyledComponents";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {},

  date: {
    fontWeight: "700",
    fontSize: "1.3rem",
    color: "#7a6eaa",
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
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12}>
            <NoteItem onClick={() => openDialog("add-note")}>
              <h1>
                <AddCircleOutlineIcon
                  style={{
                    fontSize: "5rem",
                    color: "#7a6eaa",

                    verticalAlign: "middle",
                  }}
                />
              </h1>
            </NoteItem>
          </Grid>
        </Grid>

        <Grid container alignItems="stretch" spacing={2}>
          {notes.map((note) => (
            <Grid item xs={12} lg={4}>
              <NoteItem>
                <NoteItemHeader container>
                  <Grid item xs={6}>
                    <Typography align="left" className="date">
                      12/02/2018
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <DeleteIcon className="icon" />
                    </Typography>
                  </Grid>
                </NoteItemHeader>
                <Grid container style={{ padding: "1rem" }}>
                  <span>
                    {note.length > 150 ? `${note.slice(0, 150)} ...` : note}
                  </span>
                </Grid>
              </NoteItem>
            </Grid>
          ))}
          <LineBreak />
          <LineBreak />
        </Grid>
      </Container>
      <LineBreak />
    </div>
  );
};

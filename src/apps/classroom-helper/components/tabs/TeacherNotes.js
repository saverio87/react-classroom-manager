import React, { useState, useEffect, useContext } from "react";
import { getDateFromObject } from "../../utils/getDateFromObject";
import { Container, Grid, Paper, Box, Typography } from "@material-ui/core";
import { ClassroomHelperContext } from "../../context/helperContext";
import { makeStyles } from "@material-ui/core/styles";
import { NoteItem, NoteItemHeader } from "../StyledComponents";
import Loader from "react-loader-spinner";
import { LineBreak, StudentCell } from "../StyledComponents";

// Material icons

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

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
    deleteNote,
    toggleAttendance,
    toggleAbsence,
    setAbsentStudents,
  } = useContext(ClassroomHelperContext);

  const { notes } = selectedClass;
  // console.log(notes[0].date.toString());

  const [showNote, setShowNote] = useState({
    show: false,
    content: null,
  });

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
          {showNote.show ? (
            <Grid item xs={12}>
              <NoteItem onClick={() => console.log("ciao")}>
                <NoteItemHeader container>
                  <Grid item xs={9}>
                    <Typography align="left" className="date">
                      {getDateFromObject(showNote.content.date)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="right">
                      <CloseIcon
                        className="icon"
                        onClick={() =>
                          setShowNote({
                            ...showNote,
                            show: false,
                            content: null,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                </NoteItemHeader>
                <Grid container style={{ padding: "1rem" }}>
                  <span>{showNote.content.note}</span>
                </Grid>
              </NoteItem>
            </Grid>
          ) : (
            notes.map((note) => (
              <>
                <Grid item xs={12} lg={4}>
                  <NoteItem>
                    <NoteItemHeader container>
                      <Grid item xs={9}>
                        <Typography align="left" className="date">
                          {getDateFromObject(note.date)}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography align="right">
                          <DeleteIcon
                            className="icon"
                            onClick={() => deleteNote(selectedClass, note)}
                          />
                        </Typography>
                      </Grid>
                    </NoteItemHeader>
                    <Grid
                      onClick={() =>
                        setShowNote({ ...showNote, show: true, content: note })
                      }
                      container
                      style={{ padding: "1rem" }}
                    >
                      <span>
                        {note.note.length > 150
                          ? `${note.note.slice(0, 150)} ...`
                          : note.note}
                      </span>
                    </Grid>
                  </NoteItem>
                </Grid>
              </>
            ))
          )}
          <LineBreak />
          <LineBreak />
        </Grid>
      </Container>
      <LineBreak />
    </div>
  );
};

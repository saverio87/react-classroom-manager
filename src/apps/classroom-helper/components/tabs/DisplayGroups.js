import React, { useState, useEffect, useContext } from "react";
import { Container, Grid, Paper, Box, Typography } from "@material-ui/core";
import { ClassroomHelperContext } from "../../context/helperContext";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import { LineBreak, StudentCell } from "../StyledComponents";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles({
  root: {},

  date: {
    fontWeight: "700",
    fontSize: "1.3rem",
    color: "darkgrey",
  },

  groupName: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "steelblue",
    padding: "0.5rem 0rem 0.5rem 0rem",
  },

  student: {
    padding: "0.5rem",
    borderRadius: "1rem",
    border: "3px solid #43b3f8",
    fontSize: "1.1rem",
    fontWeight: "500",
  },

  noteItem: {
    backgroundColor: "white",
    borderRadius: "2rem",
    border: "2px solid #e2e4f2",
    padding: "1rem 3rem 1rem 3rem",
    fontSize: "1.3rem",
    fontFamily: "Montserrat",

    transition: "transform 0.1s ease-in-out",
    "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
  },
});

export const DisplayGroups = () => {
  const classes = useStyles();
  const { loading, selectedClass, studentGroups } = useContext(
    ClassroomHelperContext
  );

  const [groupColor, setGroupColor] = useState([]);

  function getRandomColor(groups) {
    let letters = "0123456789ABCDEF";

    let colors = [];

    for (let i = 0; i < groups.length; i++) {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }

    setGroupColor(colors);
    console.log(groupColor);
  }

  useEffect(() => {
    studentGroups && getRandomColor(studentGroups);
  }, []);

  if (loading) {
    return (
      <Grid container justify="center" alignItems="center">
        <Loader type="ThreeDots" color="steelblue" height={120} width={120} />
      </Grid>
    );
  }

  if (!studentGroups) {
    return (
      <Container maxWidth="lg">
        <LineBreak />
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Typography
              align="center"
              style={{
                fontSize: "3rem",
                fontFamily: "Montserrat",
                fontWeight: "800",
                color: "steelblue",
              }}
            >
              You haven't selected any groups yet
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={2}>
          {studentGroups &&
            studentGroups.map((group, key) => (
              <Grid item xs={12} md={3} lg={2}>
                <Typography align="center" className={classes.groupName}>
                  Group {key + 1}
                </Typography>
                <Grid container spacing="1">
                  {group.map((student, index) => (
                    <Grid item xs={12}>
                      <Paper
                        className={classes.student}
                        variant="outlined"
                        style={{ backgroundColor: "white" }}
                      >
                        {student}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Container>
      <LineBreak />
    </div>
  );
};
import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import ScrollableTabsButtonAuto from "./TabPanel";
import wordList from "./utils/wordList.json";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Paper } from "@material-ui/core";
import { StyledPaper, StyledPaperText } from "./components/StyledComponents";

const useStyles = makeStyles((theme) => ({
  root: {},

  word: {
    fontFamily: "Montserrat",
    fontSize: "8rem",
    color: "white",
    fontWeight: "800",
    textShadow: "0 0 5px darkblue",
  },

  wordOnHover: {
    transition: theme.transitions.create(["color", "font-size"], {
      duration: "0.2s",
    }),
    "&:hover": {
      color: "lightblue",
      fontSize: "9rem",
    },
  },

  paperText: {
    fontFamily: "Montserrat",
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "white",
    textShadow: "0 0 3px darkblue",
  },
}));

export const WordStress = () => {
  const classes = useStyles();

  // Initialize stateful array for words
  const [words, setWords] = useState();
  const [loading, setLoading] = useState(false);

  // Fetch words from database

  const wordList = firebase
    .firestore()
    .collection("apps")
    .doc("word-stress")
    .collection("words");

  const getWords = () => {
    setLoading(true);
    wordList.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setWords(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getWords();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ScrollableTabsButtonAuto />
      <Grid container>
        <Grid
          item
          xs={3}
          style={{
            padding: "2rem",
            borderRight: "1px solid black",
            overflowY: "hidden",
            height: "100vh",
          }}
        >
          <Grid container spacing={2} direction="column">
            {words &&
              words.map((item) => (
                <Grid item xs={12}>
                  <StyledPaper>
                    <StyledPaperText>{item.word}</StyledPaperText>
                  </StyledPaper>
                </Grid>
              ))}
          </Grid>
        </Grid>

        {/* Main section - word */}

        <Grid item xs={9} style={{ padding: "2rem" }}></Grid>
      </Grid>

      {/* {tenWords.map((word) => (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {word.word.map((syllable) => (
            <>
              <div className="large" style={{ padding: "2rem" }}>
                {syllable}
              </div>
            </>
          ))}
        </div>
      ))} */}
    </>
  );
};

// Interesting method to randomize selection. Sort the array and
// slice the first 10 items
// [...wordList.words].sort(() => 0.5 - Math.random()).slice(0, 10)

import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useSnackbar } from "notistack";

import {
  LineBreak,
  StyledPaper,
  StyledPaperText,
} from "./components/StyledComponents";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

// Forms, input, etc.
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: "2rem",
  },

  snackbar: {
    padding: "3rem",
    fontSize: "2rem",
  },

  inputText: {
    fontFamily: "Montserrat",
    fontSize: "4rem",
    color: "grey",
  },

  instructions: {
    fontFamily: "Montserrat",
    fontSize: "1.8rem",
    color: "darkblue",
  },

  syllable: {
    backgroundColor: "whitesmoke",
  },

  wordOnHover: {},

  paper: {
    //borderWidth: "0.1rem 0rem 0.1rem 0rem",
    borderRadius: "1rem",
    padding: "2rem",
    textAlign: "center",
  },

  paperTitle: {
    fontFamily: "Montserrat",
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "white",
    textShadow: "0 0 3px black",
  },

  paperText: {},
}));

export const SubmitWord = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [word, setWord] = useState("");

  // Initialize wordEntry object

  const initialState = {
    word: undefined,
    wordSplit: [],
    syllables: undefined,
    stressed: undefined,
  };

  const [wordEntry, setWordEntry] = useState(initialState);

  // Submit / Add word to database

  const wordList = firebase
    .firestore()
    .collection("apps")
    .doc("word-stress")
    .collection("words");

  const addWordEntry = (wordEntry) => {
    wordList
      .doc(wordEntry.id)
      .set(wordEntry)
      .then(() =>
        enqueueSnackbar("The word was successfully added to our database.", {
          variant: "success",
          classes: {
            root: classes.snackbar,
          },
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        })
      )
      .catch((err) => {
        enqueueSnackbar("An error has occurred. Please reload and try again.", {
          variant: "error",
        });
        console.error(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addWordEntry({ ...wordEntry });
    setWordEntry(initialState);
    setWord("");
  };

  //

  const onChange = (el) => {
    setWord(el.target.value);
  };

  const onWordSubmit = () => {
    const syllables = word.split("-");
    const fullWord = word.split("-").join("");

    // Only accept the input if it is a word with a minimum of two syllables

    syllables.length > 1
      ? setWordEntry({
          ...wordEntry,
          word: fullWord,
          wordSplit: syllables,
          syllables: syllables.length,
        })
      : setWordEntry(initialState);
  };

  const onSelectStress = (syllable, key) => {
    setWordEntry({
      ...wordEntry,
      stressed: key,
    });

    console.log(key);
  };

  const classes = useStyles();

  useEffect(() => {}, []);
  return (
    <>
      <Container className={classes.root} maxWidth="lg">
        <Paper className={classes.paper} variant="outlined">
          <StyledPaperText>Submit a new word</StyledPaperText>
          <LineBreak />

          <Grid container justify="center" alignItems="center">
            <Grid item lg={8}>
              <Typography>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.inputText,
                    },
                  }}
                  InputLabelProps={{ style: { fontSize: "2rem" } }}
                  id="syllables"
                  label=""
                  value={word}
                  variant="outlined"
                  onChange={(e) => onChange(e)}
                  helperText="Enter the word divided into syllables by hyphen"
                />
              </Typography>
            </Grid>
          </Grid>

          <LineBreak />

          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={onWordSubmit}
          >
            1. Select stress
          </Button>

          <LineBreak />

          {/* Only render if the word has been submitted (.length != 0) */}

          {!wordEntry.wordSplit.length ? (
            <Grid container />
          ) : (
            <>
              <Typography>
                <span className={classes.instructions}>
                  Now select the syllable where the word stress falls
                </span>
              </Typography>
              <LineBreak />
              <Grid container justify="center" alignItems="center" spacing={2}>
                {wordEntry.wordSplit.map((syllable, key) => (
                  <Grid item key={key}>
                    <StyledPaper
                      // Only apply this class if wordEntry.stressed's value
                      // is equal to the key of the item that was clicked (the
                      // array created with the .map method)
                      className={
                        wordEntry.stressed === key ? classes.syllable : ""
                      }
                      onClick={() => onSelectStress(syllable, key)}
                    >
                      <StyledPaperText>{syllable}</StyledPaperText>
                    </StyledPaper>
                  </Grid>
                ))}
              </Grid>

              <LineBreak />

              <Button
                onClick={(e) => onSubmit(e)}
                color="primary"
                size="large"
                variant="contained"
              >
                2. Submit word
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

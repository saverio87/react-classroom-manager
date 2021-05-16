import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import { Word } from "./Word";
import Loader from "react-loader-spinner";

import TabPanel from "./TabPanel";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { StyledPaper, StyledPaperText } from "./components/StyledComponents";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const WordGrid = () => {
  const [words, setWords] = useState();
  const [selectedWord, setSelectedWord] = useState();
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

  const selectWord = (word) => {
    setSelectedWord(word);
  };

  if (loading) {
    return (
      <Grid container justify="center" alignItems="center">
        <Loader type="ThreeDots" color="steelblue" height={120} width={120} />
      </Grid>
    );
  }

  return (
    <>
      {selectedWord ? (
        <Word word={selectedWord} goBack={() => selectWord()} />
      ) : (
        // the function 'selectWord' gets passed an empty
        // value and automatically triggers the rendering
        // of the main grid
        <>
          <TabPanel />
          <Grid
            container
            style={{ padding: "2rem", marginBottom: "5rem" }}
            spacing={2}
          >
            {words &&
              words.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <StyledPaper onClick={() => selectWord(item)}>
                    <StyledPaperText>{item.word}</StyledPaperText>
                  </StyledPaper>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </>
  );
};

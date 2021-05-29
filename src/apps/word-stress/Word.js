import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Speech from "react-speech";

import { StyledPaper, StyledPaperText } from "./components/StyledComponents";

const useStyles = makeStyles((theme) => ({
  word: {
    fontFamily: "Montserrat",
    fontSize: "8rem",
    color: "white",
    fontWeight: "800",
    textShadow: "0 0 5px black",
  },

  icon: {
    fontSize: "5rem",
    color: "steelblue",
    transition: theme.transitions.create(["color", "font-size"], {
      duration: "0.2s",
    }),
    "&:hover": {
      fontSize: "8rem",
    },
  },

  wordOnHover: {
    transition: theme.transitions.create(["color", "font-size"], {
      duration: "0.2s",
    }),
    "&:hover": {
      color: "lightsteelblue",
      fontSize: "9rem",
      cursor: "pointer",
    },
  },
}));

export const Word = ({ word, goBack }) => {
  const classes = useStyles();

  const isStressedSyllable = (syllable) => {};

  return (
    <>
      <Grid
        container
        style={{ height: "70vh" }}
        justify="center"
        alignItems="center"
      >
        {/* Container for syllables */}
        <Grid
          container
          spacing={5}
          className={classes.word}
          justify="center"
          alignItems="center"
        >
          {word &&
            word.wordSplit.map((syllable, index) => (
              <>
                <Grid
                  key={index}
                  className={classes.wordOnHover}
                  item
                  onClick={() =>
                    index === word.stressed
                      ? Swal.fire({
                          icon: "success",
                          title: `Correct! ${syllable.toUpperCase()} is the stressed syllable!`,
                          showConfirmButton: false,
                          timer: 1000,
                        }).then(goBack)
                      : Swal.fire({
                          icon: "error",
                          title: `<b>${syllable.toUpperCase()}</b> is not the stressed syllable`,
                          showConfirmButton: false,
                          timer: 1000,
                        })
                  }
                >
                  {syllable}
                </Grid>
              </>
            ))}
        </Grid>
      </Grid>
      <Grid
        container
        style={{ height: "30vh" }}
        justify="center"
        alignItems="center"
      >
        <Speech text={word.word} />
        <FontAwesomeIcon
          onClick={goBack}
          className={classes.icon}
          icon={faArrowCircleLeft}
        />
      </Grid>
    </>
  );
};

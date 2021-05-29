import React, { useState, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { ClassroomHelperContext } from "../context/helperContext";

import {
  Button,
  Box,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import CloseIcon from "@material-ui/icons/Close";
import { LineBreak } from "../../word-stress/components/StyledComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "2rem",
  },
  title: {
    margin: 0,
    borderRadius: "1rem",
    padding: "2rem 2rem 2rem 2rem",
    width: "40rem",
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: "600",
    fontFamily: "Montserrat",
  },
  button: {
    borderRadius: "2rem",
    padding: "0.3rem 2.5rem 0.3rem 2.5rem",
    backgroundColor: "#43b3f8",
    fontSize: "1.4rem",
    fontWeight: "600",
    fontFamily: "Montserrat",
    textTransform: "capitalize",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  formControl: {
    width: "100%",
    backgroundColor: "#f7f8fe",
  },
  section: {
    padding: "1rem 0rem 0rem 0rem",
  },
  header: {
    fontSize: "1.3rem",
    fontWeight: "400",
    paddingBottom: "0.5rem",
  },
}));

export default function StyledDialog(props) {
  const { dialogOpen, setDialogOpen } = useContext(ClassroomHelperContext);
  const classes = useStyles();

  const handleOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const body = (
    <>
      <MuiDialogTitle
        disableTypography
        className={classes.title}
        onClose={handleClose}
      >
        <Typography className={classes.titleText}>Create new class</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon style={{ fontSize: "2rem" }} />
        </IconButton>
      </MuiDialogTitle>

      <MuiDialogContent dividers>
        <Typography className={classes.section}>
          <Box className={classes.header}>Class name</Box>
          <Box>
            <TextField
              style={{ backgroundColor: "#f7f8fe" }}
              size="small"
              fullWidth
              id="outlined-basic"
              variant="outlined"
            />
          </Box>
        </Typography>

        <Typography className={classes.section}>
          <Box className={classes.header}>Grade</Box>
          <Box>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="grade">Grade</InputLabel>
              <Select
                labelId="grade"
                id="grade"
                // value={}
                // onChange={handleChange}
                label="Grade"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Typography>
        <LineBreak />
      </MuiDialogContent>
      <MuiDialogActions style={{ padding: "1.5rem 2rem 1.5rem 2rem" }}>
        <Button
          variant="contained"
          onClick={handleClose}
          color="primary"
          className={classes.button}
        >
          Create class
        </Button>
      </MuiDialogActions>
    </>
  );

  return (
    <Paper>
      <Dialog
        classes={{
          paper: classes.root,
        }}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        {body}
      </Dialog>
    </Paper>
  );
}

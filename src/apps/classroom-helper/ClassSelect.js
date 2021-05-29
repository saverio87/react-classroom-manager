import React, { useState, useEffect, useContext } from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import { ClassroomHelperContext } from "./context/helperContext";
import Loader from "react-loader-spinner";

// styled components and icons
import { StyledClassItem } from "./components/StyledComponents";
import StyledDialog from "./components/StyledDialog";
import ToolBarDialog from "./components/ToolBarDialog";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { Main } from "./Main";

export const ClassSelect = () => {
  const {
    allClasses,
    getClasses,
    loading,
    selectedClass,
    setSelectedClass,
    dialogOpen,
    setDialogOpen,
  } = useContext(ClassroomHelperContext);

  const handleOpen = (content) => {
    setDialogOpen({ ...dialogOpen, isOpen: true, content: content });
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    getClasses();
  }, []);

  if (loading) {
    return (
      <Grid container justify="center" alignItems="center">
        <Loader type="ThreeDots" color="steelblue" height={120} width={120} />
      </Grid>
    );
  }

  // If 'selectedClass' is empty (no classes have been selected), we render
  // the list of classes available for the teacher to choose from

  if (!loading && !selectedClass) {
    return (
      <div>
        <Container
          maxWidth="md"
          style={{
            minHeight: "100vh",
            paddingTop: "6rem",
          }}
        >
          <Grid container spacing={3}>
            {allClasses &&
              allClasses.map((item) => {
                const { name, students } = item;
                return (
                  <Grid item xs={12} lg={3} md={4}>
                    <StyledClassItem
                      onClick={() => setSelectedClass({ ...item })}
                    >
                      <h3>{name}</h3>
                      <h4>{students && students.length} students</h4>
                      <h5></h5>
                    </StyledClassItem>
                  </Grid>
                );
              })}
            <Grid item xs={12} lg={3} md={4}>
              <StyledClassItem>
                <AddCircleOutlineIcon
                  style={{ fontSize: "6rem", color: "#d3d7ec" }}
                  onClick={() => handleOpen("add-class")}
                />
              </StyledClassItem>
            </Grid>
          </Grid>
        </Container>

        {/* Dialog box - only renders when 'dialogOpen.isOpen' = true */}
        <ToolBarDialog />
        {/* End dialog box */}
      </div>
    );
  }

  return <Main classSelected={selectedClass} />;
};

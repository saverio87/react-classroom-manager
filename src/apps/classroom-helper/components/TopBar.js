import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Hidden } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const mainLinks = [
  {
    title: "Submit a word",
    link: "submit-word",
  },
  {
    title: "Word list",
    link: "main-list",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  appBar: {
    backgroundColor: "#43b3f8",
    //#395983 as an alternative
    color: "#f9fafd",
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  links: {
    flexGrow: 1,
  },
  linksContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  link: {
    color: "#f9fafd",
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: "1.5rem",
    textDecoration: "none",

    transition: theme.transitions.create(["color"], {
      duration: "0.2s",
    }),
    "&:hover": {
      color: "lightblue",
    },
  },
}));

export default function TopBar({ nameOfClass, studentNumber }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar variant="regular">
        <Typography
          style={{
            display: "flex",
            flexDirection: "row",
            //backgroundColor: "green",
          }}
          className={classes.title}
        >
          <Box textAlign="left">
            &nbsp;
            <span
              style={{
                color: "white",
                fontWeight: "700",
                fontFamily: "Montserrat",
                fontSize: "2.3rem",
                textDecoration: "none",
              }}
            >
              &lt; {nameOfClass}
            </span>
          </Box>

          <Box
            textAlign="left"
            style={{
              padding: "0rem 2rem 0rem 2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            &nbsp;
            <span
              style={{
                color: "white",
                fontWeight: "500",
                fontFamily: "Montserrat",
                fontSize: "1.2rem",
                textDecoration: "none",
              }}
            >
              {studentNumber} students
            </span>
          </Box>
        </Typography>
        <Hidden only={["sm", "xs"]}>
          <Typography className={classes.links}>
            <Grid container spacing={4} className={classes.linksContainer}>
              {mainLinks.map((link) => (
                <Grid item>
                  {/* <Link className={classes.link} to={``}>
                      {link.title}
                    </Link> */}
                </Grid>
              ))}
            </Grid>
          </Typography>
        </Hidden>

        <Hidden only={["xl", "lg", "md"]}>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              style={{}}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={open}
              onClose={handleClose}
            >
              {mainLinks.map((link) => (
                <MenuItem onClick={handleClose}>
                  {/* <Link
                      className={classes.link}
                      style={{ color: "grey" }}
                      to={``}
                    >
                      {link.title}
                    </Link> */}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

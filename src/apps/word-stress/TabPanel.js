import React from "react";
import { Hidden } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
} from "@fortawesome/free-solid-svg-icons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },

  icon: {
    fontSize: "3rem",
    color: "steelblue",
  },
});

export default function TabPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      square
      className={classes.root}
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
        style={{ boxShadow: "0px 0px 2px 1px steelblue" }}
      >
        <Tab
          value="2"
          icon={<FontAwesomeIcon className={classes.icon} icon={faDiceTwo} />}
          label={<Hidden only={["sm", "xs"]}>Two syllables</Hidden>}
        />
        <Tab
          value="3"
          icon={<FontAwesomeIcon className={classes.icon} icon={faDiceThree} />}
          label={<Hidden only={["sm", "xs"]}>Three syllables</Hidden>}
        />
        <Tab
          value="4"
          icon={<FontAwesomeIcon className={classes.icon} icon={faDiceFour} />}
          label={<Hidden only={["sm", "xs"]}>Four syllables</Hidden>}
        />
        <Tab
          value="5"
          icon={<FontAwesomeIcon className={classes.icon} icon={faDiceFive} />}
          label={<Hidden only={["sm", "xs"]}>Five syllables</Hidden>}
        />
      </Tabs>
    </Paper>
  );
}

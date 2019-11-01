import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Link from "./link";

const useStyles = makeStyles(theme => ({
  appBar: {
    boxShadow: "none"
  },
  toolbar: {},
  link: {}
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="relative" color="inherit">
      <Toolbar className={classes.toolbar}>
        <Link className={classes.link} href="/" underline="none">
          Tommy Lunde Barvåg
        </Link>
      </Toolbar>
    </AppBar>
  );
}

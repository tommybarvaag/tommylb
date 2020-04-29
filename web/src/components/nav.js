import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Container from "./container";
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
    <Container maxWidth="none">
      <Link className={classes.link} href="/" underline="none">
        <Typography variant="body2" color="textSecondary" align="center">
          Tommy Lunde Barvåg
        </Typography>
      </Link>
    </Container>
  );
}

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Copyright from "./copyright";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.footer} component="footer" maxWidth={false}>
      <Container maxWidth="md">
        <Copyright />
      </Container>
    </Container>
  );
}

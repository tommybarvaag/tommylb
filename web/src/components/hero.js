import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Container from "./container";

const useStyles = makeStyles(theme => ({
  hero: { width: "100%", margin: "0 auto" },
  title: {
    width: "100%",
    paddingTop: "80px",
    textAlign: "center",
    margin: theme.spacing(0, 0, 2)
  },
  description: {
    textAlign: "center"
  }
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.hero}>
      <Typography variant="h1" className={classes.title} gutterBottom>
        Hi, I'm Tommy Lunde Barvåg 👋
      </Typography>
      <Typography className={classes.description} paragraph>
        I’m a full stack developer. I’ve spent the last six years creating web solutions for great
        companies.
      </Typography>
    </Container>
  );
}

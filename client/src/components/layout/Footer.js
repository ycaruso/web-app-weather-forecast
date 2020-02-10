import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    flexShrink: 0,
    padding: 20
  }
}));

export default function Footer() {
  const classes = useStyles();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © Yuri Caruso "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  );
}

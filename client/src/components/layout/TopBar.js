import React from "react";
import { AppBar, Toolbar, Link, Typography, makeStyles } from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: 36,
    marginRight: theme.spacing(1)
  }
}));

export default function TopBar() {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none"
          }}
          color="inherit"
        >
          <WbSunnyIcon fontSize={"large"} className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            App Previsão Tempo
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

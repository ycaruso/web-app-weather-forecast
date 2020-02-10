import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 980,
    height: 300,
    minWidth: 20
  },
  weatherIcon: {
    width: 38,
    // display: 'block',
    margin: 0
  },
  weatherIconList: {
    width: 20,
    margin: 0
  },
  listItemText: {
    fontSize: "1em"
  },
  listItemTitulo: {
    fontSize: "1.2em",
    fontWeight: 600
  }
}));

export default function DetailWeatherDay() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <Grid container style={{ width: "20%" }} alignItems="center">
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ margin: 12 }}
          direction="row"
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item>
                  <img
                    src={`/images/01d.svg`}
                    sizes={12}
                    alt="Weather icon"
                    className={classes.weatherIcon}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    align="center"
                    style={{ fontSize: 32, fontWeight: 400, margin: 0 }}
                    color="textPrimary"
                  >
                    26º
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item align="center" xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 20, fontWeight: 400 }}
              color="textPrimary"
            >
              Foz do Iguaçu, BR
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 14 }}
              color="textPrimary"
              gutterBottom
            >
              Seg, 24 Nov 16:21
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 14 }}
              color="textPrimary"
            >
              20º - 25º
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 14 }}
              color="textPrimary"
            >
              Nascer do Sol 06:32
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 14 }}
              color="textPrimary"
            >
              Por do Sol 18:35
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="vertical" />

      <Grid container style={{ width: "80%" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <List>
                <ListItem style={{ height: 30 }}>
                  <ListItemText
                    classes={{ primary: classes.listItemTitulo }}
                    style={{ textAlign: "center" }}
                  >
                    08:00
                  </ListItemText>
                </ListItem>
                <ListItem
                  style={{ height: 30, textAlign: "center", display: "block" }}
                >
                  <img
                    src={`/images/01d.svg`}
                    alt="Weather icon"
                    className={classes.weatherIconList}
                  />
                </ListItem>
                <ListItem style={{ height: 30 }}>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    style={{ textAlign: "center" }}
                    title="Temperatura"
                  >
                    26º
                  </ListItemText>
                </ListItem>
                <ListItem style={{ height: 30 }}>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    style={{ textAlign: "center" }}
                    title="Precipitação"
                  >
                    4,01mm
                  </ListItemText>
                </ListItem>
                <ListItem style={{ height: 30 }}>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    style={{ textAlign: "center" }}
                    title="Umidade"
                  >
                    85%
                  </ListItemText>
                </ListItem>
                <ListItem style={{ height: 30 }}>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    style={{ textAlign: "center" }}
                    title="Vel. Vento"
                  >
                    9,22km/h
                  </ListItemText>
                </ListItem>
                <ListItem style={{ height: 30 }}>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    style={{ textAlign: "center" }}
                    title="Perc. Nuvens"
                  >
                    1%
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Divider
              orientation="horizontal"
              style={{ height: 230, width: 1, backgroundColor: "#e0e0e0" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

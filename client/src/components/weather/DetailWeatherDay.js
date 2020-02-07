import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 980,
    height: 300
  },
  weatherIcon: {
    width: 60,
    // display: 'block',
    margin: 0
  },
  weatherIconList: {
    width: 20,
    margin: 0
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
          <Grid item align="center" xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 16 }}
              color="textPrimary"
              gutterBottom
            >
              Previsão Cianorte, BR
            </Typography>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                spacing={4}
              >
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
                    component="h3"
                    variant="h3"
                    align="center"
                    style={{ margin: 0 }}
                    color="textPrimary"
                    gutterBottom
                  >
                    26º
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 16 }}
              color="textPrimary"
              gutterBottom
            >
              Segunda, 24 Nov 16:21
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 16 }}
              color="textPrimary"
              gutterBottom
            >
              Chuva: 1mm
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 16 }}
              color="textPrimary"
              gutterBottom
            >
              Umidade: 89%
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 16 }}
              color="textPrimary"
              gutterBottom
            >
              Vento: 10.9 km/h
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              style={{ fontSize: 16 }}
              color="textPrimary"
              gutterBottom
            >
              Nuvens: 5%
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="vertical" />
      <Grid container style={{ width: "80%" }}>
        <Grid item xs={12}>
          <Grid container >
            <Grid item>
              <List>
                <ListItem style={{height:10}}>
                  <ListItemIcon>
                    <img
                      src={`/images/01d.svg`}
                      alt="Weather icon"
                      className={classes.weatherIconList}
                    />
                  </ListItemIcon>
                </ListItem>
                <ListItem style={{height:30}}>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem style={{height:30}}>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem style={{height:30}}>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem style={{height:30}}>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem style={{height:30}}>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem style={{height:30}}>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" style={{ marginTop:20, height: 300}}/>
            <Grid item>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <img
                      src={`/images/01d.svg`}
                      sizes={12}
                      alt="Weather icon"
                      className={classes.weatherIconList}
                    />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" style={{ marginTop:20, height: 300}}/>
            <Grid item>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <img
                      src={`/images/01d.svg`}
                      sizes={12}
                      alt="Weather icon"
                      className={classes.weatherIconList}
                    />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" style={{ marginTop:20, height: 300}}/>
            <Grid item>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <img
                      src={`/images/01d.svg`}
                      sizes={12}
                      alt="Weather icon"
                      className={classes.weatherIconList}
                    />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" style={{ marginTop:20, height: 300}}/>
            <Grid item>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <img
                      src={`/images/01d.svg`}
                      sizes={12}
                      alt="Weather icon"
                      className={classes.weatherIconList}
                    />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" style={{ marginTop:20, height: 300}}/>
            <Grid item>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <img
                      src={`/images/01d.svg`}
                      sizes={12}
                      alt="Weather icon"
                      className={classes.weatherIconList}
                    />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

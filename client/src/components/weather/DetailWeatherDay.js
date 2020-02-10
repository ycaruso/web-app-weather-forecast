import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, Grid, List, ListItem, ListItemText } from "@material-ui/core";

import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 240,
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

export default function DetailCardWeatherDay({ dataDetalheDia }) {
  const classes = useStyles();

  const lenData = dataDetalheDia.length;

  return (
    <Paper component="form" className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            {dataDetalheDia.map((item, i) => (
              <Fragment key={i}>
                <Grid item>
                  <List>
                    <ListItem style={{ height: 30 }}>
                      <ListItemText
                        classes={{ primary: classes.listItemTitulo }}
                        style={{ textAlign: "center" }}
                      >
                        {item.dt}
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      style={{
                        height: 30,
                        textAlign: "center",
                        display: "block"
                      }}
                    >
                      <img
                        src={`/images/${item.icon}.svg`}
                        alt="Weather icon"
                        className={classes.weatherIconList}
                        title={item.condicao_clima}
                      />
                    </ListItem>
                    <ListItem style={{ height: 30 }}>
                      <ListItemText
                        classes={{ primary: classes.listItemText }}
                        style={{ textAlign: "center" }}
                        title="Temperatura"
                      >
                        {item.temp}º
                      </ListItemText>
                    </ListItem>
                    <ListItem style={{ height: 30 }}>
                      <ListItemText
                        classes={{ primary: classes.listItemText }}
                        style={{ textAlign: "center" }}
                        title="Precipitação"
                      >
                        {item.chuva}mm
                      </ListItemText>
                    </ListItem>
                    <ListItem style={{ height: 30 }}>
                      <ListItemText
                        classes={{ primary: classes.listItemText }}
                        style={{ textAlign: "center" }}
                        title="Umidade"
                      >
                        {item.umidade}%
                      </ListItemText>
                    </ListItem>
                    <ListItem style={{ height: 30 }}>
                      <ListItemText
                        classes={{ primary: classes.listItemText }}
                        style={{ textAlign: "center" }}
                        title="Vel. Vento"
                      >
                        {item.vento.toFixed(1)}km/h
                      </ListItemText>
                    </ListItem>
                    <ListItem style={{ height: 30 }}>
                      <ListItemText
                        classes={{ primary: classes.listItemText }}
                        style={{ textAlign: "center" }}
                        title="Perc. Nuvens"
                      >
                        {item.percNuvem}%
                      </ListItemText>
                    </ListItem>
                  </List>
                </Grid>
                {lenData !== i + 1 && (
                  <Divider
                    orientation="horizontal"
                    style={{
                      height: 230,
                      width: 1,
                      backgroundColor: "#e0e0e0"
                    }}
                  />
                )}
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

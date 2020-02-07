import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../components/layout/SearchBar";
import WeatherDay from "../components/weather/WeatherDay";
import DetailWeatherDay from "../components/weather/DetailWeatherDay";

import previsaoService from "../services/previsaoService";
import previsaoOWMService from "../services/previsaoOWMService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Yuri Caruso "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: 36,
    marginRight: theme.spacing(1)
  },
  html: {
    height: "100%"
  },
  body: {
    margin: 0,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  heroContent: {
    backgroundColor: "#f7f7f7",
    // padding: theme.spacing(4, 10, 6),
    flex: "1 0 auto",
    padding: 20
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(3),
    flexShrink: 0,
    padding: 20
  },
  //WeatherDIa
  root: {
    flexGrow: 1,
    marginTop: 15
  }
}));

export default function ConsultaPrevisao() {
  const classes = useStyles();

  const [val, setVal] = useState("");
  const [dataRes, setDataRes] = useState("");

  async function handleSearchBarClick(value) {
    setVal(value);
    let res = await previsaoOWMService.getPrevisoesOWM(value);
    //transforma para dados resumidos
    let dataRes = previsaoOWMService.makeArrayPrevisaoResumido(res);
    setDataRes(dataRes);
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     let ret = await previsaoService.salvarConsultaPrevisao("");
  //     console.log(ret);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className={classes.html}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <WbSunnyIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            App Previsão Tempo
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.body}>
        <div className={classes.heroContent}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12}>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Consultar Previsão
              </Typography>
            </Grid>
            <Grid>
              <SearchBar value={val} onSearchBarClick={handleSearchBarClick} />
            </Grid>
          </Grid>

          {dataRes && (
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {dataRes.map(data => (
                    <Grid key={data} item>
                      <WeatherDay
                        dia_semana={data.dia_semana}
                        icon={data.icon}
                        temp={data.temp}
                        condicao_clima={data.condicao_clima}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* <Grid container className={classes.root} justify="center">
            <DetailWeatherDay />
          </Grid> */}
        </div>
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
}

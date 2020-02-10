import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../components/layout/SearchBar";
import WeatherDay from "../components/weather/WeatherDay";
import DetailWeatherDay from "../components/weather/DetailWeatherDay";

import previsaoService from "../services/previsaoService";
import previsaoOWMService from "../services/previsaoOWMService";
import TopBar from "../components/layout/TopBar";
import DetailWeatherCity from "../components/weather/DetailWeatherCity";

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
    flex: "1 0 auto",
    padding: 20
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
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
  const [data5Dias, setdata5Dias] = useState([]);
  const [dataCity, setDataCity] = useState('');

  async function handleSearchBarClick(value) {
    setVal(value);
    let res = await previsaoOWMService.getPrevisoesOWM(value);
    if (res.msg === "sucesso") {
      //transforma para dados resumidos
      let data5Dias = previsaoOWMService.makeDataPrevisao5Dias(res.data);
      setdata5Dias(data5Dias);
      let dataCity = previsaoOWMService.makeDataCity(res.data);
      setDataCity(dataCity);
      console.log(dataCity);

      previsaoService.salvarConsultaPrevisao(res.data);
    } else {
      console.log("Erro na api");
    }
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
      <TopBar />
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

          {dataCity && 
            <Grid item align="center">
              <DetailWeatherCity
                cidade={dataCity.cidade}
                weather={dataCity.weather}
                horaSol={dataCity.horaSol}
                temp={dataCity.temp}
              />
            </Grid>
          }
          {data5Dias && (
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {data5Dias.map((data, i) => (
                    <Grid key={i} item>
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

          <Grid container className={classes.root} justify="center">
            <DetailWeatherDay />
          </Grid>
        </div>
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
}

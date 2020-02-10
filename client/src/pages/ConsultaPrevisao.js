import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../components/layout/SearchBar";
import CardWeatherDay from "../components/weather/CardWeatherDay";
import DetailWeatherDay from "../components/weather/DetailWeatherDay";
import previsaoService from "../services/previsaoService";
import previsaoOWMService from "../services/previsaoOWMService";
import TopBar from "../components/layout/TopBar";
import DetailWeatherCity from "../components/weather/DetailWeatherCity";
import Footer from "../components/layout/Footer";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const _Swal = withReactContent(Swal)



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

  //WeatherDIa
  root: {
    marginTop: 20
  }
}));

export default function ConsultaPrevisao() {
  const classes = useStyles();

  const [cidade, setCidade] = useState("");
  const [res, setRes] = useState({});
  const [data5Dias, setdata5Dias] = useState([]);
  const [dataCity, setDataCity] = useState("");
  const [dataDetalheDia, setDataDetalheDia] = useState([]);

  async function handleSearchBarClick(cidade) {
    setCidade(cidade);
    let res = await previsaoOWMService.getPrevisoesOWM(cidade);
    setRes(res);
    if (res.msg === "sucesso") {
      // Informações da cidade
      let dataCity = previsaoOWMService.makeDataCity(res.data);
      setDataCity(dataCity);
      // Informações dia da semana
      let data5Dias = previsaoOWMService.makeDataPrevisao5Dias(res.data);
      setdata5Dias(data5Dias);
      previsaoService.salvarConsultaPrevisao(res.data);
    } else {
      _Swal.fire({
        icon: 'error',
        text: res.err,
      })
    }
  }

  function handleCardWeatherDayClick(dia) {
    // Gera Informações detalhes do dia
    let dataDetalheDia = previsaoOWMService.makeDataDetalheDia(res.data, dia);
    setDataDetalheDia(dataDetalheDia);
  }

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
              <SearchBar
                value={cidade}
                onSearchBarClick={handleSearchBarClick}
              />
            </Grid>
          </Grid>

          {dataCity && (
            <Grid item align="center">
              <DetailWeatherCity
                cidade={dataCity.cidade}
                dt={dataCity.dt}
                weather={dataCity.weather}
                horaSol={dataCity.horaSol}
                temp={dataCity.temp}
              />
            </Grid>
          )}
          {data5Dias && data5Dias.length > 0 && (
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {data5Dias.map((data, i) => (
                    <Grid key={i} item>
                      <CardWeatherDay
                        dia_semana={data.dia_semana}
                        icon={data.icon}
                        temp={data.temp}
                        condicao_clima={data.condicao_clima}
                        onCardWeatherDayClick={handleCardWeatherDayClick}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}

          {dataDetalheDia && dataDetalheDia.length > 0 && (
            <Grid container className={classes.root} justify="center">
              <DetailWeatherDay dataDetalheDia={dataDetalheDia} />
            </Grid>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

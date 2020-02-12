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

import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const _Swal = withReactContent(Swal);

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #3f51b5;
`;

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
  const [loading, SetLoading] = useState(false);

  async function handleSearchBarClick(cidade) {
    setCidade(cidade);
    let res = await previsaoOWMService.getPrevisoesOWM(cidade);
    setRes(res);
    SetLoading(true);
    let result = await previsaoService.salvarConsultaPrevisao(res.data);
    SetLoading(false);
    if (result.msg === "erro") {
      console.log(result);
      _Swal.fire({
        icon: "error",
        text: result.err.data !== "undefined" ? result.err.data.msg : result.err
      });
      return;
    } else {
      _Swal.fire({
        icon: "success",
        text: result.data.msg
      });
    }
    // console.log(result);
    if (res.msg === "sucesso") {
      // Informações da cidade
      let dataCity = previsaoOWMService.makeDataCity(res.data);
      setDataCity(dataCity);
      // Informações dia da semana
      let data5Dias = previsaoOWMService.makeDataPrevisao5Dias(res.data);
      setdata5Dias(data5Dias);
    } else {
      _Swal.fire({
        icon: "error",
        text: res.err
      });
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

          <FadeLoader
            css={override}
            size={150}
            //size={"150px"} this also works
            color={"#3F51B5"}
            loading={loading}
          />

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

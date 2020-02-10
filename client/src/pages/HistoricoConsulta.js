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
  }
}));

export default function HistoricoConsulta() {
  const classes = useStyles();

  const [res, setRes] = useState({});
  const [data5Dias, setdata5Dias] = useState([]);
  const [dataCity, setDataCity] = useState("");
  const [dataDetalheDia, setDataDetalheDia] = useState([]);

  return (
    <div className={classes.html}>
      <CssBaseline />
      <TopBar />
      <main className={classes.body}>
      
      </main>
      <Footer />
    </div>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "../components/layout/TopBar";
import Footer from "../components/layout/Footer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import previsaoService from "../services/previsaoService";
import moment from "moment";
import { Link } from "@material-ui/core";
import previsaoOWMService from "../services/previsaoOWMService";
import DetailWeatherCity from "../components/weather/DetailWeatherCity";
import CardWeatherDay from "../components/weather/CardWeatherDay";
import DetailCardWeatherDay from "../components/weather/DetailWeatherDay";

const useStyles = makeStyles({
  body: {
    marginTop: 20
  },
  table: {
    minWidth: 780,
    width: 780
  }
});

export default function HistoricoConsulta() {
  const classes = useStyles();

  const [historico, setHistorico] = useState([]);
  const [res, setRes] = useState([]);
  const [dataCity, setDataCity] = useState("");
  const [data5Dias, setData5Dias] = useState([]);
  const [dataDetalheDia, setDataDetalheDia] = useState([]);

  const fetchData = useCallback(async () => {
    const { data } = await previsaoService.obterTodasConsultasPrevisao();
    setHistorico(data.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log(dataCity);
  }, [dataCity]);

  async function showDetail(rowid) {
    console.log(rowid);
    const res = await previsaoService.obterDetalhesConsultaPorId(rowid);
    setRes(res);
    let dtCity = previsaoOWMService.makeDataCity(res.data);
    console.log(dtCity);
    setDataCity(dtCity);
    // let data5Dias = previsaoOWMService.makeDataPrevisao5Dias(res.data);
    // setData5Dias(data5Dias);
    // console.log(data5Dias);
  }

  // function handleCardWeatherDayClick(dia) {
  //   // Gera Informações detalhes do dia
  //   let dataDetalheDia = previsaoOWMService.makeDataDetalheDia(res.data, dia);
  //   setDataDetalheDia(dataDetalheDia);
  // }

  return (
    <div className={classes.html}>
      <CssBaseline />
      <TopBar />
      <main>
        <Grid className={classes.body} container justify="center">
          <Grid item xs={12}>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Histórico de Consultas Previsão Tempo
            </Typography>
          </Grid>
          <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#ID</TableCell>
                  <TableCell align="right">DtConsulta</TableCell>
                  <TableCell align="right">Cidade</TableCell>
                  <TableCell align="right">Pais</TableCell>
                  <TableCell align="right">População</TableCell>
                  <TableCell align="right">Nascer do Sol</TableCell>
                  <TableCell align="right">Por do Sol</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historico &&
                  historico.length > 0 &&
                  historico.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <Link href="#" onClick={() => showDetail(row.id)}>
                          {row.id}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        {moment(row.dt_hora_consulta).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </TableCell>
                      <TableCell align="right">{row.cidade}</TableCell>
                      <TableCell align="right">{row.pais}</TableCell>
                      <TableCell align="right">{row.populacao}</TableCell>
                      <TableCell align="right">
                        {moment(row.dt_nascer_sol).format("HH:mm")}
                      </TableCell>
                      <TableCell align="right">
                        {moment(row.dt_por_sol).format("HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
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
        {/* {data5Dias && data5Dias.length > 0 && (
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
            <DetailCardWeatherDay dataDetalheDia={dataDetalheDia} />
          </Grid>
        )} */}
      </main>
      <Footer />
    </div>
  );
}

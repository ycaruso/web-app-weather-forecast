import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles({
  body: {
    marginTop: 20
  },

  table: {
    minWidth: 780,
    width: 780
  }
});

// https://blog.logrocket.com/react-hooks-cheat-sheet-unlock-solutions-to-common-problems-af4caf699e70/

export default function HistoricoConsulta() {
  const classes = useStyles();
  const [historico, setHistorico] = useState([]);

  const fetchData = async () => {
    const data = await previsaoService.obterTodasConsultasPrevisao();
    setHistorico(data.data);
    console.log(historico);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                {historico && historico.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.dt_hora_consulta}</TableCell>
                    <TableCell align="right">{row.cidade}</TableCell>
                    <TableCell align="right">{row.pais}</TableCell>
                    <TableCell align="right">{row.populacao}</TableCell>
                    <TableCell align="right">{row.dt_nascer_sol}</TableCell>
                    <TableCell align="right">{row.dt_por_sol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </main>
      <Footer />
    </div>
  );
}

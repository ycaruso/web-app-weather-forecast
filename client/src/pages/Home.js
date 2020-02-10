import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import TopBar from "../components/layout/TopBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "} {"Yuri Caruso "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
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
    flex: "1 0 auto",
    padding: 20
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    flexShrink: 0,
    padding: 20
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  }
}));

function Home() {
  const classes = useStyles();
  let history = useHistory();

  const handlerLink = path => {
    history.push({ pathname: path });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              App Previsão do Tempo
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Faça previsões por Cidade e País e veja quais as codições
              climáticas para os próximos 5 dias.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handlerLink("/consulta");
                    }}
                  >
                    Consultar Previsão
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Visualizar Histórico
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default Home;

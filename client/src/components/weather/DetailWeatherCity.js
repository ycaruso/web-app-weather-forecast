import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid } from "@material-ui/core";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import moment from "moment";
import "moment/locale/pt-br";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 20,
    padding: 0
  },
  temp: {
    fontSize: 25
  },
  cidade: {
    fontSize: 20
  },
  data: {
    fontSize: 15
  },
  hora: {
    fontSize: 12
  }
}));

export default function DetailWeatherCity({
  cidade,
  weather,
  horaSol,
  temp
}) {
  const classes = useStyles();

  function componentTempMinMax() {
    return (
      <Fragment>
        <Grid item align="left">
          <Grid container direction="row" alignItems="center">
            <FaTemperatureLow size={20} title="Tempatura Min" />
            <Typography className={classes.hora}>
              {temp.tempMin.toFixed(0)}º
            </Typography>
          </Grid>
        </Grid>

        <Grid item align="left">
          <Grid container direction="row" alignItems="center">
            <FaTemperatureHigh size={20} title="Tempatura Max" />
            <Typography className={classes.hora}>
              {temp.tempMax.toFixed(0)}º
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={2}
      >
        <Grid item>
          <Typography
            align="left"
            color="textPrimary"
            className={classes.cidade}
          >
            {cidade}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="left" color="textPrimary" className={classes.temp}>
            {temp.temp.toFixed(0)}º
          </Typography>
        </Grid>

        <Grid item align="center">
          <img
            src={`/images/${weather.icon}.svg`}
            style={{width: 32}}
            title={weather.descricao}
            alt="Weather icon"
          />
        </Grid>

        {componentTempMinMax()}

        <Grid item>
          <Typography align="left" color="textPrimary" className={classes.data}>
            {moment().format("LLLL")}
          </Typography>
        </Grid>
        <Grid item align="left" justify="center">
          <Grid container direction="column" alignItems="center">
            <FiSunrise size={20} title="Nascer do Sol" />
            <Typography className={classes.hora}>
              {moment.unix(horaSol.nascerSol).format("HH:mm")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item align="left" justify="center">
          <Grid container direction="column" alignItems="center">
            <FiSunset size={20} title="Por do Sol" />
            <Typography className={classes.hora}>
              {moment.unix(horaSol.porSol).format("HH:mm")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

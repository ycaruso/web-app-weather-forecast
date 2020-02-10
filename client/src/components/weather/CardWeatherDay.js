import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import "moment/locale/pt-br";

import { Paper, Typography, Grid, IconButton } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 180
    },
    CardWeatherDayIcon: {
        width: 70,
        // display: 'block',
        margin: 0
    }
}));

export default function CardWeatherDay( { dia_semana, icon, temp, condicao_clima, onCardWeatherDayClick } ) {

    const classes = useStyles();

    function handleClick() {
        onCardWeatherDayClick(dia_semana);
    }

    return (
        <Paper component="form" className={classes.root}>
            <Grid container justify="center" alignItems="center" direction="row">
                <Typography component="h6" variant="h6" align="center" style={{ margin: 0 }} color="textPrimary">
                    {moment(dia_semana).format("dddd").split("-")[0]}
                </Typography>
                <Grid item align="center" xs={12}>
                    <img
                        src={`/images/${icon}.svg`}
                        sizes={12}
                        alt="Weather icon"
                        className={classes.CardWeatherDayIcon}
                    />
                </Grid>
                <Grid item align="center" xs={12}>
                    <Typography style={{ fontSize: 14 }} align="center" color="textPrimary">
                        {temp}º
                    </Typography>
                </Grid>
                <Grid item align="center" xs={12}>
                    <Typography style={{ fontSize: 16 }} align="center" color="textPrimary">
                        {condicao_clima}
                    </Typography>
                </Grid>
                <Grid item align="center" xs={12}>
                    <IconButton size='small' onClick={handleClick}>
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}
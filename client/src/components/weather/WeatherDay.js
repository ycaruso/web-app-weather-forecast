import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    weatherDayIcon: {
        width: 70,
        // display: 'block',
        margin: 0
    }
}));


export default function WeatherDay( { dia_semana, icon, temp, condicao_clima } ) {

    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
            <Grid container justify="center" alignItems="center" direction="row">
                <Typography component="h6" variant="h6" align="center" style={{ margin: 0 }} color="textPrimary">
                    {dia_semana}
                </Typography>
                <Grid item align="center" xs={12}>
                    <img
                        src={`/images/${icon}.svg`}
                        sizes={12}
                        alt="Weather icon"
                        className={classes.weatherDayIcon}
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
                    <IconButton size='small'>
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}
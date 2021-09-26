import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  card: {
    justifyContent:'center',
  },
  styledText:{
    fontStyle:'italic',
    fontSize:'1rem',    
    color:'black',
    margin:theme.spacing(0,55)
  },
  space:{
    margin:theme.spacing(0,60)
  },
  container:{
    margin:theme.spacing(3,0),
    padding:'2%'
  }
}));

function DisplayWeather(props) {
  const { data } = props;
  const classes = useStyles();

  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${data.cod != 404 ? data.weather[0].icon : null}` +
    ".png";
  return (
    <div >
      {data.cod != 404 ? (
        <Grid >
          <Card className={classes.card}>
            <Typography className={classes.styledText} >
              {data.name} , {data.sys.country}. Weather
            </Typography>
            <Typography className={classes.styledText} >
              As of {new Date().toLocaleTimeString()}
            </Typography>
            <h1 className={classes.space}>
              {" "}
              {Math.floor(data.main.temp - 273.15)}
              <sup>o</sup>
            </h1>
            <Typography className={classes.styledText}>{data.weather[0].main}</Typography>
            <img className={classes.space} src={iconurl} alt="" srcset="" />
            <Typography className={classes.styledText} >
              {" "}
              {data.weather[0].description}
            </Typography>
            <Divider/>
            <Grid container item xs={12} className={classes.container} >
              <Grid container item xs={12} md={6} >
                <Grid item xs={12} md={6}>
                  <h4>High/Low</h4>
                </Grid>
                <Grid item xs={12} md={6}>
                  {Math.floor(data.main.temp_max - 273.15)}/
                  {Math.floor(data.main.temp_min - 273.15)}
                </Grid>
                <Grid item xs={12} md={6}>
                  <h4>Humidity</h4>
                </Grid>
                <Grid item xs={12} md={6}>{data.main.humidity} %</Grid>
                  <Grid item xs={12} md={6}>
                    <h4>Pressure</h4>
                  </Grid>
                <Grid item xs={12} md={6}>{data.main.pressure} hPa</Grid>
                <Grid item xs={12} md={6}>
                  <h4>Visibility</h4>
                </Grid>
                <Grid item xs={12} md={6}>{data.visibility / 1000} Km</Grid>
              </Grid>

              <Grid container item xs={12} md={6}>
                <Grid item xs={12} md={6}>
                  <h4>Wind</h4>
                </Grid>
                <Grid item xs={12} md={6}>{Math.floor((data.wind.speed * 18) / 5)} km/hr</Grid>
                <Grid item xs={12} md={6}>
                  <h4>Wind Direction</h4>
                </Grid>
                <Grid item xs={12} md={6}>
                  {data.wind.deg}
                  <sup>o</sup> deg
                </Grid>
                <Grid item xs={12} md={6}>
                  <h4>Sunrise</h4>
                </Grid>
                <Grid item xs={12} md={6}>
                  {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                </Grid>
                <Grid item xs={12} md={6}>
                  <h4>Sunset</h4>
                </Grid>
                <Grid item xs={12} md={6}>
                  {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ) : (
        <div >
          <h2>{data.message}</h2>
        </div>
      )}
    </div>
  );
}

export default DisplayWeather;
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PRIMARY } from "../../colors";
import { useState, useEffect  } from "react";
import Divider from '@material-ui/core/Divider';
import DisplayWeather from "./displayWeather";
import SpecificDestinationDetail from "../../mockdata/specificDestination";


const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 100,
  },
  text: {
    color: PRIMARY,
    padding: "1%",
    fontSize:'1rem'
  },
  headingText: {
    margin: theme.spacing(0,0),
    justifyContent: "left",
    color: PRIMARY,
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
    padding:'1%'
  },
  styledText:{
    fontSize:'1rem',    
    color:'black',
    padding:'1%',
  },
}));


export default function Weather(props) {
  const classes = useStyles();
  const [weather, setWeather] = useState([]); 
  const lat=SpecificDestinationDetail.langitude;
  const lon=SpecificDestinationDetail.longitude;
  const APIKEY="4279cf9cf1d8fbe7b746d7c7d1aa72c9";

//   async function WeatherData(e) {
//     e.preventDefault();
//   const data = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${APIKEY}`
//   )
 
//     .then((res) => res.json())
//     .then((data) =>data);

//   setWeather({ data: data });
  
//   }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${APIKEY}`
    )
    .then((res) => res.json())
    .then((data) =>setWeather({ data: data }));
  },[]);

  return (
    <Grid item xs={12}>     
      <Card className={classes.card} >
        <div className={classes.cardDetails}>
          <CardContent>          
            <Typography component="h2" variant="h5" className={classes.headingText}>
              Weather Condition
            </Typography>
            <Divider />        
            {weather.data != undefined ? (
            <div>
              <DisplayWeather data={weather.data} />
            </div>
            ) : null}
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

Weather.propTypes = {
    post: PropTypes.object,
  };
  



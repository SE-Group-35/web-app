import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PRIMARY } from "../../colors";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Divider from '@material-ui/core/Divider';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    height:'25vw'
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
    fontStyle:'italic',
    fontSize:'1rem',    
    color:'black',
    padding:'2%',
  },
  
}));

const onMarkerClick={};
const onInfoWindowClose={};

function MapCard(props) {
  const classes = useStyles();
  const {post} =props;
  const{id} = useParams(); 

  
  useFirestoreConnect([{collection:"destinations", doc:id}]);  
  const destination = useSelector(
    ({ firestore: { data } }) => data.destinations && data.destinations[id]);
  //console.log(destination.coords);
  return (
    <Grid item xs={12}>     
      <Card className={classes.card} >
        <div className={classes.cardDetails}>
          <CardContent>          
            <Typography component="h2" variant="h5" className={classes.headingText}>
              Map Details
            </Typography>  
            <Divider />          
            {destination ? <div style={{padding:'1.5%'}}>
            <Map google={props.google} zoom={14} initialCenter={{
              lat: destination.coords[0],
              lng:  destination.coords[1]
              }}>
              <Marker onClick={onMarkerClick}
                name={'Current location'} />
              <InfoWindow onClose={onInfoWindowClose}></InfoWindow>
            </Map>
            </div>:<h1>Loading</h1>}
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyCTXgQBGcEdgNbJ0AQZiApNhf50kyEi57U&")
  })(MapCard)

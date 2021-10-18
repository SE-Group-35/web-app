import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import DestinationCover from "../../components/travelCompo/destinationCover";
import MapCard from '../../components/specificDestination/mapCard';
import GeneralInfo from "../../components/specificDestination/generalInfo";
import Overview from '../../components/specificDestination/overview';
import Weather from "../../components/specificDestination/weather";
import ActivityCard from "../../components/specificDestination/activityCard";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FormDialog from "../../components/specificDestination/dialogBox";

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",    
    },
    space:{
      margin:theme.spacing(4,0)
    }
}));


const SpecificDestination = (props) => {
    const classes = useStyles();
    const{id} = useParams(); 

  
  useFirestoreConnect([{collection:"destinations", doc:id}]);  
 // const des=useSelector(getPublishedDestinations);  
  const destination = useSelector(
    ({ firestore: { data } }) => data.destinations && data.destinations[id]);

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        {destination?(destination.published?<div>
         <DestinationCover post=  {destination}></DestinationCover>
          <FormDialog/>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={12} md={6}>
            <MapCard />
          </Grid>         
          <Grid item xs={12} md={6}>
            <GeneralInfo post={destination}/>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.space}>
           <Overview post={destination}></Overview>
        </Grid>
        <Grid item xs={12} className={classes.space}>
           <Weather post={destination}/>
        </Grid>
        <Grid item xs={12} className={classes.space}>
           <ActivityCard></ActivityCard>
        </Grid>
        </div>:null):<h1>Loading</h1>}
      </Grid>

);
};

export default SpecificDestination;
              
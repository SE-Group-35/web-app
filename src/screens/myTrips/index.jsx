import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import image from "../../assets/images/tripcover.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import TripPost from '../../components/travelCompo/tripPost';
import TripCard from "../../components/travelCompo/tripCard";
import { pastTripList, activeTripList,futureTripList } from "../../mockdata/tripList";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTrips } from './../../store/entities/trip';

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",    
    },
    space:{
        margin:theme.spacing(3,0)
      },
      
}));

const mainFeaturedPost = {
    title: "My Trips",
    description:
      "Travel opens your heart, brodens your mind and fills your life with stories to tell. -Paula Bendfeld-   .",
    image: `${image}`,
    imgText: "main image description",
  };


  
  
  export default function MyTrips(props) {
    const classes = useStyles();
    const {id}=useParams();
    
    useFirestoreConnect([
      {
        collection : "users",
        doc : id,
        subcollections : [{
          collection : "trips"
        }],
        storeAs : 'trips'
      }
     
    ])
    const tripList = useSelector(getTrips);
    console.log(tripList);
    const pastTrips=[];
    const activeTrips=[];
    const futureTrips=[];
    tripList.map(trip => {
      if(new Date(trip.endDate.seconds*1000) <new Date()){
        pastTrips.push(trip);
      }
      else if (new Date(trip.endDate.seconds*1000) ==new Date()){
        activeTrips.push(trip);
      }
      else{
        futureTrips.push(trip);
      }
    });
    console.log(pastTrips);

    const tripDetails =[
      {
          heading: "Past Trips",
          listDetails:pastTrips
      },
      {
          heading: "Active Trips",
          listDetails:activeTrips
      },
      {
          heading: "Future Trips",
          listDetails:futureTrips
      },
  ]    

return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <TripPost post={mainFeaturedPost} />
        <Grid item xs={12} >
          <Grid className={classes.space}>
          {tripDetails.map((post) => (
              <Grid className={classes.space}>
            <TripCard key={post.heading} post={post}  /></Grid>
          ))}    
          </Grid> 
        </Grid>
      </Grid>
    );
};
        

        
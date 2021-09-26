import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import image from "../../assets/images/tripcover.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import TripPost from '../../components/travelCompo/tripPost';
import DashboardCategory from "../../components/travelCompo/dashboardCategory";
import DashboardCard from "../../components/travelCompo/dashboardCard";
import TripCard from "../../components/travelCompo/tripCard";
import { pastTripList, activeTripList,futureTripList } from "../../mockdata/tripList";

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

const tripDetails =[
    {
        heading: "Past Trips",
        listDetails:pastTripList
    },
    {
        heading: "Active Trips",
        listDetails:activeTripList
    },
    {
        heading: "Future Trips",
        listDetails:futureTripList
    },
]  
  
  
  const MyTrips = (props) => {
    const classes = useStyles();
  
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
        
        export default MyTrips;
        
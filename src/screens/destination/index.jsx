import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import image from "../../assets/images/sinharaja.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import TripPost from "../../components/travelCompo/tripPost";
import MapCard from '../../components/specificDestination/mapCard';
import GeneralInfo from "../../components/specificDestination/generalInfo";
import Overview from '../../components/specificDestination/overview';
import SpecificDestinationDetail from "../../mockdata/specificDestination";
import Weather from "../../components/specificDestination/weather";
import ActivityCard from "../../components/specificDestination/activityCard";

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",    
    },
    space:{
      margin:theme.spacing(4,0)
    }
}));

const mainFeaturedPost = {
    title: SpecificDestinationDetail.title,
    description:
    SpecificDestinationDetail.address,
    image: `${image}`,
    imgText: "main image description",
};
const SpecificDestination = (props) => {
    const classes = useStyles();
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <TripPost post=  {mainFeaturedPost}></TripPost>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={12} md={6}>
            <MapCard />
          </Grid>         
          <Grid item xs={12} md={6}>
            <GeneralInfo/>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.space}>
           <Overview></Overview>
        </Grid>
        <Grid item xs={12} className={classes.space}>
           <Weather/>
        </Grid>
        <Grid item xs={12} className={classes.space}>
           <ActivityCard></ActivityCard>
        </Grid>
      </Grid>

);
};

export default SpecificDestination;
              
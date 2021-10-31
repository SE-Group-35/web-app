import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { PRIMARY, WHITE } from "../../colors";
import { getAuth } from "../../store/auth";
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MapWrapped } from "../../components/sequence/mapMarker";
import { GoogleMapsAPI } from "../../components/travelCompo/googleMapAPI";
import DetailedCard from "../../components/sequence/detailedCard";
import { DetailedList } from "../../components/sequence/detailedList";
import { Box } from "@material-ui/system";
const logo = require("../../assets/images/logo.svg");

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  
  logo: {
    margin: theme.spacing(10, 0),
  },
  
  card: {
    display: "flex",    
    margin : theme.spacing(0,0)   
  },
 
  styledText:{
    fontSize:'1.5rem',
    fontWeight:'bold',
    color:WHITE, 
      
  }, 
  appbar :{
      width : "100vw",
      marginRight: "75%",
      position:"relative"
  },
  stylishText: {
    fontSize:'1rem',
    fontWeight:'bold',
    color:PRIMARY,
    fontStyle:"italic",
    padding:'5%',
    margin:theme.spacing(-5,0)
  },
  space :{
      margin:theme.spacing(1,0)
  }
  
}));

const TravelPlan = () => {
  const classes = useStyles();
  const { uid } = useSelector(getAuth);
  

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
        <AppBar className={classes.appbar}>
            <Toolbar >
              <Link href={`/traveller/${uid}`}>
                <Typography className={classes.styledText}>
                    Home
                </Typography>
               </Link>
            </Toolbar>
        </AppBar>
       
        <Grid container item xs={12} className={classes.space}>
            <Grid item xs={12} md={9} >
                <div style={{ width: "73vw", height: "60vh" }}>
                    <MapWrapped
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                        GoogleMapsAPI
                        }`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                     />
                </div>    
            </Grid>         
            <Grid item xs={12} md={3}>
                <img src={logo.default} alt="Logo"className={classes.logo} />
                <Typography className={classes.stylishText}>"Do not follow where the path may lead. Go instead where there is no path and leave a trail..."</Typography>
            </Grid>    
        </Grid>            
    <Grid >
    <Grid container spacing={3} className={classes.card}>
        {DetailedList ? DetailedList.map(post =>
            <DetailedCard key={post.title} post={post} />
        ):<Typography className={classes.informText}>Loading</Typography>}
        </Grid>
    </Grid>
    </Grid>
  );
};

export default TravelPlan;
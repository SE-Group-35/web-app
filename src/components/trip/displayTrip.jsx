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
import { Box } from "@material-ui/system";
import { useLocation } from 'react-router-dom';
import {  Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputTextBox from "../../components/common/InputTextBox";
import Paper from "@material-ui/core/Paper";
import image from "../../assets/images/diary.jpg";
import DirectionMap from "../../components/sequence/direction";
import { useDispatch } from "react-redux";
import { addTrip } from "../../store/entities/trip";


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
  },
  lastGrid:{
    margin:theme.spacing(10,10)
  },
  button: {
    width: "100%",
    height: "3rem",
    cursor: "pointer",
    backgroundColor: PRIMARY,
    color: WHITE,
    fontSize: "1.5rem",
    border: 0,
    marginTop: "3rem",
    '&:hover': {
        backgroundColor: PRIMARY,
        color: WHITE,
    },
  },
  tripText:{    
      fontSize:'1.5rem',
      fontWeight:'bold',
      color:PRIMARY,
      fontStyle:"italic",
     
      margin:theme.spacing(5,25)
    
  },
  dialog:{
    width:"100vw",
    height:"100vh"
  },
  image: {
    backgroundImage: `url("${image}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: "2rem",
    display: "block",
  },
  typography: {
    fontWeight: "bold",
    fontSize: "1rem",
    display: "block",
    color: PRIMARY,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  logoforForm: {
    margin: theme.spacing(0, -4),
  },
  
}));

const TripDisplay = (props) => {
  const classes = useStyles();  
  //const {state} = useLocation();
  //console.log(state);
  const location=useLocation();
  console.log(location.state);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
        <AppBar className={classes.appbar}>
            <Toolbar >
              {/* <Link href={`/traveller/${uid}`}>
                <Typography className={classes.styledText}>
                    Home
                </Typography>
               </Link> */}
            </Toolbar>
        </AppBar>
       
        <Grid container item xs={12} className={classes.space}>
            <Grid item xs={12} md={9} >
                {/* <div style={{ width: "73vw", height: "60vh" }}>                 
                 <DirectionMap post={detailedList} start={start}/>                
                </div>     */}
            </Grid>         
            <Grid item xs={12} md={3}>
                <img src={logo.default} alt="Logo"className={classes.logo} />
                <Typography className={classes.stylishText}>"Do not follow where the path may lead. Go instead where there is no path and leave a trail..."</Typography>
            </Grid>    
        </Grid>          
    
        {/* <Grid container spacing={3} className={classes.card}>
          {detailedList ? detailedList.map((post,index) =>
            <DetailedCard key={post.id} post={post} num={index} />
          ):<Typography className={classes.informText}>Loading</Typography>}
        </Grid> */}
       
      </Grid>
  );
};

export default TripDisplay;
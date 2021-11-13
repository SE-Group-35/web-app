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

const TravelPlan = () => {
  const classes = useStyles();
  const dispatch=useDispatch();
  const [open, setOpen] = useState(false);
  const { uid } = useSelector(getAuth);
  const {state} =useLocation(); 
  const {algo,startDate,endDate,travelMode}=state;   
  const[save,setToSave] = useState(false);
  const detailedList = algo.trip.tripDestinations;
  const start =algo.trip.startLocation;
  console.log("travelMode",travelMode);

  const formik = useFormik({
    initialValues: {
      tripName: "",
            
    },
    validationSchema: Yup.object({
      tripName: Yup.string().required("Required field"),      
      
    }),

    onSubmit: async ({
      tripName,
            
    }) => {
      console.log("tripName", tripName);
          
      try {
        dispatch(addTrip(detailedList,endDate,startDate,uid,tripName,start,travelMode));
        setToSave(true);
        setOpen(false);      
        
      } catch (error) {      
       
      }
    },
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  

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
                 <DirectionMap post={detailedList} start={start} travelMode={travelMode}/>                  
                    {/* <MapWrapped
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                        GoogleMapsAPI
                        }`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        post={detailedList}
                     /> */}
                </div>    
            </Grid>         
            <Grid item xs={12} md={3}>
                <img src={logo.default} alt="Logo"className={classes.logo} />
                <Typography className={classes.stylishText}>"Do not follow where the path may lead. Go instead where there is no path and leave a trail..."</Typography>
            </Grid>    
        </Grid>          
    
        <Grid container spacing={3} className={classes.card}>
          {detailedList ? detailedList.map((post,index) =>
            <DetailedCard key={post.id} post={post} num={index} />
          ):<Typography className={classes.informText}>Loading</Typography>}
        </Grid>
        <Grid container item xs={12} >
          <Grid item xs={12} md={6}>
            <Typography className={classes.tripText}>Enjoy Your Trip ...!</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              type="submit"
              className={classes.button}
              onClick={handleClickOpen}             
            >
              Save Trip
            </Button>
            
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
              <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={5} className={classes.image} />
                <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                  <Grid className={classes.logoforForm}>
                    <img src={logo.default} alt="Logo" />
                  </Grid>
                  <Grid className={classes.form}>
                    <Typography align="left" className={classes.text} gutterBottom>
                      Save My Trip
                    </Typography>
                  </Grid>
                  <form
                    onSubmit={formik.handleSubmit}
                    className={classes.form}
                    noValidate
                  >
                    <Grid container spacing={2}>
                      <Typography className={classes.typography} gutterBottom>
                        Trip Name
                      </Typography>
                      <InputTextBox
                        variant="outlined"
                        id="tripName"
                        placeholder="Save my trip as"
                        name="tripName"
                        autoComplete="tripName"
                        fullWidth
                        value={formik.values.tripName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.tripName && Boolean(formik.errors.tripName)
                        }
                        helperText={
                          formik.touched.tripName && formik.errors.tripName
                        }
                      />              
                    </Grid>
                    <Button type="submit" className={classes.button} >
                      Save
                    </Button>
                   <Box mt={2}></Box>            
                  </form>
                </div>
              </Grid>
            </Grid>            
          </Dialog>
        </Grid>
       </Grid>
      </Grid>
  );
};

export default TravelPlan;
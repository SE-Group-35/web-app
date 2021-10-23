import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import image from "../../../assets/images/register.PNG";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import InputTextBox from "../../../components/common/InputTextBox";
import { PRIMARY, WHITE } from "../../../colors";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Map from "../../../components/travelCompo/map";
import MapHome from "../../../components/travelCompo/mapHome";
import { TextField } from "@material-ui/core";
import {

  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";


const logo = require("../../../assets/images/logo.svg");
const MapWrapped = withScriptjs(withGoogleMap(Map));
const apiKey='VAIzaSyDvYA-P4MxXb1r3b4CIWj-vE6bvShnTQ8o';
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
  button: {
    width: "100%",
    height: "3.9rem",
    cursor: "pointer",
    backgroundColor: PRIMARY,
    color: WHITE,
    fontSize: "2rem",
    border: 0,
   margin:theme.spacing(-10,0)
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
    marginTop: theme.spacing(1),
  },
  loginText: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: PRIMARY,
  },
  logo: {
    margin: theme.spacing(0, 18),
  },
  character: {
    fontWeight: "bold",
  },
  margin:{
    
    fontWeight: "bold",
    fontSize: "1rem",
    display: "block",
    color: PRIMARY,
  },
  buttonAlign:{
    margin :theme.spacing(10,0)
  },
  travelModeMargin:{
    margin:theme.spacing(5,0)
  }
}));
const travelMode = [
  {
    value: "Driving",
    label: "Driving",
  },
  {
    value: "Walking",
    label: "Walking",
  },
  {
    value: "Bycycling",
    label: "Bycycling",
  },
  
];

const AutomatedPlanner = () => {
  const classes = useStyles();
  

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.string().required("Required field"),
      endDate: Yup.string().required("Required field"),
    }),
});


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={4}  >
        {/* <img src={logo.default} alt="Logo" /> */}
        <img src={image}  style={{ height:"75vh"}} />
        <img src={image}  style={{ height:"75vh"}} />
        <img src={image}  style={{ height:"75vh"}} />
        </Grid>
      <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid className={classes.logo}>
            <img src={logo.default} alt="Logo" />
          </Grid>
          <Box mt={3}></Box>
          <Typography align="left" className={classes.text} gutterBottom>
            Trip Wizard
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} gutterBottom>
                  Start Date
                </Typography>
                <TextField
                  variant="outlined"
                  id="startDate"                  
                  name="startDate"
                  type="datetime-local"                  
                  fullWidth
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} gutterBottom>
                  End Date
                </Typography>
                <TextField
                   type="datetime-local"                   
                  variant="outlined"
                  id="endDate"
                  placeholder="Enter end date"
                  name="endDate"
                  
                  fullWidth
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.typography} gutterBottom>
                  Start Location
                </Typography>
               
                  <MapHome/>
				      </Grid>
              <Grid item xs={12} className={classes.buttonAlign} >
                <Typography className={classes.margin} gutterBottom >
                  Prefer Categories
                </Typography>
                
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Natural" />
                <FormControlLabel control={<Checkbox />} label="Historical" />
                <FormControlLabel control={<Checkbox />} label="Religious" />
              </FormGroup>
              <Grid className={classes.travelModeMargin}>
                <Typography className={classes.typography} gutterBottom>
                  Travel Mode
                </Typography>
                <InputTextBox
                  select
                  variant="outlined"
                  fullWidth
                  name="travelMode"
                  placeholder="Select a Travel Mode"
                  label="Select a Travel Mode"
                  
                  >
                  {travelMode.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                  
                </InputTextBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid >
            <button type="submit" className={classes.button} >
              Generate Plan
            </button>
            </Grid> 
            <Box mt={2}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AutomatedPlanner;

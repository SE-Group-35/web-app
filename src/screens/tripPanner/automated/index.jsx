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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Map from "../../../components/travelCompo/map";
import MapHome from "../../../components/travelCompo/mapHome";
import { TextField } from "@material-ui/core";
import generateTravelPlan from "./../../../Algorithm/index";
import { useSelector } from "react-redux";
import { getStartLocation } from "../../../store/system";
import { getPublishedDestinations } from "../../../store/entities/destination";
import { getDestinations } from "../../../firebase";
import { useNavigate } from "react-router";
import Dialog from '@material-ui/core/Dialog';
import DirectionMap from "../../../components/sequence/direction";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import CircleLoading from "../../../components/sequence/loading";
const moment = require("moment");
const logo = require("../../../assets/images/logo.svg");
const MapWrapped = withScriptjs(withGoogleMap(Map));
const apiKey = "VAIzaSyDvYA-P4MxXb1r3b4CIWj-vE6bvShnTQ8o";

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
    margin: theme.spacing(-30, 0),
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
  margin: {
    fontWeight: "bold",
    fontSize: "1rem",
    display: "block",
    color: PRIMARY,
  },
  buttonAlign: {
    margin: theme.spacing(10, 0),
  },
  travelModeMargin: {
    margin: theme.spacing(5, 0),
  },
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
  const [generate,setGenerate]=useState(false);
  
  const startLoc = useSelector(getStartLocation);
  const startLocation= {coords:{latitude:startLoc.lat,longitude:startLoc.lng}}
  const destinations = useSelector(getPublishedDestinations); 
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [category , setCategory] = useState(["Natural","Religious","Historical"]);

  //console.log("destinations",destinations);  
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
     travelMode: "Driving",  
       
    },
    validationSchema: Yup.object({
      startDate: Yup.date()
        .required("Start Date is required ")
        .min(new Date(), "Start Date must be larger than today"),
      endDate: Yup.date()
        .required("Start Date is required ")
        .min(Yup.ref("startDate"), "End date can't be before the Start date"),  
          
    }),
    onSubmit: async ({ startDate, endDate, travelMode }) => {
      try {
        setGenerate(true);
        console.log(startDate);
        console.log(endDate);
        console.log(startLoc);
        console.log(travelMode);        
        const response = await getDestinations(category);
        const destinations = JSON.parse( response.data);        
        const algo = await generateTravelPlan({startLocation,startDate,endDate,travelMode,destinations});
        
        if(algo.success){         
          navigate("/traveller/travelPlan",{state:{algo:algo,startDate:startDate,endDate:endDate,travelMode,travelMode}});
        }
        
      } catch (error) {
        console.log(error);
      }
    },
  });
  
  console.log(category);
  const handleCheckBox = (event) => {     
    setChecked(!checked);
    if(!checked){
      if(!(category.includes(event.target.name))){
        setCategory([...category,event.target.name]);
      }
    }else{
      if(category.includes(event.target.name)){
        const index=category.indexOf(event.target.name);
        category.splice(index,1);
      }
    }
       
  };

  const handleCheckBox1 = (event) => {     
    setChecked1(!checked1);
    if(!checked1){
      if(!(category.includes(event.target.name))){
        setCategory([...category,event.target.name]);
      }
    }else{
      if(category.includes(event.target.name)){
        const index=category.indexOf(event.target.name);
        category.splice(index,1);
      }
    }   
    
  };
 
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={4}>       
        <img src={image} style={{ height: "75vh" }} />
        <img src={image} style={{ height: "75vh" }} />
        <img src={image} style={{ height: "75vh" }} />
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

                <MapHome />
              </Grid>
              <Grid item xs={12} className={classes.buttonAlign}>
                <Typography className={classes.margin} gutterBottom>
                  Prefer Categories
                </Typography>

                <FormGroup error={
                    formik.touched.scategory && Boolean(formik.errors.category)
                  }>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Natural"
                  />
                  <FormControlLabel control={<Checkbox defaultChecked checked={checked} onChange={handleCheckBox} name="Historical" />} label="Historical" />
                  <FormControlLabel control={<Checkbox  defaultChecked checked1={checked1} onChange={handleCheckBox1} name="Religious"/>} label="Religious" />
                </FormGroup>
                <Grid className={classes.travelModeMargin}>
                  <Typography className={classes.typography} gutterBottom>
                    Travel Mode
                  </Typography>
                  <InputTextBox
                    select
                    variant="outlined"
                    fullWidth 
                    value ={formik.values.travelMode}  
                    onChange={formik.handleChange}                 
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
            <Grid>
              {generate ? 
               <Grid>
                 <button type="submit" className={classes.button}>Generating</button>
                 <CircleLoading/>
               </Grid>
              : <button type="submit" className={classes.button}>Generate Plan</button>}
             </Grid>
            </form>
          </div>
      </Grid>
      <DirectionMap/>
    </Grid>
  );
};

export default AutomatedPlanner;

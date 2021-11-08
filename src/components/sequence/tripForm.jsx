import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import image from "../../assets/images/register.PNG";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import InputTextBox from "../../components/common/InputTextBox";
import { PRIMARY, WHITE } from "../../colors";



const logo = require("../../assets/images/logo.svg");

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
    marginTop: "3rem",
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
    margin: theme.spacing(0, -4),
  },
  character: {
    fontWeight: "bold",
  },
}));

const TripForm = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      tripName: "",
      journal: "",      
    },
    validationSchema: Yup.object({
      tripName: Yup.string().required("Required field"),
      journal: Yup.string().required("Required field"),
      
    }),

    onSubmit: async ({
      tripName,
      journal,      
    }) => {
      console.log("tripName", tripName);
      console.log("journal", journal);      
      try {
        
      } catch (error) {
       
       
      }
    },
  });

  return (
   
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={5} className={classes.image} />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid className={classes.logo}>
            <img src={logo.default} alt="Logo" />
          </Grid>
          <Typography align="left" className={classes.text} gutterBottom>
            Save My Trip
          </Typography>

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
              
              
                <Typography className={classes.typography} gutterBottom>
                  Journal
                </Typography>
                <InputTextBox
                  variant="outlined"
                  id="journal"
                  placeholder="Enter trip journal"
                  name="journal"
                  autoComplete="journal"
                  fullWidth
                  value={formik.values.journal}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.journal && Boolean(formik.errors.journal)
                  }
                  helperText={formik.touched.journal && formik.errors.journal}
                />
                           
             
            </Grid>
            <button type="submit" className={classes.button}>
              Save
              
            </button>
            <Box mt={2}></Box>            
          </form>
        </div>
      </Grid>
    </Grid>
   
  );
};

export default TripForm;
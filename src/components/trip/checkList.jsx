import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CssBaseline from "@material-ui/core/CssBaseline";
import { PRIMARY, WHITE } from "../../colors";
import Paper from "@material-ui/core/Paper";
import AddInputField from './addInputField';

const logo = require("../../assets/images/logo.svg");

const useStyles = makeStyles((theme) => ({
    
    root: {
      height: "100vh",
    },    
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
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
    logo: {
      margin: theme.spacing(0, 12),
      
    },    
    space:{
        margin:theme.spacing(5,0)
    },
    button: {
      width: "100%",
      height: "3rem",
      cursor: "pointer",
      backgroundColor: PRIMARY,
      color: WHITE,
      fontSize: "1.3rem",
      border: 0,
      margin:theme.spacing(0,15),
    },
})); 

export default function CheckList(props) {
  const dispatch=useDispatch();
  const {id}=useParams();  
  const [open, setOpen] = useState(false);  
  const classes = useStyles();
   
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleButtonClick =() => {
    setOpen(false);
  };
  

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      + Add Check List
      </Button>      
      <Dialog open={open} onClose={handleClose} >
        <Grid container component="main" className={classes.root}>
          <CssBaseline />      
          <Grid item xs={12}  component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Grid className={classes.logo} item md={7}>
                <img src={logo.default} alt="Logo" />
              </Grid>       
              <Grid item xs={12} className={classes.space}>
                <Typography align="left" className={classes.typography} gutterBottom>
                  Check List
                </Typography>
                <AddInputField post={props.post} />
                <Grid item xs={12} md={6}>
                  <button type="submit" className={classes.button} onClick={handleButtonClick}>
                    Close
                  </button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
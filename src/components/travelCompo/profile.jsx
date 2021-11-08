import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import image from "../../assets/images/activities.png";
import InputTextBox from "../../components/common/InputTextBox";
import { PRIMARY, WHITE } from "../../colors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAuth } from "../../store/auth";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getProfile } from "../../store/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link as RouterLink } from "react-router-dom";
import {  Button } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
  
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
  text: {
    fontSize: "1.5rem",
    display: "block",
    margin : theme.spacing(1,2)  
  },
  textHeading: {
    fontSize: "2rem",
    display: "block",
    margin : theme.spacing(-5,15),
    padding : "2%",
    fontWeight:"bold"  
  },
  emailText:{
    margin : theme.spacing(0,2)
  },
  typography: {
    fontWeight: "bold",
    fontSize: "1rem",
    display: "block",
    color: PRIMARY,
  },
  form: {
    width: "100%",
    margin: theme.spacing(7,0),
  },
  loginText: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: PRIMARY,
  },
  logo: {
    margin: theme.spacing(15, 0),
  },
  character: {
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    width:"80%" ,
    margin : theme.spacing(-5,5)   
  },
  avatar : {
      margin : theme.spacing(0,5),
      width : "10vw",
      height : "20vh"
  },
  styledText:{
    
    fontSize:'1.5rem',
    fontWeight:'bold',
    color:WHITE, 
      
  }, 
  appbar :{
      width : "25vw",
      marginRight: "75%"
      
  }
}));

const TravellerProfile = () => {
  const classes = useStyles();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { firstName, lastName, email, telephone } = useSelector(getProfile);
  const { uid } = useSelector(getAuth);
  

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={3}  >
          <AppBar className={classes.appbar} >
              <Toolbar >
              <Link href={`/traveller/${uid}`}>
            <Typography className={classes.styledText}>
              Home
            </Typography>
          </Link>
              </Toolbar>
          </AppBar>
        <img src={logo.default} alt="Logo"className={classes.logo} />
        <Card className={classes.card}>
          <div >
          {firstName?
           <CardContent>
                <Avatar className={classes.avatar} />
                  <Typography  variant="h5" className={classes.text}>
                    {firstName+"  "}{lastName}
                  </Typography>
                  <Typography variant="subtitle1" paragraph className={classes.emailText}>
                    {email}
                  </Typography>              
            </CardContent>: <h1>Loading</h1>}
          </div>          
        </Card>
                  
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography align="left" gutterBottom className={classes.textHeading}>
            My Profile 
          </Typography>
          <form            
            className={classes.form}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} gutterBottom>
                  First Name
                </Typography>
                <InputTextBox
                  variant="outlined"
                  id="firstName"                  
                  name="firstName"
                  disabled
                  fullWidth
                  value={firstName}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} gutterBottom>
                  Last Name
                </Typography>
                <InputTextBox
                  variant="outlined"
                  id="lastName"                 
                  name="lastName"                  
                  fullWidth
                  disabled
                  value={lastName}                  
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.typography} gutterBottom>
                  Email Address
                </Typography>
                <InputTextBox
                  variant="outlined"
                  id="email"                 
                  name="email"                  
                  fullWidth
                  disabled
                  value={email}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.typography} gutterBottom>
                  Mobile Number
                </Typography>
                <InputTextBox
                  variant="outlined"
                  fullWidth
                  name="telephone"                  
                  id="telephone"
                  disabled
                  value={telephone}                  
                />
              </Grid>            
            </Grid>
            <Grid item xs={12} md={3}>
            <Button
             type="submit"
             className={classes.button}
             component={RouterLink}
             to={`/traveller/editProfile/${uid}`}>
              Edit profile
              
            </Button>
            </Grid>
            <Box mt={2}></Box>            
          </form>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={3} component={Paper}  className={classes.image}></Grid>
    </Grid>
  );
};

export default TravellerProfile;
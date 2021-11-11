import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import image from "../../assets/images/homecover4.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import CoverPost from './../../components/travelCompo/coverPost';
import DashboardCard from "../../components/travelCompo/dashboardCard";
import Divider from '@material-ui/core/Divider';
import DashboardCategory from "../../components/travelCompo/dashboardCategory";
import Searchbar from "../../components/home/Searchbar";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { getPublishedDestinations } from './../../store/entities/destination';
import { PRIMARY } from "../../colors";
import TrendPlace from "../../components/travelCompo/trendPlace";

const logo = require("../../assets/images/logo.svg");

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",    
    
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
 
  text: {
    color: "white",
    fontFamily: "Roboto",
    margin: "40vh",
  },
  logo: {
    margin: theme.spacing(3, 0),    
  },
 
  card: {
    margin: theme.spacing(0, 0),
  },
  justify: {
    justifyContent: "center",
    margin: theme.spacing(3, 0),
  },
  styledText: {
    margin: theme.spacing(6, 8),
    justifyContent: "left",
    color: 'black',
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
   
  },
  stylishText: {
    margin: theme.spacing(6, 0),
    justifyContent: "left",
    color: PRIMARY,
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  upperbar: {
    margin: theme.spacing(0, 20),
    width: "100%",
  },
  space:{
    margin:theme.spacing(3,0)
  },
  searchbarSpace:{
    margin:theme.spacing(0,5)
  }
  
}));

const mainFeaturedPost = {
  title: "Welcome!",
  description:
    "Hi! Would you explore nature paradise in the world. Let's find the best trip in Sri Lanka.Let's make your best trip ever!.",
  image: `${image}`,
  imgText: "main image description",
};


const Traveller = (props) => {
  const classes = useStyles();
  useFirestoreConnect(["destinations"]);  
  const dest=useSelector(getPublishedDestinations); 
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <CoverPost post={mainFeaturedPost} />      
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={12} md={3} style={{border:"1px  #00CEC9"}}>
          <Grid className={classes.logo}>
            <img src={logo.default} alt="Logo" />
          </Grid>
          <Divider/>
          <Typography className={classes.styledText}>Trending Places</Typography>
          <TrendPlace post={dest}/>
          </Grid>
          <Grid container item xs={12} md={9} >
            <Grid container item xs={12} spacing={4} className={classes.searchbarSpace}>
            <Grid item  xs={12} md={3}>
            <Typography className={classes.stylishText}>
                  Discover the most enchanting place...
            </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
          {dest?<Searchbar data={dest}></Searchbar>:null}
          </Grid>
          </Grid>
          <Grid item xs={12}className={classes.space}> 
          <DashboardCategory/>
          </Grid> 
          <Grid item xs={12}>
          <DashboardCard />
          </Grid>
          </Grid>
      </Grid>
    </Grid>
  );
};

export default Traveller;

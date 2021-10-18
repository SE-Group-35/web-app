import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import image from "../../assets/images/homecover4.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Searchbar from "../../components/home/Searchbar";
import { PRIMARY } from "../../colors";
import ImageCard from "./../../components/home/Card";
import { useState } from "react";
import MainFeaturedPost from "./../../components/home/MainFeaturedPost";
import { Box } from "@material-ui/core";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { getPublishedDestinations } from './../../store/entities/destinations';

const postimage1 = require("../../assets/images/sigiriya.jpg");
const postimage2 = require("../../assets/images/sinharaja.jpg");
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
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontFamily: "Roboto",
    margin: "40vh",
  },
  logo: {
    margin: theme.spacing(-8, 0),
  },
  button: {
    width: "100%",
    height: "3rem",
    cursor: "pointer",
    backgroundColor: PRIMARY,
    color: "WHITE",
    "&:hover": {
      backgroundColor: PRIMARY,
    },
    fontSize: "1rem",
    border: 0,
    margin: theme.spacing(6, 0),
    border: "1px solid",
    borderColor: "PRIMARY",
    lineHeight: 1.5,
  },
  search: {
    margin: theme.spacing(6, 20),
    justifyContent: "left",
  },
  card: {
    margin: theme.spacing(-7, 0),
  },
  justify: {
    justifyContent: "center",
    margin: theme.spacing(3, 0),
  },
  styledText: {
    margin: theme.spacing(6, 0),
    justifyContent: "left",
    color: PRIMARY,
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  upperbar: {
    margin: theme.spacing(0, 0),
    width: "100%",
  },
  space:{
    margin:theme.spacing(4,0)
  }
}));

const mainFeaturedPost = {
  title: "Let's Make Your Best Trip Ever",
  description:
    "Hi! Would you explore nature paradise in the world. Let's find the best trip in Sri Lanka.Join with us!.",
  image: `${image}`,
  imgText: "main image description",
};

const newCard = [
  {
    title: "Sinharaja Rain Forest",

    description:
      "The value of Sinharaja as a natural World Heritage site continues to be recognized by the discovery of several endemic species of plants and animals with a huge diversity since the declaration of this forest as a World Heritage in 1988.",
    image: `${postimage2.default}`,
    imageText: "Continue reading ",
    imageLink: "/destination",
  },
  {
    title: "Sigiriya",
    description:
      "The capital and the royal palace were abandoned after the king's death. It was used as a Buddhist monastery until the 14th century. Sigiriya today is a UNESCO listed World Heritage Site. It is one of the best preserved examples of ancient urban planning.",
    image: `${postimage1.default}`,
    imageText: "Continue reading",
    imageLink: "https://en.wikipedia.org/wiki/Sinharaja_Forest_Reserves",
  },
];

const Home = (props) => {
  const classes = useStyles();
  useFirestoreConnect(["destinations"]);
  const dest=useSelector(getPublishedDestinations);
  

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid className={classes.upperbar}></Grid>
      <Grid container className={classes.image}>
        <MainFeaturedPost post={mainFeaturedPost} />
        <div className={classes.paper}>
          <Grid container spacing={3} className={classes.justify}>
            <Grid className={classes.logo}>
              <img src={logo.default} alt="Logo" />
            </Grid>
            <Grid container spacing={3} className={classes.search}>
              <Grid item xs={12} sm={3}>
                <Typography className={classes.styledText}>
                  Discover the most enchanting place...
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                {dest?<Searchbar data={dest}></Searchbar>:null}
              </Grid>
            </Grid>
            <Grid container spacing={4} className={classes.card}>
              {newCard.map((post) => (
                <ImageCard key={post.title} post={post} />
              ))}
            </Grid>
          </Grid> 
          <Box className={classes.space}><Box/>
            </Box>        
        </div>
      </Grid>      
    </Grid>
  );
};

export default Home;

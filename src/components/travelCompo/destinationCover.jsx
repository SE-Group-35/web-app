import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { WHITE } from "./../../colors";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  },
  overlay: {
    position: "relative",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.1)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10),
      paddingRight: 0,
    },    
  },
  navbar: {
    position: "relative",
    
    margin:theme.spacing(1,10)  
  },
  typology: {
    color: WHITE,
    fontStyle: "italic",
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: theme.spacing(1, 1),
    textDecorationLine: "underline",
    textDecorationColor: WHITE
  },
  
}));

export default function DestinationCover(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.mainPhoto})` }}
    >      
      {
        <img
          style={{ display: "none" }}
          src={post.mainPhoto}
          alt={post.imageText}
        />
      }
      <div className={classes.overlay} />
      <Grid className={classes.navbar} item xs={12}>
        
      </Grid>
      <Grid container> 
      {/* <Link href="/traveller" className={classes.typology}>
          {"Home"}
        </Link> */}
        <Grid item md={6}>          
          <div className={classes.mainFeaturedPostContent}>          
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.address}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

DestinationCover.propTypes = {
  post: PropTypes.object,
};

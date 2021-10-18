import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PRIMARY } from "../../colors";
import TextCard from "../home/eventCard";
import PropTypes from "prop-types";
import eventData from "../../mockdata/Event";

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
  card: {
    margin: theme.spacing(-5, 0),
  },
  styledText: {
    margin: theme.spacing(0, 0),
    justifyContent: "left",
    color: PRIMARY,
    fontSize: "2rem",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  mainFeaturedPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "50%",
  },
  textCard: {
    margin: theme.spacing(6, 0),
  },
}));

export default function EventCompo (props){
  const classes = useStyles();
  const {post}=props;
  console.log(post);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.image}>
        <Paper
          className={classes.mainFeaturedPost}
          style={{ backgroundImage: `url(${post.url})` }}
        ></Paper>
        <Typography className={classes.styledText}>
          {eventData.title}
        </Typography>
        <Grid className={classes.textCard}>
          <TextCard post={eventData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

EventCompo.propTypes = {
  post: PropTypes.object,
};

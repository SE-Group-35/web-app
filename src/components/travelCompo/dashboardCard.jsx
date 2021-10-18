import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InsideCard from "./insideCard";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { getEvents } from './../../store/entities/event';

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 100,
  },  
  styledText: {
    margin: theme.spacing(0,0),
    justifyContent: "left",
    color: 'black',
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
   
  },
  informText:{
    margin:theme.spacing(5,0),
    color:"black",
    fontSize:"1rem"
  }
}));

export default function DashboardCard() {
  const classes = useStyles();
  useFirestoreConnect(["events"]);
  
  const eventList= useSelector(getEvents);

  return (
    <Grid item xs={12}>     
      <Card className={classes.card}>          
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5" className={classes.styledText}>
              Upcomming events
            </Typography>
            <div className={classes.paper}>
            <Grid container spacing={3} className={classes.card}>
                {eventList ? eventList.map(post => 
                (post.published ?<InsideCard key={post.title} post={post} /> : null)
                  
                ):<Typography className={classes.informText}>Loading</Typography>}
              </Grid>
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

DashboardCard.propTypes = {
  post: PropTypes.object,
};

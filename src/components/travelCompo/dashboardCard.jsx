import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InsideCard from "./insideCard";
import eventList from "../../mockdata/eventList";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { getEvents } from './../../store/entities/events';

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
}));

export default function DashboardCard() {
  const classes = useStyles();  
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
                {eventList.map((post) => (
                  <InsideCard key={post.title} post={post} />
                ))}
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
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { PRIMARY } from "../../colors";
import Divider from '@material-ui/core/Divider';
import LongMenu from './menuIcon';



const moment=require("moment");

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 300,
  },
  text: {
    fontStyle:'italic',
    fontSize:'1.5rem',
    fontWeight:'bold',
    color:PRIMARY
  },
  styledText:{
    fontStyle:'italic',
    fontSize:'1rem',    
    color:'black',    
  },
  smallText:{
    fontStyle:'italic',
    fontSize:'0.8rem',    
    color:PRIMARY,  
    fontWeight:'bold',  
  },
  toText:{
    fontStyle:'italic',
    fontSize:'1rem',    
    color:PRIMARY,  
    fontWeight:'bold',  
  },
}));

export default function TripInsideCard(props) {
  const classes = useStyles();
  const { post } = props;
  const startDate = moment(new Date(post.startDate.seconds*1000)).format("DD-MMM-YYYY");
  const endDate = moment(new Date(post.endDate.seconds*1000)).format("DD-MMM-YYYY");
  const duration = (post.endDate-post.startDate)/3600/24;
  
  
  return (
    <Grid item xs={12} md={4}>
      <Card >
        <CardContent>
          <Grid container item xs={12}>
            <Grid item xs={12} md={11}>
              <Typography className={classes.text}>
                {post.name}
              </Typography>
              <Grid container xs={12}>
              <Grid item xs={12} md={4}>
              <Typography className={classes.styledText}>
                {startDate }  
              </Typography>
              </Grid>
              <Grid item xs={12} md={1}>
              <Typography className={classes.toText}>
                to  
              </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
              <Typography className={classes.styledText}>
                {endDate }
              </Typography>
              </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={1}>
              <LongMenu/>
            </Grid>
          </Grid>
          <Divider style={{padding:'5px'}}/>
        </CardContent>
        <CardActionArea component="a" href={post.link}>
          <CardMedia style={{padding:'3%'}}>
           <Grid container item xs={12}>
              <Grid item xs={12} md={9} >
                <Typography className={classes.styledText}>
                  Duration
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography className={classes.styledText}>
                  {duration >1 ? duration +" days ": duration + " day "}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12} md={9}>
                <Typography className={classes.styledText}>
                  Total Destinations
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography className={classes.styledText}>
                  {post.destinations.length}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
                {/* <Grid item xs={12} md={9}>
                  <Typography className={classes.styledText}>
                    Total Cost
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography className={classes.styledText}>
                    {post.cost}
                  </Typography>
                </Grid> */}
                <Typography className={classes.smallText}>
                  Click for more details
                </Typography>
            </Grid>
          </CardMedia>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

TripInsideCard.propTypes = {
  post: PropTypes.object,
};

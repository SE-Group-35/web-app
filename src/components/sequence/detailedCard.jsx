import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import { PRIMARY } from "../../colors";

const useStyles = makeStyles((theme) => ({
  card: {    
    display:'flex'
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 250,
  },
  text: {
    color: PRIMARY,
    padding: "1%",
    fontSize:"1rem"
  },
}));

export default function DetailedCard(props) {
  const classes = useStyles();
  const { post } = props;
  
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/destination/${post.destinationId}`} >
        <Card className={classes.card}>
          <Hidden xsDown>
          { <CardMedia
            component="img" 
            className={classes.cardMedia}          
            image={post.url}
            title={post.title}
          /> }
                        
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
            <Typography component="h2" variant="h5" className={classes.text}>
                {post.id}
              </Typography>
              <Typography component="h2" variant="h5" className={classes.text}>
                {post.title}
              </Typography>
              <Typography >
                Total Activities : {post.totalActivities}
              </Typography>
              <Typography >
                Time : {post.time}
              </Typography>
              <Typography
                variant="subtitle1"                
                className={classes.text}
              >
                Continue reading...
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

DetailedCard.propTypes = {
  post: PropTypes.object,
};

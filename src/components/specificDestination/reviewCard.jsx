import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PRIMARY } from "../../colors";
import Divider from '@material-ui/core/Divider';
import { getReviews } from "../../store/entities/destination";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import Rating from '@mui/material/Rating';

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  headingText: {
    margin: theme.spacing(0,0),
    justifyContent: "left",
    color: PRIMARY,
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
    padding:'1%'
  },
  styledText:{
    fontSize:'1rem',    
    color:'black',
    padding:'1%',
  },
}));


export default function ReviewCard(props) {
  const classes = useStyles();  
  const{id} = useParams(); 
    
  
    useFirestoreConnect([
      {
        collection : "destinations",
        doc : id,
        subcollections : [{
          collection : "reviews"
        }],
        storeAs : 'reviews'
      }
     
    ])
  const reviews = useSelector(getReviews);
  return (
    <Grid item xs={12}>     
      <Card className={classes.card} >
        <div className={classes.cardDetails}>
          <CardContent>          
            <Typography component="h2" variant="h5" className={classes.headingText}>
              Reviews
            </Typography>
            <Divider /> 
            <Typography className={classes.styledText}>
              {(reviews.length!=0 ? reviews.map((check) => ( 
                <Grid container item xs={12}>
                  <Grid item xs={12} md={1}>
                <Avatar>{check.userName[0].toUpperCase()}</Avatar>
                </Grid> 
                <Grid item xs={12} md={2}>                                            
                <Rating readOnly value={check.rating} style={{color:PRIMARY}}></Rating>
                </Grid>    
                <Grid item xs={12} md={2}>                                           
                <Typography>{check.userName}</Typography> 
                </Grid>
                <Grid item xs={12} md={7}>                                            
                <Typography>{check.comment}</Typography>
                </Grid>
                
                </Grid>
                )):<Typography className={classes.styledText}>
                      No reviews mentioned
                   </Typography>
              )}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

ReviewCard.propTypes = {
    post: PropTypes.object,
  };
  



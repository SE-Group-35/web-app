import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PRIMARY } from "../../colors";
import InsideCard from "./insideCard";
import TripInsideCard from './tripInsideCard';

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
  text: {
    color: PRIMARY,
    padding: "1%",
    fontSize:'1rem'
  },
  headingText: {
    margin: theme.spacing(0,0),
    justifyContent: "left",
    color: 'black',
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
    padding:'2%'
   
  },
  styledText:{
    fontStyle:'italic',
    fontSize:'1rem',    
    color:'black',
    padding:'2%',
     
  },
  
}));

export default function TripCard(props) {
  const classes = useStyles();
  const { post } = props;
  

  return (
    <Grid item xs={12}>     
      <Card className={classes.card} >
        <div className={classes.cardDetails}>
          <CardContent>          
            <Typography component="h2" variant="h5" className={classes.sheadingText}>
              {post.heading}
            </Typography>            
            <div className={classes.paper}>
              <Grid container spacing={3} className={classes.card}>
                {(post.listDetails.length!=0 ? post.listDetails.map((check) => (                    
                  <TripInsideCard key={check.title} post={check} />
                )):<Typography className={classes.styledText}>
                    You don't have any {post.heading}
                  </Typography>
                 )}
              </Grid>
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

TripCard.propTypes = {
  post: PropTypes.object,
};

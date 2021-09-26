import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PRIMARY } from "../../colors";
import SpecificDestinationDetail from './../../mockdata/specificDestination';
import Divider from '@material-ui/core/Divider';


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


export default function ActivityCard(props) {
  const classes = useStyles();
  
  return (
    <Grid item xs={12}>     
      <Card className={classes.card} >
        <div className={classes.cardDetails}>
          <CardContent>          
            <Typography component="h2" variant="h5" className={classes.headingText}>
              Activities
            </Typography>
            <Divider /> 
            <Typography className={classes.styledText}>
              {(SpecificDestinationDetail.activities.length!=0 ? SpecificDestinationDetail.activities.map((check) => (                    
                <Typography>{check}</Typography>
                )):<Typography className={classes.styledText}>
                      No activities mentioned
                   </Typography>
              )}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

ActivityCard.propTypes = {
    post: PropTypes.object,
  };
  



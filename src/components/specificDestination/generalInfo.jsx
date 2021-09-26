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
    height:'25vw',
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
    color: PRIMARY,
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
    padding:'1%'
  },
  styledText:{
    fontStyle:'italic',
    fontSize:'1rem',    
    color:'black',
    padding:'2%',
  },
  
}));

export default function GeneralInfo(props) {
  const classes = useStyles();
  const { post } = props;
  
  return (
    <Grid item xs={12}>     
      <Card className={classes.card} >
        <div className={classes.cardDetails}>
          <CardContent>          
            <Typography component="h2" variant="h5" className={classes.headingText}>
              General Information
            </Typography>  
            <Divider />          
            <div className={classes.paper}>
              <Grid container spacing={3}item xs={12}>
                <Grid item xs={12} md={5}>
                  <Typography className={classes.styledText}>
                    Address
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography className={classes.styledText}>
                      {SpecificDestinationDetail.address}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}item xs={12}>
                <Grid item xs={12} md={5}>
                  <Typography className={classes.styledText}>
                    Area
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography className={classes.styledText}>
                    {SpecificDestinationDetail.area}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}item xs={12}>
                <Grid item xs={12} md={5}>
                  <Typography className={classes.styledText}>
                    Longitude
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography className={classes.styledText}>
                    {SpecificDestinationDetail.longitude}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}item xs={12}>
                <Grid item xs={12} md={5}>
                  <Typography className={classes.styledText}>
                    Landitude
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography className={classes.styledText}>
                    {SpecificDestinationDetail.langitude}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

GeneralInfo.propTypes = {
  post: PropTypes.object,
};

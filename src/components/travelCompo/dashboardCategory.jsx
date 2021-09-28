import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PRIMARY } from "../../colors";
import InsideCard from "./insideCard";
//import categoryList from "../../mockdata/categoryList";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { getCategory  } from './../../store/entities/category';

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

export default function DashboardCategory() {
  const classes = useStyles();
  useFirestoreConnect(["categories"]);
  
  const categoryList= useSelector(getCategory);

  return (
    <Grid item xs={12}>     
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5" className={classes.styledText}>
              Destination Categories
            </Typography>
            <div className={classes.paper}>
              <Grid container spacing={3} className={classes.card}>
                {categoryList ? categoryList.map(post =>
                  <InsideCard key={post.title} post={post} />
                  ):<Typography className={classes.informText}>Loading</Typography>}
              </Grid>
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

DashboardCategory.propTypes = {
  post: PropTypes.object,
};

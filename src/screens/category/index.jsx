import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PRIMARY, WHITE } from "../../colors";
import CategoryCard from "../../components/home/categoryCard";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Link from "@material-ui/core/Link";
import { useParams } from 'react-router-dom';
import { getDestinations } from "../../store/entities/destination";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },

  card: {
    margin: theme.spacing(-15, 10),
  },

  styledText: {
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
    height: "60%",
  },
  typography: {
    margin: theme.spacing(-10, 10),
  },
  space: {
    margin: theme.spacing(6, 0),
  },
  styleText:{
    fontStyle:'italic',
    fontSize:'1.3rem',
    fontWeight:'bold',
    color:WHITE, 
    textDecorationLine:'underline'  
  },
}));

const Category = (props) => {
  const classes = useStyles();
  const{id} = useParams(); 
 
  
  useFirestoreConnect([{collection:"categories", doc:id}]);  
  const category = useSelector(
    ({ firestore: { data } }) => data.categories && data.categories[id]);
   
  useFirestoreConnect(["destinations"]) ;
  const destinationList=useSelector(getDestinations); 

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {category? <Grid container className={classes.image}>
        <Paper
          className={classes.mainFeaturedPost}
          style={{ backgroundImage: `url(${category.url})`}}
        >
        </Paper>
        <Grid className={classes.typography}>
          <Typography className={classes.styledText}>
            {category.title}
          </Typography>
        </Grid>
      </Grid>:<h1>Loading</h1>}
      <Grid item xs={12} className={classes.card}>
        {destinationList? destinationList.map((post) => (
          (post.categories.find(element=>element===category.title)?<Grid className={classes.space}>
            <CategoryCard key={post.title} post={post} />
          </Grid> :null)
        )):null}
      </Grid>
    </Grid>
  );
};

export default Category;
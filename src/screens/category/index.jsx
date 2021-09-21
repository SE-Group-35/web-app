import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PRIMARY } from "../../colors";
import categoryData from "../../mockdata/Category";
import CategoryCard from "../../components/home/categoryCard";
import destinationData from "../../mockdata/destination";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
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
}));

const Category = (props) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.image}>
        <Paper
          className={classes.mainFeaturedPost}
          style={{ backgroundImage: `url(${categoryData.coverImage})` }}
        ></Paper>
        <Grid className={classes.typography}>
          <Typography className={classes.styledText}>
            {categoryData.title}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.card}>
        {destinationData.map((post) => (
          <Grid className={classes.space}>
            <CategoryCard key={post.title} post={post} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Category;

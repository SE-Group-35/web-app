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
import Rating from '@mui/material/Rating';

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
    color: PRIMARY,
    padding: "1%",
  },
}));

export default function CategoryCard(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12}>
      <CardActionArea component="a" href={`/destination/${post.id}`} >
        <Card className={classes.card}>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={post.mainPhoto}
              title={post.title}
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5" className={classes.text}>
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Grid container item xs={12}>
                <Grid item xs={12} md={1}>
              <Typography
                variant="subtitle1"                
                className={classes.text}
              >
                Rating : 
              </Typography>
              </Grid>
              <Grid item xs={12} md={2}>
              <Rating readOnly value={post.rating} style={{color:PRIMARY}}></Rating>
              </Grid>
              </Grid>
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

CategoryCard.propTypes = {
  post: PropTypes.object,
};

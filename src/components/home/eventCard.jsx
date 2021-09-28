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

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  text: {
    color: PRIMARY,
    padding: "1%",
  },
});

export default function TextCard(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5" className={classes.text}>
              Description
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.overview}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              className={classes.text}
            >
              {post.imageText}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

TextCard.propTypes = {
  post: PropTypes.object,
};

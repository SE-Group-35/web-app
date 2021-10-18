import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { PRIMARY } from "../../colors";


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
  styledText:{
    fontStyle:'italic',
    fontSize:'1rem',
    fontWeight:'bold',
    color:PRIMARY
  }
}));

export default function InsideCategory(props) {
  const classes = useStyles();
  const { post } = props;
 

  return (
    <Grid item xs={12} md={4}>
      <Card >
        <CardActionArea component="a" href={`/category/${post.id}`} >
          { <CardMedia
            component="img"
            height="150"
            image={post.url}
          /> }
          <CardContent>
            <Typography className={classes.styledText}>
              {post.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

InsideCategory.propTypes = {
  post: PropTypes.object,
};

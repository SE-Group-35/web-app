import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { PRIMARY } from '../../colors';


const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex', 
       
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 400,
  },
  text: {
    color: PRIMARY,
    padding:'1%'
  }, 
  
}));

export default function CategoryCard(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12}>     
      <CardActionArea component="a" href="#">
      
        <Card className={classes.card}>
        <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5" className={classes.text}>
                {post.title}
              </Typography>              
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary" className={classes.text}>
               Rating : {post.rating}
              </Typography>
              <Typography variant="subtitle1" color="primary" className={classes.text}>
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
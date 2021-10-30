import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PRIMARY } from "../../colors";
import Divider from '@material-ui/core/Divider';
import { getImages } from "../../store/entities/destination";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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


export default function GalleryCard(props) {
  const classes = useStyles();  
  const{id} = useParams(); 
    
  
  useFirestoreConnect([
    {
      collection : "destinations",
      doc : id,
      subcollections : [{
        collection : "gallery",        
      }],
      storeAs : 'gallery'
    }
   
  ])
  const images = useSelector(getImages);  
  //const urls= images[0].urls;
  //console.log(images[0].urls);
  return (
    <Grid item xs={12}>     
      <Card className={classes.card} >
        <div className={classes.cardDetails}>
          <CardContent>          
            <Typography component="h2" variant="h5" className={classes.headingText}>
              Gallery
            </Typography>
            <Divider /> 
            <Typography className={classes.styledText}>
            <ImageList sx={{ width: "100%", height: "100%" }} variant="woven" cols={4} rowHeight="25%">
              {(images[0].urls.length!=0 ? images[0].urls.map((check) => ( 
                <Grid container item xs={12}>
                   <ImageListItem key={check}>
                        <img src={check} style={{width:"25vw",height:"25vh"}}/>
                    </ImageListItem> 
                 </Grid>
                )):<Typography className={classes.styledText}>
                      No Images included
                   </Typography>
              )}
              </ImageList>
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

GalleryCard.propTypes = {
    post: PropTypes.object,
  };
  



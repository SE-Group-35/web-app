import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import image from '../../assets/images/homecover4.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Searchbar from '../../components/home/Searchbar';
import { PRIMARY} from '../../colors';
import Button from '@material-ui/core/Button';
import ImageCard from './../../components/home/Card';
import Upperbar from './../../components/home/Upperbar';
import { useState } from 'react';
import MainFeaturedPost from './../../components/home/MainFeaturedPost';



const postimage1 = require('../../assets/images/sigiriya.jpg');
const postimage2 = require('../../assets/images/sinharaja.jpg');
const logo = require('../../assets/images/logo.svg');

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
      image: {          
          backgroundRepeat: 'no-repeat',      
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          
      },
      paper: {
          margin: theme.spacing(8, 4),
          display: 'flex',
          flexDirection: 'column',
      },
      text: {
        color: 'white',
        fontFamily: 'Roboto',
        margin: '40vh',
      },
      logo: {         
        margin: theme.spacing(-6,0) 

    },
    button: {
        width: '100%',
        height: '3rem',
        cursor: 'pointer',
        backgroundColor: PRIMARY,
        color: 'WHITE',
        '&:hover': {
          backgroundColor: PRIMARY,
          
        },
        fontSize: '1rem',
        border: 0,        
        margin: theme.spacing(6, 0),
        border: '1px solid',
        borderColor: 'PRIMARY',
        lineHeight: 1.5,
        
    },
    search: {
        margin: theme.spacing(4, 10),
        justifyContent: 'center'
    },
    card: {
        margin: theme.spacing(0, 5),
    },
    justify: {
      justifyContent: 'center'
    },
    styledText: {
      margin: theme.spacing(6, 0),
      justifyContent: 'left',
      color: PRIMARY,
      fontSize: '1.3rem',
      fontStyle: 'italic',
      fontWeight: 'bold'
    }
  
}));

const mainFeaturedPost = {
    title: "Let's Make Your Best Trip Ever",
    description:
      "Hi! Would you explore nature paradise in the world. Let's find the best trip in Sri Lanka.Join with us!.",
    image: `${image}`,
    imgText: 'main image description',
    
  };

  const newCard = [
    {
      title: 'Sinharaja Rain Forest',
      
      description:
        "The value of Sinharaja as a natural World Heritage site continues to be recognized by the discovery of several endemic species of plants and animals with a huge diversity since the declaration of this forest as a World Heritage in 1988.",
      image: `${postimage2.default}`,
      imageText: 'Image Text',
    },
    {
      title: 'Sigiriya',      
      description:
        "The capital and the royal palace were abandoned after the king's death. It was used as a Buddhist monastery until the 14th century. Sigiriya today is a UNESCO listed World Heritage Site. It is one of the best preserved examples of ancient urban planning.",
      image: `${postimage1.default}`,
      imageText: 'Image Text',
    },
  ];
 
const searchHandler = () => {

};
const sections = [
  { title: 'About Us', url: '#' },
  { title: 'Services', url: '#' },
  { title: 'Register', url: '#' },
  { title: 'Login', url: '#' },
  
];


const Home = (props) => {
    const classes = useStyles();
    const [ search, setSearch ] = useState(false);

    return ( 
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid container  className={classes.image} >          
          <MainFeaturedPost post={mainFeaturedPost} > 
            <Upperbar/>
          </MainFeaturedPost>    
          <div className={classes.paper}>
            <Grid container spacing={3} className={classes.justify}>
              <Grid className={classes.logo}>
                <img src = {logo.default} alt = 'Logo' />
              </Grid >
              <Grid container spacing={3}>
                <Grid container spacing={3} className={classes.search}>
                  <Grid item xs={12} sm={3} >
                    <Typography className={classes.styledText}>Discover the most enchanting places...</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} >
                    <Searchbar></Searchbar>
                  </Grid>
                  <Grid item sm={2}>
                    <Button variant="contained" type = 'submit' className = {classes.button} onClick = {searchHandler}>             
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              {newCard.map((post) => (
                <ImageCard key={post.title} post={post} />
              ))}
            </Grid>
          </div>
        </Grid> 
      </Grid>
     );
}
 
export default Home;
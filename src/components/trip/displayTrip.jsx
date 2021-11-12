import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { PRIMARY, WHITE } from "../../colors";
import { getAuth } from "../../store/auth";
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import DetailedCard from "../../components/sequence/detailedCard";
import { Box } from "@material-ui/system";
import { useLocation } from 'react-router-dom';
import image from "../../assets/images/diary.jpg";
import DirectionMap from "../../components/sequence/direction";
import CheckList from "./checkList";
import ViewCheckList from './viewList';
import { useFirestoreConnect } from 'react-redux-firebase';
import { getCheckList } from "../../store/entities/trip";
import JournalView from "./viewJournal";
import Journal from './journal';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Container} from "react-bootstrap";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updateJournal } from '../../store/entities/trip';

const logo = require("../../assets/images/logo.svg");
const moment=require("moment");

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },  
  logo: {
    margin: theme.spacing(7, 0),
  },  
  card: {
    display: "flex",    
    margin : theme.spacing(0,0) ,
    padding:'1%'  
  }, 
  styledText:{
    fontSize:'1.5rem',
    fontWeight:'bold',
    color:WHITE,       
  }, 
  appbar :{
      width : "100vw",
      height:'10%',
      marginRight: "75%",
      position:"relative"
  },
  stylishText: {
    fontSize:'1rem',
    fontWeight:'bold',
    color:PRIMARY,
    fontStyle:"italic",
    padding:'5%',
    margin:theme.spacing(-5,0)
  },
  space :{
      margin:theme.spacing(10,0)
  },
  lastGrid:{
    margin:theme.spacing(10,10)
  },
  button: {
    width: "100%",
    height: "3rem",
    cursor: "pointer",
    backgroundColor: PRIMARY,
    color: WHITE,
    fontSize: "1.5rem",
    border: 0,
    marginTop: "3rem",
    '&:hover': {
        backgroundColor: PRIMARY,
        color: WHITE,
    },
  },
  tripText:{    
      fontSize:'1.5rem',
      fontWeight:'bold',
      color:PRIMARY,
      fontStyle:"italic",
     
      margin:theme.spacing(5,25)
  },
  dialog:{
    margin:theme.spacing(10,0)
  },
  image: {
    backgroundImage: `url("${image}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: "2rem",
    display: "block",
  },
  typography: {
    fontWeight: "bold",
    fontSize: "1rem",
    display: "block",
    color: PRIMARY,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  logoforForm: {
    margin: theme.spacing(0, -4),
  },
  journalcard: {    
    display:'flex',
    margin:theme.spacing(5,20)
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 250,
    height:200
  },
  text: {
    color: PRIMARY,
    padding: "1%",
    fontSize:"1rem"
  },
  journalText:{
    fontSize:"1.7rem",
    color:"black",
    margin:theme.spacing(0,30),
    padding:"2%",
    
  },
  logospace:{
    margin:theme.spacing(0,15)
  }
  
}));

const TripDisplay = () => {
  const classes = useStyles();    
  const {uid}=useSelector(getAuth);
  const dispatch=useDispatch(); 
  const [open, setOpen] = useState(false);   
  const location=useLocation();
  const tripId=location.state.id;  
  console.log(typeof(location.state.journal));
  const [show, setShow] = useState('');
  const [journal,setJournal]=useState(true);
  
  //console.log(uid);
  const startDate = moment(new Date(location.state.startDate.seconds*1000)).format("DD-MMM-YYYY");
  const endDate = moment(new Date(location.state.endDate.seconds*1000)).format("DD-MMM-YYYY");
    
  useEffect(() => {
    if(location.state.journal===""){
      setJournal(true);
    }else{
      setJournal(false);
    }  
   
   },[]);
  
  const handleClick=()=>{
    setJournal(false);
        dispatch(updateJournal(tripId,location.state.destinations,endDate,startDate,uid,location.state.name,location.state.startLocation,location.state.travelMode,show));
        setOpen(false); 
             
  };
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  //console.log(location.state); details of corresponding trip

  useFirestoreConnect([
    {
      collection : "users",
      doc : uid,
      subcollections : [
        {
        collection : "trips",
        doc:tripId
        },
        {
        collection : "checklists",
        }
    ],
      storeAs : 'checklists'
    }
  ])
  
  const checkList=useSelector(getCheckList);  
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
        <AppBar >
            <Toolbar >
              <Grid container item xs={12}>
                <Grid item xs={12} md={5}>
              <Link href={`/traveller/${uid}`}>
                <Typography className={classes.styledText}>
                    Home
                </Typography>
               </Link>
               </Grid>
               <Grid item xs={12} md={6}>
               <Typography className={classes.styledText}>
               {location.state.name}
                </Typography>
                </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        
        <Grid container item xs={12} className={classes.space} >
            <Grid item xs={12} md={9} >
              {location.state?<div style={{ width: "73vw", height: "60vh" }}>                 
                 <DirectionMap post={location.state.destinations} start={location.state.startLocation}/>                
                </div>  :<h1></h1>}
            </Grid>         
            <Grid item xs={12} md={3}>
                <img src={logo.default} alt="Logo"className={classes.logo} />
                <Typography className={classes.stylishText}>"Do not follow where the path may lead. Go instead where there is no path and leave a trail..."</Typography>
                <Grid className={classes.dialog}>
                  <Grid container item xs={12}>
                    {checkList.length===0?<Grid item xs={12} md={6}>
                    <CheckList post={tripId} />
                    </Grid>:
                    <Grid item xs={12} md={6}>
                    <ViewCheckList lis={checkList} post={tripId} />
                    </Grid>}
                  </Grid>
                </Grid>
            </Grid>               
        </Grid>          
        <Grid container spacing={3} className={classes.card}>
          {location.state.destinations ? location.state.destinations.map((post,index) =>
            <DetailedCard key={post.id} post={post} num={index} />
          ):<Typography className={classes.informText}>Loading</Typography>}
        </Grid>
        <Grid item xs={12}  >     
        <Card className={classes.journalcard}>          
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography className={classes.journalText}>...Let's Make My Journal...</Typography>
              <Typography component="h2" variant="h5" className={classes.text}>
                 “Travel is fatal to prejudice, bigotry, and narrow-mindedness, and many of our people need it sorely on these accounts. Broad, wholesome, charitable views of men and things cannot be acquired by vegetating in one little corner of the earth all one's lifetime.”
              </Typography>
              <Grid  >                
                {location.state? 
                  <Grid >                                      
                    {journal?
                    <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                    Add Journal
                    </Button>
                    <Dialog open={open} onClose={handleClose} >
                    <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={12}  component={Paper} elevation={6} square>
                      <div className={classes.paper}>
                        <Grid  item md={7} className={classes.logospace}>
                          <img src={logo.default} alt="Logo" />
                        </Grid>          
                      <div>
                      <Grid>
                        <Container>
                          <ReactQuill className="shadow-sm"
                            theme="snow"
                            style={{
                            height: 350,
                            marginTop: '1rem',
                            display: 'flex',
                            flexDirection: 'column'
                            }}
              
                             value={show}
              
                            modules={{
                              toolbar: [
                                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }], [{size: []}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{'align': []}],
                                [{ 'color': [] }, { 'background': [] }],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link', "video","image", "code-block"],
                                ['clean']
                              ],
                             }}
                            formats={[
                                'header', 'font', 'size',
                                'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background',
                                'list', 'bullet', 'indent', 'link', 'video', 'image', "code-block", "align"
                            ]}
                            onChange={(val) => {
                            setShow(val)
                            }}
                          />
                             {/* <div dangerouslySetInnerHTML={{__html: show}}>
                              
                              </div> */}
                        </Container>
                      </Grid>
                     </div>
                   </div>
                    <Grid>
                    <button type="submit" className={classes.button} onClick={handleClick}>
                      Save
                    </button>
                  </Grid>
                 </Grid>
                 </Grid>
                </Dialog>
                </div>
                    // <Journal post={location.state} tripId={tripId}/>
                    :<JournalView post={location.state} tripId={tripId}/>}
                  </Grid>
                :<h1></h1>}
              </Grid>             
            </CardContent>
          </div>
        </Card>
      </Grid>
      <Box mt={2}></Box>
      <Box mt={2}></Box>
    </Grid>
  );
};

export default TripDisplay;
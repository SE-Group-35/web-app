import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import {Container} from "react-bootstrap";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import { PRIMARY, WHITE } from "../../colors";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from 'react-redux';
import { updateJournal } from '../../store/entities/trip';
import { getAuth } from '../../store/auth';
import { useSelector } from 'react-redux';

const logo = require("../../assets/images/logo.svg");
const moment=require("moment");

const useStyles = makeStyles((theme) => ({
    
    root: {
      height: "100vh",
    },    
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
    },
    typography: {
      fontWeight: "bold",
      fontSize: "1rem",
      display: "block",
      color: PRIMARY,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },    
    logo: {
      margin: theme.spacing(0, 12),      
    },    
    space:{
        margin:theme.spacing(4,0)
    },
    button: {
        width: "100%",
        height: "3rem",
        cursor: "pointer",
        margin:theme.spacing(0,0),
        backgroundColor: PRIMARY,
        color: WHITE,
        fontSize: "1.3rem",
        border: 0,
        marginTop: "3rem",
        '&:hover': {
            backgroundColor: PRIMARY,
            color: WHITE,
        },
      },
      
}));  
export default function Journal(props) {
  
  const [open, setOpen] = useState(false);  
  const classes = useStyles();
  const dispatch=useDispatch();
  const {uid}=useSelector(getAuth);
  const [show, setShow] = useState('');
  const {post,tripId}=props;
  //console.log(uid);
  const startDate = moment(new Date(post.startDate.seconds*1000)).format("DD-MMM-YYYY");
  const endDate = moment(new Date(post.endDate.seconds*1000)).format("DD-MMM-YYYY");
    
  const handleClick=()=>{
        dispatch(updateJournal(tripId,post.destinations,endDate,startDate,uid,post.name,post.startLocation,post.travelMode,show));
        setOpen(false);       
  };
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      Add Journal
      </Button>
      <Dialog open={open} onClose={handleClose} >
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12}  component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid className={classes.logo} item md={7}>
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
  );
}
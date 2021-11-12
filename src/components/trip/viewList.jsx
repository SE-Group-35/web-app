import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import { PRIMARY, WHITE } from "../../colors";
import Paper from "@material-ui/core/Paper";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@iconify/icons-eva/plus-outline";
import RemoveIcon from "@iconify/icons-eva/minus-outline";
import {Stack } from "@material-ui/core";
import { Icon } from "@iconify/react";
import {IconButton} from "@material-ui/core";
import { useEffect } from 'react';
import { getAuth } from '../../store/auth';
import { useSelector } from 'react-redux';
import { updateCheckList } from '../../store/entities/trip';

const logo = require("../../assets/images/logo.svg");

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
export default function ViewCheckList(props) {
  const dispatch=useDispatch();
  const {uid}=useSelector(getAuth);
  const {post,lis}=props;  
  console.log(lis[0].id);//tripId
  console.log("lis",lis[0].backpack);
  const [open, setOpen] = useState(false);  
  const classes = useStyles();
  const [initial,setInitial]=useState(false);
  const [inputList, setInputList] = useState([]);
   const [check,setCheck]=useState([]); 
   const [textField,setTextField]=useState([]);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), check: false, checkItem: "" },
  ]);  
  const[checked,setChecked] = useState(false);
 
  useEffect(() => {
    {lis[0].backpack.map((val,index) =>         
      inputList.push({ id: index, check: val.ischecked, checkItem: val.item })   
      )};

    {lis[0].backpack.length>0 ? lis[0].backpack.map((val,index) =>         
      textField.push(val.item)  
      ):<h1></h1>} ;
        
    {lis[0].backpack.length>0 ? lis[0].backpack.map((val,index) =>         
      check.push(val.ischecked)  
      ):<h1></h1>};  
   
   }, []);
  
   
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  
  const handleBox = (event) => {
    console.log(event.target.checked);
  };

  const handleTextField = (event,id) => {   
    textField[id]=event.target.value;
    const newInputFields = inputList.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;                      
      }
      return i;
      });

      setInputList(newInputFields);
    };

  const handleCheckBox = (event,id) => { 
  check[id]=event.target.checked; 
    const newInputFields = inputList.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.checked;                      
      }
      return i;
    });

    setInputList(newInputFields);
    console.log(inputList);      
     
  };

  const handleChangeInput = (id, event) => {         
      const newInputFields = inputFields.map((i) => {
        if (id === i.id) {
          i[event.target.name] = event.target.value;                      
        }
        return i;
      });

      setInputFields(newInputFields);
      console.log(inputFields);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), check: false, checkItem: "" },
    ]);
  };

  const handleChangeBox = (event,id) => {     
    setChecked(event.target.checked);
  
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.checked;                      
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleButtonClick =()=>{
    if(inputFields[0].checkItem!=""){
      const concatedList=[...inputList,...inputFields];    
      dispatch(updateCheckList(uid,post,lis[0].id,concatedList));
    }else{
      dispatch(updateCheckList(uid,post,lis[0].id,inputList));
    }
  setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      ViewCheck List
      </Button>
      <Dialog open={open} onClose={handleClose} >
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12}  component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid className={classes.logo} item md={7}>
            <img src={logo.default} alt="Logo" />
          </Grid>
          <Grid item xs={12} className={classes.space}>
            <Typography align="left" className={classes.typography} gutterBottom>
              Check List
            </Typography>         
          {lis[0].backpack.length>0 ? lis[0].backpack.map((val,index) =>                   
              <Grid container item xs={12} key={index} spacing={2}>
                <Grid item xs={12} md={1}>
                  <input
                    type="checkbox"
                    name="check"                  
                    value={val.ischecked} 
                    checked={check[index]}                                                         
                    style={{color:PRIMARY}}
                    onChange={(event)=>
                      handleCheckBox(event,index)}
                  />
                </Grid>

                <Grid item xs={12} md={11}>
                  <TextField
                    name="checkItem"
                    onChange={(event)=>
                      handleTextField(event,index)}
                    
                    value={textField[index]}               
                  />
                </Grid>
              </Grid>
            ):<h1></h1>}
          
          
          <Grid className={classes.space}>
          
          <div>
          {inputFields.map((inputField) => (
            <div key={inputField.id}>
              <Stack direction="row" spacing={3}>
                <Grid >
                  <input                  
                    type="checkbox"
                    name="check"                  
                    value={inputField.check}
                    onChange={(event)=>
                      handleChangeBox(event,inputField.id)}
                  />
                </Grid>

                <TextField
                  name="checkItem"
                  label="Enter Item"
                  multiline                 
                  value={inputField.checkItem}
                  onChange={(event) =>
                    handleChangeInput(inputField.id, event)
                  }
                />
                <IconButton
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                <Icon icon={RemoveIcon} width={20} height={20} />
                </IconButton>
                <IconButton onClick={handleAddFields}>
                <Icon icon={AddIcon} width={20} height={20} />
                </IconButton>
              </Stack>
            </div>
          ))}
          <button type="submit" className={classes.button} onClick={handleButtonClick}>
              Add
          </button>
          <Box mt={2}></Box> 
        </div>
        </Grid>
        </Grid>
      </div>
    </Grid>
    </Grid>
    </Dialog>
  </div>
  );
}
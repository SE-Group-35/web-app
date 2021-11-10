import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {Button, IconButton, TextField} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@iconify/icons-eva/plus-outline";
import RemoveIcon from "@iconify/icons-eva/minus-outline";
import { makeStyles } from "@material-ui/styles";
import {Stack } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
  import { Icon } from "@iconify/react";
import { PRIMARY, WHITE } from './../../colors';
import { useDispatch } from "react-redux";
import { addCheckList } from "../../store/entities/trip";
import { getAuth } from "../../store/auth";
import { useSelector } from "react-redux";

  const useStyles = makeStyles((theme) => ({
    checkBox: {
      color:PRIMARY ,
      margin:theme.spacing(10,0) 
    },
    button: {
        width: "100%",
        height: "3rem",
        cursor: "pointer",
        backgroundColor: PRIMARY,
        color: WHITE,
        fontSize: "1.3rem",
        border: 0,
        marginTop:"3rem",
        margin:theme.spacing(0,15),
      },
}));

export default function AddInputField(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {uid}=useSelector(getAuth);
    const tripId = props.post;
    const[checked,setChecked] = useState(false);
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), check: false, checkItem: "" },
    ]);

    const handleChangeInput = (id, event) => {
      const newInputFields = inputFields.map((i) => {
        if (id === i.id) {
            i[event.target.name] = event.target.value;                      
        }
         return i;
        });
      setInputFields(newInputFields);
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
      dispatch(addCheckList(uid,tripId,inputFields));
    };
   

    return (
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
          <Grid item xs={12} md={6}>
            <button type="submit" className={classes.button} onClick={handleButtonClick}>
              Add
            </button>
          </Grid>
          <Box mt={2}></Box> 
        </div>
    );
}
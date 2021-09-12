import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { useState } from 'react';
import { PRIMARY} from '../../colors';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';




const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1%',
    display: 'flex',
    alignItems: 'center',    
    margin: theme.spacing(5, 0),
    height: '3.1rem'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    borderWidth:'6',
    borderColor: 'PRIMARY',    
  },
  search: {
    margin: theme.spacing(4, 12),
    justifyContent: 'center'
  },
  searchIcon: {
    color: PRIMARY,    
  },
  list: {
    width: '100%',    
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(-6, 0),
    position: 'relative',    
  },
  text: {
    fontSize:'1rem',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },  
  
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Searchbar({data}) {
  const classes = useStyles();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
 
  
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
      <Grid container spacing={0} >
        <Grid item xs={12} sm={10} >
          <Paper component="form" className={classes.root}>   
            <InputBase
              variant="contained"        
              className={classes.input}
              placeholder="Search Your Destination"
              type="text"
              value={wordEntered}
              onChange={handleFilter}        
            />
            <div className={classes.searchIcon} >
              {wordEntered.length === 0 ? (
                <SearchIcon/>
              ) : (
                <CloseIcon  onClick={clearInput} />
              )}
            </div>
          </Paper>
          <Grid item xs={12}>
            {filteredData.length != 0 && (
              <List className={classes.list}> 
                {filteredData.map((value,key) => {
                  return ( <ListItemLink href={value.link} target="_blank"><p className={classes.text}>{value.title}</p></ListItemLink>);
                })}
              </List>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
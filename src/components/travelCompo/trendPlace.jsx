import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TrendingCard from "../../components/home/trndingCard";
import { PRIMARY } from "../../colors";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",  
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
  text: {
    color: "white",
    fontFamily: "Roboto",
    margin: "40vh",
  },
  logo: {
    margin: theme.spacing(3, 0),    
  },
 card: {
    margin: theme.spacing(0, 0),
  },
  justify: {
    justifyContent: "center",
    margin: theme.spacing(3, 0),
  },
  styledText: {
    margin: theme.spacing(6, 8),
    justifyContent: "left",
    color: 'black',
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",   
  },
  stylishText: {
    margin: theme.spacing(6, 0),
    justifyContent: "left",
    color: PRIMARY,
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  upperbar: {
    margin: theme.spacing(0, 20),
    width: "100%",
  },
  space:{
    margin:theme.spacing(3,0)
  },
  searchbarSpace:{
    margin:theme.spacing(0,5)
  }
  
}));



const TrendPlace = (props) => {
  const classes = useStyles();
  const {post}=props;   
  const lis=[];
  const popular=[]; 
  let sortedList=[];

  if(post.length>0){    
    for(let i=0;i<post.length;i++){        
        lis.push({id:post[i].id,rating:post[i].rating});        
    }
    let i=lis.length;  
    
    while(i>0){
        const check=Math.max(...lis.map(o => o.rating));
        const index = lis.findIndex(x => x.rating ===check);        
        const placeId=lis[index].id;
        post.map(element=>{
            if(element.id===placeId){
                popular.push(element);
            }
        })
        lis.splice(index,1);
        i--;
    }
  }
  if(popular.length>4){
   sortedList=popular.slice(0,4);
  }else{
    sortedList=popular;
  }
  
  return (
    
         <Grid item xs={12} className={classes.card}>
            {sortedList.map((post) => (
                <Grid className={classes.space}>
                    <TrendingCard key={post.title} post={post} />
                </Grid>
            ))}
        </Grid>
   );
};

export default TrendPlace;

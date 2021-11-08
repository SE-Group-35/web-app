import React, { useState, useEffect } from "react";
import {withGoogleMap, withScriptjs, GoogleMap, Marker,  InfoWindow,DirectionsRenderer} from "react-google-maps";
import image from '../../assets/images/register.PNG';
import { makeStyles } from "@material-ui/styles";
import { DetailedList } from "./detailedList";
import { PRIMARY } from "../../colors";

const useStyles = makeStyles((theme) => ({
    marker: {
      backgroundImage:{image},
    },
    text: {
        fontSize:'1rem',
        color: PRIMARY
    },
    smallText : {
        fontSize:'1rem',
        fontWeight:"bold",
        color:PRIMARY
    }
}));    

function MapMarker(props) {
    const classes = useStyles();
    const [selectedPark, setSelectedPark] = useState(null);
    const {post} = props;
    console.log("Map",parseFloat(post[0].coords[0]));
    console.log("Map",parseFloat(post[0].coords[1]));

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  
    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 7.00, lng: 81.00 }}
        >
        {post.map((park,index) => (
            <Marker 
            key={park.id}
            position={{
              lat: parseFloat(park.coords[0]),
              lng: parseFloat(park.coords[1])
            }}
            onClick={() => {
                setSelectedPark(park);
            }}
            />          
                            
        ))}
        {selectedPark && (
            <InfoWindow
            onCloseClick={() => {
                setSelectedPark(null);
            }}
            position={{
              lat: parseFloat(selectedPark.coords[0]),
              lng: parseFloat(selectedPark.coords[1])
            }}
            >
            <div>
                <h2 className={classes.text}>{selectedPark.index}</h2>
                <p className={classes.smallText}>{selectedPark.title}</p>
            </div>
            </InfoWindow>
        )}
        
      
    </GoogleMap>
    );
  }
  
  export const MapWrapped = withScriptjs(withGoogleMap(MapMarker));
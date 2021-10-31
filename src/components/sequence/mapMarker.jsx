import React, { useState, useEffect } from "react";
import {withGoogleMap, withScriptjs, GoogleMap, Marker,  InfoWindow} from "react-google-maps";
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

function MapMarker() {
    const classes = useStyles();
    const [selectedPark, setSelectedPark] = useState(null);

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
        defaultZoom={10}
        defaultCenter={{ lat: 7.00, lng: 81.00 }}
        >
        {DetailedList.map(park => (
            <Marker 
            key={park.id}
            position={{
                lat: park.geometry[0],
                lng: park.geometry[1]
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
                lat: selectedPark.geometry[0],
                lng: selectedPark.geometry[1]
            }}
            >
            <div>
                <h2 className={classes.text}>{selectedPark.id}</h2>
                <p className={classes.smallText}>{selectedPark.title}</p>
            </div>
            </InfoWindow>
        )}
    </GoogleMap>
    );
  }
  
  export const MapWrapped = withScriptjs(withGoogleMap(MapMarker));
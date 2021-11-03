import axios from 'axios';

//My API Key --> include yours if you want
const API_KEY = 'AIzaSyB2ncyvKA7X0gTVM1_s0AOG0zzOvNkJ4LY';


/*
    startLocation: [latitude, longitude]
*/
export async function getDistances(startLocation, destinationLocations) {
    let destinationsQuery = ''
    for(let location of destinationLocations){
        destinationsQuery = destinationsQuery + location.coords[0] + "," + location.coords[1] + "|";
    }
    destinationsQuery = destinationsQuery.slice(0, -1);    
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLocation.latitude},${startLocation.longitude}&destinations=${destinationsQuery}&departure_time=now&key=${API_KEY}`;
    console.log("API Call: ", url);
    try {
        const response = await axios.get(url);
        const distanceMatrix =  response.data.rows.pop().elements;
        for(let i =0; i<distanceMatrix.length; i++){
            destinationLocations[i].distanceMatrix = distanceMatrix[i];
        }
        return {
            success: true,
            data: destinationLocations
        };
    } catch (e) {
        return {
            success: false,
            error: e
        }
    }  
    
}


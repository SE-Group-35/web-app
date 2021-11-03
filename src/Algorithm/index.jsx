//Import this according to your implementation
import { getDistances } from "./distanceMatrixAPI";
import _ from 'lodash';
import moment from "moment";

const SECONDS_PER_TEN_HOURS = 36000;


/*Libraries Required
        #lodash -> Easy array operations
        #moment -> For date calculations
        #axios -> To call  APIs
*/

/*Params
 #startLocation: {
        coords: {
            latitude: 123,
            longitude: 123 
        }
  }

 #startDate - Timestamp
 #endDate - Timestamp
 #travelMode - String
 #destinations - Array of destination object
                        -destination object <--what is retrieved from Firestore
*/

/*Output
 #If successfull
  - {
          success: true,
          trip: {
                  startLocation,
                  tripDestinations: array of destinations(destination include durration_in_traffic property) 
          }
  }
 #If failed
  - {
          success: false,
          error: "No Locations can be suggested"
  }

*/

const generateTravelPlan = async({ startLocation, startDate, endDate, travelMode, destinations }) => {
        //Trip Return Object
        const trip = {
                startLocation: startLocation.coords,
                tripDestinations: []
        };
        
        //Had to add 1 in my implementation
        const timeConstraint = (moment(endDate).diff(moment(startDate), "d") + 1) * SECONDS_PER_TEN_HOURS;
        const response = await getDistances(startLocation.coords, destinations);
        if(response.success){
                const orderedByHomeDistance = _.orderBy(response.data, d => d.distanceMatrix.duration_in_traffic.value, "asc");
                console.log(orderedByHomeDistance);
                let currentTimeCount = 0;
                let index = 0;
                while(true && index < orderedByHomeDistance.length){
                        const destination = orderedByHomeDistance[index];
                        if(index === 0){
                                if(destination.distanceMatrix.duration_in_traffic.value * 2 > timeConstraint)
                                        break;
                                trip.tripDestinations.push(destination);
                                currentTimeCount += destination.distanceMatrix.duration_in_traffic.value;
                                index++;
                        }else{
                                const response2 = await getDistances({
                                                latitude: destination.coords[0], 
                                                longitude: destination.coords[1]
                                        }, 
                                        _.takeRight(orderedByHomeDistance, orderedByHomeDistance.length - index - 1)
                                );
                                if(response2.success){
                                        const orderedByClosest = _.orderBy(response2.data, d => d.distanceMatrix.duration_in_traffic.value, "asc");
                                        const closest = orderedByClosest[0];
                                        const closestHomeTravelTime = orderedByHomeDistance.find(o => o.id === closest.id).distanceMatrix.duration_in_traffic.value;
                                        if((currentTimeCount + closest.distanceMatrix.duration_in_traffic.value + closestHomeTravelTime) > timeConstraint) break;  
                                        trip.tripDestinations.push(closest); 
                                        currentTimeCount += closest.distanceMatrix.duration_in_traffic.value
                                }
                                index++;
                        }
                              
                }
        }

        if(trip.tripDestinations.length === 0)return ({success: false, error: "No Locations can be suggested"});

        return ({
            success: true,
            trip    
        });
};
export default generateTravelPlan;
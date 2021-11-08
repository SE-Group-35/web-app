import { createSelector } from 'reselect';
import randomid from "randomid";
import { toTimestamp } from "../../utils/toTimestamp";

export const getTrips = createSelector(
    state => state.firestore.ordered.trips,
    a => a? a:[]
);

export const addTrip = (destinations,endDate,startDate,id,name,startLocation,travelMode) => {
    
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            console.log("ll");
            const firebase = getFirebase();
            const firestore=getFirestore();
            const tripId = randomid(12);
            await firestore.collection("users").doc(id).collection("trips").doc(tripId).set({destinations:destinations,endDate:toTimestamp(endDate),startDate:toTimestamp(startDate),name:name,startLocation:startLocation,travelMode:travelMode});
            
        } catch (e) {
        }
    }
}
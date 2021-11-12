import { createSelector } from 'reselect';
import randomid from "randomid";
import { toTimestamp } from "../../utils/toTimestamp";

//get trips details by accesing trips subcollection
export const getTrips = createSelector(
    state => state.firestore.ordered.trips,
    a => a? a:[]
);

//get checklist details by accesiing checklists subcollection
export const getCheckList = createSelector(
    state => state.firestore.ordered.checklists,
    a => a? a:[]
);

//add created trip to the database
export const addTrip = (destinations,endDate,startDate,id,name,startLocation,travelMode) => {
     return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {            
            const firebase = getFirebase();
            const firestore=getFirestore();
            const tripId = randomid(12);
            await firestore.collection("users").doc(id).collection("trips").doc(tripId).set({destinations:destinations,endDate:toTimestamp(endDate),startDate:toTimestamp(startDate),name:name,startLocation:startLocation,travelMode:travelMode,journal:""});
            
        } catch (e) {
        }
    }
}

export const updateJournal = (tripId,destinations,endDate,startDate,id,name,startLocation,travelMode,journal) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
     try {            
         const firebase = getFirebase();
         const firestore=getFirestore();         
         await firestore.collection("users").doc(id).collection("trips").doc(tripId).update({destinations:destinations,endDate:toTimestamp(endDate),startDate:toTimestamp(startDate),name:name,startLocation:startLocation,travelMode:travelMode,journal:journal});
         
     } catch (e) {
     }
 }
}

//add created checklist to the databse
export const addCheckList = (uid,tripId,inputFields) => {
    
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {            
            const firebase = getFirebase();
            const firestore=getFirestore();
            const activityList = [];
            const checkListId = randomid(12);  //generate random id
            inputFields.forEach((activity) => {
                const act={item:activity.checkItem,ischecked:activity.check}
                activityList.push(act);
              });
                //add data to users->trips->checklists subCollection
                await firestore
                  .collection("users")
                  .doc(uid)
                  .collection("trips")
                  .doc(tripId)
                  .collection("checklists")
                  .doc(checkListId)
                  .set({
                    backpack: activityList,
                    
                  });
         } catch (e) {
        }
    }
}

//add edited details of the checklist to the database
export const updateCheckList = (uid,tripId,checkListId,inputFields) => {
    
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {            
            const firebase = getFirebase();
            const firestore=getFirestore();
            const activityList = [];            
            inputFields.forEach((activity) => {
                const act={item:activity.checkItem,ischecked:activity.check}
                activityList.push(act);
              });
                //update data in users->trips->checklists subcoolection
                await firestore
                  .collection("users")
                  .doc(uid)
                  .collection("trips")
                  .doc(tripId)
                  .collection("checklists")
                  .doc(checkListId)
                  .update({
                    backpack: activityList,
                    
                  });
         } catch (e) {
        }
    }
}
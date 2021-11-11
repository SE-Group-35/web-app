import { createSelector } from 'reselect';
import randomid from "randomid";
import { toTimestamp } from "../../utils/toTimestamp";

export const getTrips = createSelector(
    state => state.firestore.ordered.trips,
    a => a? a:[]
);


export const getCheckList = createSelector(
    state => state.firestore.ordered.checklists,
    a => a? a:[]
);

export const addTrip = (destinations,endDate,startDate,id,name,startLocation,travelMode) => {
     return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {            
            const firebase = getFirebase();
            const firestore=getFirestore();
            const tripId = randomid(12);
            await firestore.collection("users").doc(id).collection("trips").doc(tripId).set({destinations:destinations,endDate:toTimestamp(endDate),startDate:toTimestamp(startDate),name:name,startLocation:startLocation,travelMode:travelMode});
            
        } catch (e) {
        }
    }
}

export const addCheckList = (uid,tripId,inputFields) => {
    
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {            
            const firebase = getFirebase();
            const firestore=getFirestore();
            const activityList = [];
            const checkListId = randomid(12);
            inputFields.forEach((activity) => {
                const act={item:activity.checkItem,ischecked:activity.check}
                activityList.push(act);
              });
                //add data to activity subCollection
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
                //add data to activity subCollection
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
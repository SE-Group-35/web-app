import { createSelector } from 'reselect';
import { getFirestore } from 'redux-firestore';
import ImageCard from '../../components/home/Card';
import randomid from "randomid";

//write to the database
//add reviews for a particular destination
export const addReview = (rating,comment,username,id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            const firebase = getFirebase();
            const firestore=getFirestore();
            const reviewId = randomid(12);
            await firestore.collection("destinations").doc(id).collection("reviews").doc(reviewId).set({rating:rating,userName:username,comment:comment});
            
        } catch (e) {
        }
    }
}

export const getDestinations = createSelector(
    state => state.firestore.ordered.destinations,
    e => e
);

//read from the database
//get all destinations from the firestore
export const getAllDestinations = createSelector(
    state => state.firestore.ordered.destinations,
    d => d ? d : []
);

//read from the database
//get all published destinations from the database 
export const getPublishedDestinations = createSelector(
    getAllDestinations,
    destinations => destinations ? destinations.filter(d => d.published === true) : []
);

//read from the databse
//get all activities by accessing activities subcollection
export const getActivities = createSelector(
    state => state.firestore.ordered.activities,
    a => a? a:[]
);

//read from the database
//get reviews  by acessing reviews subcollection
export const getReviews = createSelector(
    state => state.firestore.ordered.reviews,
    a => a? a:[]
);

//read from the database
//get image urls by accessing gallery subcollection 
export const getImages = createSelector(
    state => state.firestore.ordered.gallery,
    a => a? a:[]
);

import { createSelector } from 'reselect';
import { getFirestore } from 'redux-firestore';
import ImageCard from '../../components/home/Card';
import randomid from "randomid";

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

export const getAllDestinations = createSelector(
    state => state.firestore.ordered.destinations,
    d => d ? d : []
);


export const getPublishedDestinations = createSelector(
    getAllDestinations,
    destinations => destinations ? destinations.filter(d => d.published === true) : []
);

export const getActivities = createSelector(
    state => state.firestore.ordered.activities,
    a => a? a:[]
);

export const getReviews = createSelector(
    state => state.firestore.ordered.reviews,
    a => a? a:[]
);
export const getImages = createSelector(
    state => state.firestore.ordered.gallery,
    a => a? a:[]
);

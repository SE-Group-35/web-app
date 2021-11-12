import { createSelector } from 'reselect';

//get events by accesing events collection
export const getEvents = createSelector(
    state => state.firestore.ordered.events,
    e => e
);

//get events by suppliying the id
export const getEventById= id => {    
    return createSelector(
        state => state.firestore.data.events,        
        e => e[id]
     
);
}
import { createSelector } from 'reselect';

export const getEvents = createSelector(
    state => state.firestore.ordered.events,
    e => e
);

export const getEventById= id => {    
    return createSelector(
        state => state.firestore.data.events,        
        e => e[id]
     
);
}
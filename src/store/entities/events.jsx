
import { createSelector } from 'reselect';


export const getEvents = createSelector(
    state => state.firestore.data.events,
    e => e
);
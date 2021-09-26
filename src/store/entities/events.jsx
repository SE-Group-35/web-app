
import { createSelector } from 'reselect';


export const getEvents = createSelector(
    state => state.firestore.ordered.events,
    e => e
);
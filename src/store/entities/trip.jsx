import { createSelector } from 'reselect';

export const getTrips = createSelector(
    state => state.firestore.ordered.trips,
    a => a? a:[]
);
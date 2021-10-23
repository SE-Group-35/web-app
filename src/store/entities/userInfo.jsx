import { createSelector } from 'reselect';

export const getMyTrips = createSelector(
    state => state.firestore.ordered.users,
    d => d ? d : []
);
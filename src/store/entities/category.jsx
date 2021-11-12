
import { createSelector } from 'reselect';

//get all categories
export const getCategory = createSelector(
    state => state.firestore.ordered.categories,
    e => e
);
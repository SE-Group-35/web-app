
import { createSelector } from 'reselect';


export const getCategory = createSelector(
    state => state.firestore.ordered.categories,
    e => e
);
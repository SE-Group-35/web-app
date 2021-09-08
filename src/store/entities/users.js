import { createSelector } from 'reselect';






/*
    Implement the functionalities relevant to users here
        Ex: addUser <--Performed by the admin
            editUser <--Performed by the admin
        (Note: Just Examplesss to ensure that you 
               understand that this is the place to implement
               the functionalities done with users)      
    This is the only place used for communicating with the backend
*/



//Selectors
export const getUsersList = createSelector(
    state => state.firestore.users,
    users => users
);


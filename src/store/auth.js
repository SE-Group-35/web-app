import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

//Auth Slice
const slice = createSlice({
    name: "Auth",
    initialState: {
        user: null,
        loggedIn: null
    },
    reducers: {

        //Events -> Event Handlers
        userLoggedIn(user, action) {
            user.user = action.payload;
            user.loggedIn = true;
        },

        userLoggedOut(user, action){
            user.user = null;
            user.loggedIn = false;
        }
    }
});

//Reducer
export default slice.reducer;

//Action Creators
export const { userLoggedIn, userLoggedOut } = slice.actions;

//Selectors
export const getAuth = createSelector(
    state => state.auth.user,
    user => user
);

export const getLoggedInStatus = createSelector(
    state => state.auth.loggedIn,
    l => l
)
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

//Auth Slice
const slice = createSlice({
    name: "Auth",
    initialState: {
        authError: null,
        loggingIn: false
    },
    reducers: {
        //Events -> Event Handlers
        userLoginRequested(auth, action) {
            auth.loggingIn = true;

        },
        userSuccessfullyLoggedIn(auth, action) {
            auth.authError = null;
            auth.loggingIn = false;
        },

        userLogInFailed(auth, action) {
            auth.authError = "Login Failed...";
            auth.loggingIn = false;            
        }
    }
});

//Reducer
export default slice.reducer;

//Action Creators
export const { userLoginRequested, userSuccessfullyLoggedIn, userLogInFailed } = slice.actions;


/* 
    Implement the functionalities relevant to authentication here
    This is the only place used for communicating with the backend
*/
export const signIn = (email, password) => {
    return async (dispatch, getState, { getFirebase }) => {
        try {
            dispatch(userLoginRequested());
            const firebase = getFirebase();
            await firebase.auth().signInWithEmailAndPassword(email, password);

            dispatch(userSuccessfullyLoggedIn())
        } catch (e) {
            dispatch(userLogInFailed())
        }
    }
}

export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        try {
            const firebase = getFirebase();
            firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }
}



//Selectors
export const getAuth = createSelector(
    state => state.firebase.auth,
    auth => auth
);

export const getProfile = createSelector(
    state => state.firebase.profile,
    profile => profile
);

export const getUserLoggingInStatus = createSelector(
    state => state.auth.loggingIn,
    s => s
);

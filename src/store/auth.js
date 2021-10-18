import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { getFirestore } from 'redux-firestore';



//Auth Slice
const slice = createSlice({
  name: "Auth",
  initialState: {
    authError: null,
    loggingIn: false,
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
    },
  

        userLogInFailed(auth, action) {
            auth.authError = "Login Failed...";
            auth.loggingIn = false;            
        },
        userRegisterRequested(auth, action) {
            auth.registerIn = true;

        },
        userSuccessfullyRegistered(auth, action) {
            auth.authError = null;
            auth.registerIn = false;
        },

        userRegisterFailed(auth, action) {
            auth.authError = "Register Failed...";
            auth.registerIn = false;
            auth.existAccount=true;            
        }

    }

});

//Reducer
export default slice.reducer;

//Action Creators

export const { userLoginRequested, userSuccessfullyLoggedIn, userLogInFailed, userRegisterRequested,userSuccessfullyRegistered,userRegisterFailed } = slice.actions;



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
            alert("Login Failed...")
            dispatch(userLogInFailed())
        }

    }
  };


export const signOut = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };
};

//Selectors
export const getAuth = createSelector(
  (state) => state.firebase.auth,
  (auth) => auth
);

export const getProfile = createSelector(
  (state) => state.firebase.profile,
  (profile) => profile
);

export const getUserLoggingInStatus = createSelector(
  (state) => state.auth.loggingIn,
  (s) => s
);

export const signUp = (email, password,firstName,lastName) => {
   
    return async (dispatch, getState, { getFirebase,getFirestore }) => {
        try {
            dispatch(userLoginRequested());
            const firebase = getFirebase();
            const firestore = getFirestore();
            
            await firebase.auth().createUserWithEmailAndPassword(email, password) .then((resp) => {
                return firestore.collection("users").doc(resp.user.uid).set({
                  Enabled: true,
                  email: email,  
                  firstName: firstName,
                  lastName: lastName,
                  telephone:"",              
                  userRole: {admin:false,traveller:true},      
                  
                  
                });
            })
            alert("Successfully Registered!. You can Login into your account now.");            
            dispatch(userSuccessfullyRegistered());
           

        } catch (e) {
          
            switch (e.code) {
                case 'auth/email-already-in-use':
                  console.log(`Email address  already in use.`);
                  alert("Email address  already in use.");
                  dispatch(userRegisterFailed());
                  
                  break;
                  default:
                    console.log(e.message);
                    break;
            }
            
        }
    }
}

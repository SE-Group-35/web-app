import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebase";
import { createSelector } from "reselect";
import {
  createUserRequested,
  userSuccessfullyCreated,
  createUserFailed,
  processRequested,
  processFailed,
  processCompleted,
  fetchCompleted,
} from "../system";

export const createUser = (
  email,
  password,
  telephone,
  firstName,
  lastName,
  userRole,
  Enabled
) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());
      const firestore = getFirestore();
      const firebase = getFirebase();
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((resp) => {
          return firestore.collection("users").doc(resp.user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone,
            userRole: userRole,

            Enabled: Enabled,
          });
        })
        .then(() => {
          firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
              // Password reset email sent!
              // ..
            });
        });
      dispatch(processCompleted());
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());

      const firestore = getFirestore();
      const firebase = getFirebase();

      await deleteDoc(doc(database, "users", id));
      console.log("Done deleted");
      dispatch(processCompleted());
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const editUser = (
  email,
  id,

  telephone,
  firstName,
  lastName,
  userRole
) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(createUserRequested());
      const firestore = getFirestore();
      const firebase = getFirebase();
      await firestore.collection("users").doc(id).update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone,
        userRole: userRole,
      });

      dispatch(userSuccessfullyCreated());
    } catch (error) {
      dispatch(createUserFailed());
    }
  };
};
/*export const changeProcess = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(fetchCompleted());
  };
};*/

export const makeAdmin = (id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());
      const firestore = getFirestore();
      const firebase = getFirebase();
      await firestore
        .collection("users")
        .doc(id)
        .update({
          userRole: { admin: true, traveller: false },
        });

      dispatch(processCompleted());
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const toggleEnable = (id, Enabled) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());
      const firestore = getFirestore();
      const firebase = getFirebase();
      await firestore.collection("users").doc(id).update({
        Enabled: Enabled,
      });

      dispatch(processCompleted());
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

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
  (state) => state.firestore.ordered.users,
  (users) => users
);
